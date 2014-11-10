var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config/config');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var ueditor = require("ueditor");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(flash());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(config.cookieSecret));
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db, //cookie name
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }, //30 days
  store: new MongoStore({
     db: settings.db
 })
}));
app.use(express.static(path.join(__dirname, 'public')));


//template helpers
require('./lib/helpers')(app);

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var db = require('./lib/db');
db.getConnection(function(db) {
  app.use(function(req, res, next){
    req.db = db;
    next();
  });

  app.use('/', require('./routes/index'));
  app.use('/finance', require('./routes/finance'));
  app.use('/donate', require('./routes/donate')); // 爱心捐助
  app.use('/about', require('./routes/about'));
  app.use('/background', require('./routes/background'));
  app.use('/aiding', require('./routes/aiding'));
  app.use('/news', require('./routes/news'));
  app.use('/volunteer', require('./routes/volunteer'));  //  add volunteer route
  app.use('/signin', require('./routes/signin'));
  app.use('/signup', require('./routes/signup'));
  
  // /// catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  var debug = require('debug')('diandian-express');

  var server = app.listen(process.env.PORT || 3000, function() {
    debug('Express server listening on port ' + server.address().port);
  });

});
