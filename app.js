require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const session = require('express-session');
const passport = require('./passport');

// Routes
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const itemRouter = require('./routes/item');
const auth = require('./routes/auth')

const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

// Compress all routes 
app.use(compression());

const RateLimit = require('express-rate-limit');

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20
})


app.use(limiter)

app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true, cookie: {maxAge: 1000 * 60 * 60 * 24}}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.admin = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/', categoryRouter);
app.use('/', itemRouter);
app.use('/', auth);

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
