var express = require('express');
var http = require('http');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CRUD FUER USERS
app.get('/users', function (req, res){
  fs.readFile(__dirname + "/" + "testdataUser.json", "utf8", function(err, data){
    console.log(data);
    res.status(200).end(data);
  })
});

app.get('/newUsers', function(req,res){
  fs.readFile(__dirname + "/" + "newUser.json", "utf8", function(err, data){
    console.log(data);
    res.status(200).end(data);
  })
});

//FUNKTIONIERT
app.get("/users/:id", function(req, res){
  console.log('Folgender Request wurde betätigt:' + req.url);
  fs.readFile(__dirname + "/" + "testdataUser.json", "utf8", function(err, data){
    var users = JSON.parse(data);
    var user = users["user" + req.params.id]
    console.log(user);
    res.status(200).end(JSON.stringify(user));
  });
})

//FUNKTIONIERT
app.post('/users',(req, res, next) => {
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
  fs.writeFile("newUser.json", JSON.stringify({ user }), function(err){

  });
});

//FUNKTIONIERT
app.put("/users/:id", function(req, res){
  fs.readFile("testdataUser.json", function(err, data){
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
    fs.writeFile("newUser.json", JSON.stringify({ user }), function(err){

    });
  });
});

//FUNKTIONIERT
app.delete("/users/:id", function(req, res){
  var id = req.params.id;
  fs.readFile("testdataUser.json", function(err, data){
    data = JSON.parse(data);
    fs.writeFile("testdataUser.json", JSON.stringify(data), function(err){
      console.log("User wurde entfernt");
    });
  });
  res.status(204).end();
});




//CRUD FUER DOKUMENTE


app.get('/documentsName/:id', function(req, res){
  request.get({ url: 'https://www.googleapis.com/books/v1/volumes?q=' + req.params.id ,
}, function(error, response, body){

  fs.writeFile("documents.json", JSON.stringify(body), function(err){
console.log(body);
res.send(JSON.parse(body));
});
});
});

app.get('/documentsIsbn/:isbn', function(req, res){
  request.get({ url: 'https://www.googleapis.com/books/v1/volumes?q=isbn' + req.params.isbn,
}, function(error, response, body){
  fs.writeFile("documents.json", JSON.stringify(body), function(err){
    console.log(body);
    res.send(JSON.parse(body));
  });
});
});




app.post('/documents', function(req, res){
  const doc = {
    title: req.body.title,
    isbn: req.body.isbn,
    subtitle: req.body.subtitle,
    authors: req.body.authors,
    publisher: req.body.publisher,
    publishedDate: req.body.publishedDate

  };
  res.status(201).json({
    message: 'Neues Dokument wurde hinzugefuegt',
    doc: doc
  });
  console.log(doc);
  fs.writeFile('newDocuments.json', JSON.stringify({ doc }), function(err){

  });
});

app.get('/newDocuments', function(req, res){
  fs.readFile(__dirname + "/" + "newDocuments.json", "utf8", function(err, data){
    console.log(data);
    res.status(200).end(data);
  });
});



app.put("/documents/:id", function(req, res){
  fs.readFile("documents.json", function(err, data){
    data = JSON.parse(data);
    const doc = {
      title: req.body.title,
      isbn: req.body.isbn,
      subtitle: req.body.subtitle,
      authors: req.body.authors,
      publisher: req.body.publisher,
      publishedDate: req.body.publishedDate

    };
    res.status(204).json({
      message: 'Dokument wurde aktualisiert'
    });
    console.log("Dokument wurde aktualisiert:\n" , doc);
    fs.writeFile("newDocuments.json", JSON.stringify({ doc }), function(err){

    });
  });
});



app.delete('/newDocuments/:id', function(req, res){
  var id = req.params.id;
  fs.readFile("newDocuments.json", function(err, data){
    data = JSON.parse(data);
    fs.writeFile("newDocuments.json", JSON.stringify(data), function(err){
      console.log("Dokument wurde entfernt");
    });
  });
  res.status(204).end();
});
