const createError = require('http-errors');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const appDir = path.dirname(require.main.filename);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const logger_body = require('morgan-body');
const context = require('./context/context');
const cors = require('cors');
const httperror = require('http-errors');
const session = require('express-session');
//DB
const clientListener = require('./database/client-listener');
const setClientDb = require('./database/set-client-db');
//Routes
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const postLikeRouter = require('./routes/post-like');



const app = express();
// app.set('subdomain offset', 2);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//add logger
app.use(logger('dev'));

app.use(session({
  secret: 'treehouse',
  resave: true,
  saveUninitialized: false
}));

//cors
if (process.env.CORS_WHITELIST !== undefined) {
  let whitelist = process.env.CORS_WHITELIST.split(',');
  console.log(whitelist);
}
let corsOptions = {
  "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS"
}

app.use(cors(corsOptions));
console.log(process.env.PORT || '3000');
app.use(bodyParser.json({ limit: "50mb", type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use('/basis/public', express.static(path.join(__dirname, 'public')));


//Db Config
app.use(clientListener());
app.use(setClientDb());

app.use('/basis/users', userRouter);
app.use('/basis/posts', postRouter);
app.use('/basis/comments', commentRouter);
app.use('/basis/post_likes', postLikeRouter);




// init context
context.initialize();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new httperror.NotFound();
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const response = {
    success: false,
    data: (err.message) ? err.message : "Error"
  }
  res.status(err.status || 500).send(response);
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
