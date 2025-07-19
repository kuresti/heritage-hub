/**************************
 * Required resources
 **************************/
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../dist/heritage-hub/browser/index.html'));
});

/* Exports route */
module.exports = router;