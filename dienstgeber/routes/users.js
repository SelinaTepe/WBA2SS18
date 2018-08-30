const express = require('express');
var request = require('request');
const fs = require('fs');
const router = express.Router();
const bodyParser = require("body-parser");
var http = require('http');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res){
  fs.readFile(__dirname + "/" + "testdataUser.json", "utf8", function(err, data){
    console.log(data);
    res.status(200).end(data);
  })
});

router.get('/newUsers', function(req,res){
  fs.readFile(__dirname + "/" + "newUser.json", "utf8", function(err, data){
    console.log(data);
    res.status(200).end(data);
  })
});

//FUNKTIONIERT
router.get("/:id", function(req, res){
  console.log('Folgender Request wurde betätigt:' + req.url);
  fs.readFile(__dirname + "/" + "testdataUser.json", "utf8", function(err, data){
    var users = JSON.parse(data);
    var user = users["user" + req.params.id]
    console.log(user);
    res.status(200).end(JSON.stringify(user));
  });
})

//FUNKTIONIERT
router.post('/',(req, res, next) => {
  const user = {
    id: req.body.id,
    name: req.body.name,
    vorname: req.body.vorname,
    city: req.body.city

  };
  res.status(201).json({
    message: 'Neuer User hinzugefügt',
    user: user
  });
  console.log(user);
  fs.writeFile(__dirname + "/" + "newUser.json", JSON.stringify({ user }), function(err){
  });
});

//FUNKTIONIERT
router.put("/:id", function(req, res){
  fs.readFile(__dirname + "/" + "testdataUser.json", function(err, data){
    data = JSON.parse(data);
    const user = {
      id: req.body.id,
      name:req.body.name,
      vorname: req.body.vorname,
      city: req.body.city
    };
    res.status(204).json({
      message: 'User wurde aktualisiert'
    });
    console.log("User wurde aktualisiert:\n" ,user);
    fs.writeFile(__dirname + "/" + "newUser.json", JSON.stringify({ user }), function(err){

    });
  });
});

//FUNKTIONIERT
router.delete("/:id", function(req, res){
  var id = req.params.id;
  fs.readFile(__dirname + "/" + "testdataUser.json", function(err, data){
    data = JSON.parse(data);
    fs.writeFile(__dirname + "/" + "testdataUser.json", JSON.stringify(data), function(err){
      console.log("User wurde entfernt");
    });
  });
  res.status(204).end();
});


module.exports = router;
