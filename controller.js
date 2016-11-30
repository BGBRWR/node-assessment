var users = require('./users.json');

module.exports = {
    allUsers: function(req, res) {
        if (req.query.language) {
            var userLanguages = [];
            users.map(function(user) {
                if (user.language == req.query.language) {
                    userLanguages.push(user);
                }
            });
            res.status(200).json(userLanguages);
        } else if (req.query.age) {
            var userAges = [];
            users.map(function(user) {
                if (user.age == req.query.age) {
                    userAges.push(user);
                }
            });
            res.status(200).json(userAges);
        } else if (req.query.city) {
            var userCity = [];
            users.map(function(user) {
              if(user.city) {
                if (user.city.toString().toLowerCase() == req.query.city.toString().toLowerCase()) {
                    userCity.push(user);
                }
              }
            });
            res.status(200).json(userCity);
        } else if (req.query.state) {
            var userState = [];
            users.map(function(user) {
              if(user.state){
                if (user.state.toString().toLowerCase() == req.query.state.toString().toLowerCase()) {
                    userState.push(user);
                }
              }
            });
            res.status(200).json(userState);
        } else if (req.query.gender) {
            var userGender = [];
            users.map(function(user) {
              if(user.gender){
                if (user.gender.toString().toLowerCase() == req.query.gender.toString().toLowerCase()) {
                    userGender.push(user);
                }
              }
            });
            res.status(200).json(userGender);
        } else {
            res.status(200).json(users);
        }
    },

    singleUser: function(req, res) {
      var userPrivileges = [];
      var validUser = false;
      var singleUser;
      users.map(function(user){
        if (user.type === req.params.id){
          userPrivileges.push(user);
        }
        else if (user.id === parseInt(req.params.id)) {
          validUser = true;
          singleUser = user;
        }
      });
      if (validUser) {
        res.status(200).json(singleUser);
      }
      else if(userPrivileges[0]){
        res.status(200).json(userPrivileges);
      }
      else {
        res.sendStatus(404);
      }
    },

    newUser: function(req, res) {
      req.body.id = Math.max.apply(Math, users.map(function(user){return user.id;}))+1;
      req.body.type = req.params.id;
      req.body.favorites = [req.body.favorites];
      users.push(req.body);
      res.status(200).json(req.body);
    },

    newAdmin: function(req, res) {
      req.body.id = Math.max.apply(Math, users.map(function(user){return user.id;}))+1;
      req.body.type = "admin";
      req.body.favorites = [req.body.favorites];
      users.push(req.body);
      res.status(200).json(req.body);
    },

    changeLang: function(req, res) {
      var updatedUser;
      if(req.params.id){
        users.map(function(user){
          if(user.id == parseInt(req.params.id)){
            user.language = req.body.language;
            updatedUser = user;
          }
        });
        res.status(200).send(updatedUser);
      }
      else res.sendStatus(404);

 },

    addFavorite: function(req, res) {
        id = req.params.id;
        newForum = req.body.add;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].favorites.push(newForum);
                res.status(200).json(users[i]);
            }
        }
    },

    removeFavorite: function(req, res) {
        id = req.params.id;
        forum = req.query.favorite;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                index = users[i].favorites.indexOf(forum);
                users[i].favorites.splice(index, 1);
                res.status(200).send(users[i]);
            }
        }
    },

    banUser: function(req, res) {
        id = req.params.id;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users.splice(i, 1);
                res.status(200).send(users);
            }
        }
    },

    updateUser: function(req, res) {
        id = req.params.id;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].first_name = req.body.first_name;
                users[i].last_name = req.body.last_name;
                users[i].email = req.body.email;
                users[i].gender = req.body.gender;
                users[i].language = req.body.language;
                users[i].age = req.body.age;
                users[i].city = req.body.city;
                users[i].state = req.body.state;
                users[i].type = req.body.type;
                users[i].favorites = req.body.favorites;
                res.status(200).json(users[i]);
            }
        }
    }

};
