var express = require('express');
// It is a module of nodeJS . The path module provides utilities for working with file and directory paths. 
// It can be accessed using:
var path = require('path');

//It is used since most user-agents requires favicon.ico so they make the GET /favicon.ico . This middleware skips that
var favicon =  require('serve-favicon');

//It is used to log request response
var logger = require('morgan');

//It is a middleware module which is required to parse a HTTP post request and expose on req.body
var bodyParser = require('body-parser');

var apiRoutes =  require('./routes/routes');

var app = express();

//view engine setUp

//normalise the resulting path
app.set('views',path.join(__dirname,'views'));
app.set('view engine' , 'jade');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(express.static(path.join(__dirname,'dist/cloudyAtMeatBall')));

app.use('/home', express.static(path.join(__dirname,'dist/cloudyAtMeatBall')));

app.use('/api',apiRoutes);


//catch 404 and forward to error handler

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//error handler

app.use(function(err,req,res,next){
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {} ;

    //render the error page
    res.status(err.status || 500);
    res.render('error');
})


module.exports = app;