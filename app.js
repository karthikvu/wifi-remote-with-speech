var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var volctrl = require('./routes/volume-control');
var discovery = require('./routes/discovery');
var vol = require('vol');
var scanner = require('node-libnmap');
var nmap = require('libnmap'),
    opts = {
        range: ['192.168.0.0-5'],
        ports: 3000,
        verbose: false
    };

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, '../client'));

app.use(express.static(__dirname + '/client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
    //res.render('../client/index.html');
    res.render('index');
});

app.use('/users', users);
app.use('/volume', volctrl)
app.use('/discovery', discovery)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;