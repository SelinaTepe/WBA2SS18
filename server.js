const http = require('http');
const app = require('./app');
var bodyParser = require('body-parser');

const server = http.createServer(app);
const serviceUrl = 'http://localhost:'


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const settings = {
  port: process.env.PORT || 3000
//  datafile : "./testDataUsers.json"
};

server.listen(settings.port);
console.log("Der Dienstgeber ist unter der Url: "+ serviceUrl +" nun auf dem Port " + settings.port  + " verfuegbar");
