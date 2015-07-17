//need express installed locally to folder
var express = require('express')
//need request installed locally to folder
var request = require('request')
var app = express()
app.use(express.static(__dirname + '/www/'));
console.log('express server started on localhost:8080')

var proxyUrl = '/sap/opu/odata/CITEXP/EXPENSES_SRV/'
var serviceUrl = 'https://q12gw20.eai-ltd.co.uk/sap/opu/odata/CITEXP/EXPENSES_SRV/'
var username = 'uchobe';
var password = 'pr0file1';

app.get(proxyUrl + '*', function(req, res){
  console.log('req.originalUrl: ' + req.originalUrl);

  if (req.originalUrl.length === proxyUrl.length) {
    console.log('no entity provided after end point, call metadata')
    request({
      'rejectUnauthorized': false,
      'url': serviceUrl + '$metadata',
      'method': 'GET',
      'auth': {
        'user': username,
        'pass': password,
        'sendImmediately': true
      },
    }, function(err, response, body){
      // console.log(err);
      // console.log(response);
      // console.log(body);
    }).pipe(res);
  } else {
    var serviceCallUrl = req.originalUrl.substr(proxyUrl.length, req.originalUrl.length - 1)
    console.log('serviceCallUrl: ' + serviceCallUrl)

    request({
      'rejectUnauthorized': false,
      'url': serviceUrl + serviceCallUrl,
      'method': 'GET',
      'auth': {
        'user': username,
        'pass': password,
        'sendImmediately': true
      },
    }, function(err, response, body){
      // console.log(err);
      // console.log(response);
      // console.log(body);
    }).pipe(res);
  }

  //basic request with no authentication to external service
  // request('http://services.odata.org/V4/Northwind/Northwind.svc/', function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     console.log(body);
  //     res.send(body);
  //   }
  // })

  //basic request with hard coded authentication to internal service
  // request
  // .get('http://q12gw20.eai-ltd.co.uk:8012/sap/opu/odata/CITEXP/EXPENSES_SRV/$metadata')
  // .auth('mkelsall', 'pr0file1', false)
  // .on('response', function(response) {
  //   console.log(response.statusCode) // 200
  //   console.log(response.headers['content-type']) // 'image/png'
  //   res.send(response);
  // })

  //basic request with hard coded authentication - alternative method
  // request.get('https://q12gw20.eai-ltd.co.uk/sap/opu/odata/CITEXP/EXPENSES_SRV/', {
  //   'auth': {
  //     'user': 'mkelsall',
  //     'pass': 'pr0file1',
  //     'sendImmediately': true
  //   }
  // }).pipe(res);

  //basic auth with hard coded authentication and https
  // request({
  //   'rejectUnauthorized': false,
  //   'url': 'https://q12gw20.eai-ltd.co.uk/sap/opu/odata/CITEXP/EXPENSES_SRV/',
  //   'method': 'GET',
  //   'auth': {
  //     'user': username,
  //     'pass': password,
  //     'sendImmediately': true
  //   },
  // }, function(err, response, body){
  //   // console.log(err);
  //   // console.log(response);
  //   // console.log(body);
  // }).pipe(res);
});

app.listen(8080)
