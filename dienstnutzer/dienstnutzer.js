const express = require('express')
const http = require('http')
const faye = require('faye');
const request = require('request');
const app = express();


vardHost = 'http://localhost';
var dPort = 3000;
var dURL = dHost + ':' + dPort;


app.get('/users', function(req, res){
  var url = dURL+ '/users';
})


app.get('/users/newUsers', function(req, res){
  var url = dURL+ '/users/newUsers';
})


app.get('/users/:id', function(req, res){
  var url = dURL+ '/users/'+ req.params.id;
})



app.post('/users', function(req, res){
    var url = dURL + '/users';
    var user = {
      id: req.body.id,
      name:req.body.name,
      vorname: req.body.vorname,
      city: req.body.city
    };
    console.log(dURL);

    var options = {
        uri: url,
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        json: content
    }

    request(options, function(err, response, body){
        res.json(body);
    });
        console.log("Neuer User wurde hinzugefuegt: " + user);
});



app.put('/users/:id', function(req, res){
    var url = dURL + '/users/'+ req.params.id;;
    var user = {
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
        json: content
    }

    request.put(options, function(err, response, body){
        res.json(body);
    });
console.log("User wurde bearbeitet/ erstellt: " + user);
});

app.delete('/users/id', function(req, res){
    var url = dURL + '/users/' + req.params.id;
    request.delete(url, function(err, response, body){
        res.json(body);
    });
});







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
    var doc = {
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
        json: content
    }

    request(options, function(err, response, body){
        res.json(body);
    });
        console.log("Neues Dokument wurde hinzugefuegt: " + doc);
});


app.put('/documents/:id', function(req, res){
    var url = dURL + '/documents/'+ req.params.id;
    var doc = {
      title: req.body.title,
      isbn: req.body.isbn,
      subtitle: req.body.subtitle,
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
        json: content
    }
    request.put(options, function(err, response, body){
        res.json(body);
    });
    console.log("Dokument wurde bearbeitet/ erstellt: " + doc);
});




app.delete('/documents/newDocuments/:id', function(req, res){
    var url = dURL + '/documents/newDocuments/' + req.params.id;
    request.delete(url, function(err, response, body){
        res.json(body);
    });
});




server.listen(8080, function(){
    console.log("Dienstnutzer ist verfügbar nun auf Port 8080");
});
