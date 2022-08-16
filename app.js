/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable no-var */
/* eslint-disable no-multiple-empty-lines */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// axilary middlewares
var bodyParser = require('body-parser');
var glob = require('glob');
var compression = require('compression');
var helmet = require('helmet');
var methodOverride = require('method-override');

var app = express();
// import config files
require('dotenv').config();
// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(compression());

// Helmet with no CSP
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(methodOverride('_method'));
app.use(cookieParser());

/* Configure database */
const db = require('./database/index')('./database/models/*.js');
db.connect('mongodb://localhost/online');

/* Configure routes */
const routes = glob.sync('./routes/*.js');
routes.forEach(async (route) => {
  require(route)(app, db);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 - Keep this as a last route
app.use((req, res) => {
  res.status(404);
  res.render('error', {});
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
