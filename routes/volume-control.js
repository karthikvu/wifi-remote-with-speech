var express = require('express');
var router = express.Router();
var vol = require('vol');
var currentVol = 0;


vol.get(function (err, level) {
    currentVol = vol * 100;
});


/*setInterval(function () {
    vol.get(function (err, level) {
        currentVol = vol * 100;
    });
}, 1000);*/

/* GET home page. */
router.get('/', function (req, res, next) {
    vol.get(function (err, level) {
        currentVol = level * 100;
        res.send({
            "route": "volume",
            "state": "up",
            "level": currentVol
        });
    });

});



router.get('/up', function (req, res, next) {
    vol.get(function (err, level) {
        console.log(level);
        var cV = level * 100;
        if (cV > 99) {
            res.send({
                "route": "volume",
                "state": "up",
                "level": 100
            });
        } else {
            var newVol = cV + 5;
            vol.set(newVol / 100, function (err) {
                res.send({
                    "route": "volume",
                    "state": "up",
                    "level": newVol
                });
            });
        }

    });
});

router.get('/down', function (req, res, next) {
    vol.get(function (err, level) {
        console.log(level);
        var cV = level * 100;
        if (cV < 1) {
            res.send({
                "route": "volume/down",
                "state": "up",
                "level": 0
            });
        } else {
            var newVol = cV - 5;
            vol.set(newVol / 100, function (err) {
                res.send({
                    "route": "volume/down",
                    "state": "up",
                    "level": newVol
                });
            });
        }

    });
});



router.get('/mute', function (req, res, next) {

    vol.mute(function (err) {
        console.log('Volume muted');
    });

/*vol.get(function (err, level) {
    console.log(level);
    var cV = level * 100;
    if (cV < 1) {
        res.send({
            "route": "volume/mute",
            "state": "up",
            "level": 0
        });
    } else {
        var newVol = 0;
        vol.set(newVol / 100, function (err) {
            res.send({
                "route": "volume/mute",
                "state": "up",
                "level": newVol
            });
        });
    }

});*/
});

module.exports = router;