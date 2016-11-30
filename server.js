var express = require('express');
var bodyParser = require('body-parser');
var ctrl = require('./controller.js');

var app = express();
app.use(bodyParser.json());


app.get('/api/users', ctrl.allUsers);
app.get('/api/users/:id', ctrl.singleUser);
app.post('/api/users', ctrl.newUser);
app.post('/api/users/admin', ctrl.newAdmin);
app.post('/api/users/language/:id', ctrl.changeLang);
app.post('/api/users/forums/:id', ctrl.addFavorite);
app.delete('/api/users/forums/:id', ctrl.removeFavorite);
app.delete('/api/users/:id', ctrl.banUser);
app.put('/api/users/:id', ctrl.updateUser);

app.listen(3000, function(){
  console.log("listening on port 3000");
});

module.exports = app;
