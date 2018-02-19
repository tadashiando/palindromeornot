var express = require('express');
var lowerCase = require('lower-case')
var app = express();

// Definir a route principal
app.get('/', function(req, res) {
  res.send('Welcome to API');
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function isPalindrome(str) {
  str = lowerCase(str);
    str = str.replace( /[\s~`!@#$%^&*()-_+=[\]{}\\|:;"',<>.?\/\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F]/g, '');
    return str == str.split('').reverse().join('');
}

// Definir um endpoint da API
app.get('/api/palindromeornot', function(req, res) {
  var text = req.query.text;
  var palin = isPalindrome(text);
  if (palin) {
    res.sendStatus(200);
  } else {
    res.status(400).json({status:"wrong"});
  }
})

// Aplicação disponível em http://127.0.0.1:9000/
app.listen(3000);
