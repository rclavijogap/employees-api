var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employees');
var usersRouter = require('./routes/users');
const security = require('./utils/security');

var app = express();

app.use(function(req, res, next){
  if (req.url !== "/users/signin" || req.url !== "/users/signup") {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.statusCode = 401;
      res.send("Unauthorized");
      return;
    }

    try {
      security.validateAccessToken(accessToken);
    } catch (error) {
      res.statusCode = 401;
      res.send(error.message);
      return;
    }
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/employees', employeesRouter);
app.use('/users', usersRouter);

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

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


module.exports = app;
