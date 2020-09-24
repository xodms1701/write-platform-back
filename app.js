const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const seriesRouter = require('./routes/series');
const boardRouter = require('./routes/board');

const dbConnector = require('./dbConnector');
dbConnector.authenticate()
  .then(() => {
    console.log('Connection Success');
  })
  .catch(err => {
    console.log(err)
  });

const User = require('./models/User');
const Board = require('./models/Board');
const Reply = require('./models/Reply');
const Series = require('./models/Series');
const Membership = require('./models/Membership');

User.sync({force: false});
Membership.sync({force: false});
Series.sync({force: false});
Board.sync({force: false});
Reply.sync({force: false});

User.hasMany(Board, {foreignKey: 'user_id'});
Board.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Reply, {foreignKey: 'user_id'});
Reply.belongsTo(User, {foreignKey: 'user_id'});

Reply.hasOne(Reply, {foreignKey: 'parent_id'});

Series.hasMany(Board, {foreignKey: 'series_id'});
Board.belongsTo(Series, {foreignKey: 'series_id'});

Board.hasMany(Reply, {foreignKey: 'board_id'});
Reply.belongsTo(Board, {foreignKey: 'board_id'});

User.hasOne(Membership, {foreignKey: 'user_id'});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/series', seriesRouter);
app.use('/board', boardRouter);

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
