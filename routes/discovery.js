var express = require('express');
var router = express.Router();
var scanner = require('node-libnmap');

/* GET home page. */
router.get('/', function (req, res, next) {
    scanner.nmap('discover', function (err, report) {
        if (err) console.error(err);
        console.log(report);

        res.send({
            "route": "discovery",
            "data": report
        });
    });
});



module.exports = router;