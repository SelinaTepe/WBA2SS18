const express = require('express')
const http = require('http')
const faye = require('faye');
const request = require('request');
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

var dHost = 'http://localhost';
var dPort = 3000;
var dURL = dHost + ':' + dPort;


var server = http.createServer();


var fayeservice = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45
});

fayeservice.attach(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//User

app.get('/users', function(req, res){
  var url = dURL+ '/users';

  request(url, function(err, response, body){
    body = JSON.parse(body);
    res.json(body);
  });
});

app.get('/users/newUsers', function(req, res){
  var url = dURL+ '/users/newUsers';

  request(url, function(err, response, body){
    body = JSON.parse(body);
    res.json(body);
  });
});

app.get('/users/:id', function(req, res){
  var id = req.params.id;
  var url = dURL+ '/users/'+ req.params.id;

  request(url, function(err, response, body){
    body = JSON.parse(body);
    res.json(body);
  });
});


app.post('/users', function(req, res){
        var url = dURL + '/users';
        const user = {
          id: req.body.id,
          name:req.body.name,
          vorname: req.body.vorname,
          city: req.body.city
        };


    var options = {
        uri: url,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json: user
    }

    request(options, function(err, response, body){
        res.json(body);
    });
        console.log("Neuer User wurde hinzugefuegt: ", user);
});

app.put('/users/:id', function(req, res){
    var id = req.params.id;
    var url = dURL + '/users/'+ req.params.id;
    const user = {
      id: req.body.id,
      name:req.body.name,
      vorname: req.body.vorname,
      city: req.body.city
    };

    var options = {
        uri: url,
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        json: user

    }

    request(options, function(err, response, body){
        console.log("User " + id + "wurde bearbeitet/ erstellt: " ,user);
        res.json(body);
    });

    client.publish('/users',{
      text: ' User wurde geändert' } )
      .then(function(){

        console.log("Nachricht vom Server erhalten");
      }, function(error){

        console.log("fehler beim publishing: " + error.message);
    });



});



app.delete('/users/:id', function(req, res){
  var id = req.params.id;
    var url = dURL + '/users/' + req.params.id;

    request.delete(url, function(err, response, body){
        res.json(body);
    });
});



//Docs

app.get('/documents/name/:id', function(req, res){
    var url = dURL + '/documents/name/'+ req.params.id;

    request.get(url, function(err, response, body){
        res.json(JSON.parse(body));
    });
});

app.get('/documents/isbn/:isbn', function(req, res){
    var url = dURL + '/documents/isbn/'+ req.params.isbn;

    request.get(url, function(err, response, body){
        res.json(JSON.parse(body));
    });
});

app.get('/documents/newDocuments', function(req, res){
    var url = dURL + '/documents/newDocuments';

    request.get(url, function(err, response, body){
        res.json(JSON.parse(body));
    });
});


app.post('/documents', function(req, res){
    var url = dURL + '/documents';
    const doc = {
      title: req.body.title,
      isbn: req.body.isbn,
      subtitle: req.body.subtitle,
      authors: req.body.authors,
      publisher: req.body.publisher,
      publishedDate: req.body.publishedDate

    };
    console.log(dURL);

    var options = {
        uri: url,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json: doc
    }

    request(options, function(err, response, body){
        res.json(body);
    });
        console.log("Neues Dokument wurde hinzugefuegt: ", doc);
});

app.put('/documents/name/:id', function(req, res){
    var id = req.params.id;
    var url = dURL + '/documents/name/'+ req.params.id;
    const doc = {
      title: req.body.title,
      isbn: req.body.isbn,
      subtitle:req.body.subtitle,
      authors: req.body.authors,
      publisher: req.body.publisher,
      publishedDate: req.body.publishedDate
    };

    var options = {
        uri: url,
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        json: doc

    }

    request(options, function(err, response, body){
        res.json(body);
    });
console.log("Dokument wurde bearbeitet/ erstellt: " ,doc);
});

app.delete('/documents/newDocuments/:id', function(req, res){
    var url = dURL + '/documents/newDocuments/' + req.params.id;

    request.delete(url, function(err, response, body){
        res.json(body);

        client.publish('/users', {text: "Dokument entfernt"}).then(function(){
          console.log('Neue nachricht:');
        }, function(error){
          console.log('Fehler beim publishen:' + error.message);
        });
    });
});




app.listen(8080, function(){
    console.log("Dienstnutzer ist verfügbar nun auf Port 8080");
});


var client = new faye.Client('http://localhost:8000/faye');
client.subscribe('/users', function(message){
  console.log(message.text);
});
