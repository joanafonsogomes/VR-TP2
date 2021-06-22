var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = 'http://localhost:8002'
var authenticationUrl = 'http://localhost:8001/'
var indexRouter = require('./routes/index');
var jwt = require('jsonwebtoken')

var app = express();
app.use(cookieParser())
/*
app.use(function (req, res, next) {
  if (req.cookies.token == null) {
      switch (req.url) {
          case "/users/signup": next();
              break;
          case "/users/login":
              res.cookie('url',url);
              res.redirect(authenticationUrl+'login')
              break;
          case "/favicon.ico": next();
              break;
          default: 
              res.cookie('url',url+req.url);
              res.redirect(authenticationUrl+'login')
              break;
      }
  } else { // authentication
      jwt.verify(req.cookies.token, 'VR2021', function (e, payload) {
          if (e) {
              res.cookie('url',url+req.url);
              res.redirect(authenticationUrl+'login')
          } else {
              req.user = {
                  level: payload.level,
                  _id: payload._id,
                  name: user.name
              }
              next();
          }
      })
  }
})
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
