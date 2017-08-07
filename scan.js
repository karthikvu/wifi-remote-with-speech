var nmap = require('libnmap'),
    opts = {
        range: [
        'scanme.nmap.org',
        '0.0.0.0/255'
      ]
    };

nmap.scan(opts, function (err, report) {
    if (err) throw new Error(err);

    for (var item in report) {
        console.log(JSON.stringify(report[item]));
    }
});