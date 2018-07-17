var express = require('express');

var router = express.Router();

const path = require('path');

router.get('/', function(req,res,next){
    console.log('within get');
    res.render('index' , {title : 'Cloudy with Meat Ball API'});
});

module.exports = router;