var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var routes = require('./routes/router');
var api = require('./routes/api');

var app = express();

app.use(compression());

app.use(morgan(':status :method :url'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

// API Calls
app.use('/api', api);

// General Routing
app.use('/', routes);

// Error Handling
app.use('*', function(req, res, next){res.sendFile(path.resolve(__dirname, './../public/html/error.html'))});



module.exports = app;
