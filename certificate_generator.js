var csrgen = require('csr-gen');
var fs = require('fs');

var domain = 'localhost';

csrgen(domain, {
    outputDir: __dirname,
    read: true,
    company: 'Brav',
    email: 'nextgenerationmediation@gmail.com'
}, function(err, keys){
    console.log('CSR created!')
    console.log('key: '+keys.private);
    console.log('csr: '+keys.csr);
});

