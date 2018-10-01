const express = require('express');
const fs = require('fs');
const router = express.Router();
const bodyParser = require("body-parser");
const request = require('request');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get('/name/:id', function(req, res){
  request.get({ url: 'https://www.googleapis.com/books/v1/volumes?q=' + req.params.id ,
}, function(error, response, body){

  fs.writeFile(__dirname + "/" + "documents.json", JSON.stringify(body), function(err){
console.log(body);
res.status(200).end(body);
});
});
});


router.get('/isbn/:isbn', function(req, res){
  request.get({ url: 'https://www.googleapis.com/books/v1/volumes?q=isbn' + req.params.isbn,
}, function(error, response, body){
  fs.writeFile(__dirname + "/" + "documents.json", JSON.stringify(body), function(err){
    console.log(body);
    res.status(200).end(body);
  });
});
});



router.post('/', function(req, res){
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
  fs.writeFile(__dirname + "/" + 'newDocuments.json', JSON.stringify({ doc }), function(err){
  });
});




router.get('/newDocuments', function(req, res){
  fs.readFile(__dirname + "/" + "newDocuments.json", "utf8", function(err, data){
    console.log(data);
    res.status(200).end(data);
  });
});



router.put("/name/:id", function(req, res){
  fs.readFile(__dirname + "/" + "documents.json", function(err, data){
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
    fs.writeFile(__dirname + "/" + "newDocuments.json", JSON.stringify({ doc }), function(err){
      if (err) {
             console.error("write error:  " + error.message);
           } else {
             console.log("Dokument wurde bearbeitet");
           }
      });
    });
  });


router.delete('/newDocuments/:id', function(req, res){
  var id = req.params.id;
  fs.readFile(__dirname + "/" + "newDocuments.json", function(err, data){
    data = JSON.parse(data);
    fs.writeFile(__dirname + "/" + "newDocuments.json", JSON.stringify(data), function(err){
      console.log("Dokument wurde entfernt");
    });
  });
  res.status(204).end();
});

module.exports = router;
