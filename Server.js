//app server setup
var express = require('express')
var app = express()
var request = require('request');

app.use(express.static(__dirname+'/www/'))
app.listen(5000)

//reverse proxy stuff here
//does not work with $metadata
app.get('/sap/opu/odata/CITEXP/EXPENSES_SRV/', function (req,res){
request.get('http://q12gw20.eai-ltd.co.uk:8012/sap/opu/odata/CITEXP/EXPENSES_SRV/$metadata', {
  'auth': {
    'user': 'mkelsall',
    'pass': 'pr0file1',
    'sendImmediately': true
  }
}).pipe(res);
})
