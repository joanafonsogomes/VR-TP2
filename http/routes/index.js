var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var fs = require('fs');


router.get("/admin", verifyIdAdmin, function (req, res) {
  var content = JSON.parse(fs.readFileSync('./httpvol/httpLog.json','utf8'));
  res.render('admin', { title: 'admin' , content});
})

router.get("/user", verifyIdUser, function (req, res) {
  res.render('user', { title: 'user' });
})

router.get("/logout", function (req, res) {
  res.cookie('token',null);
  res.redirect('http://0.0.0.0:4000');
})

router.all('*',verifyIdUser, function (req, res, next) {
  res.redirect('/user');
});

function verifyIdAdmin(req, res, next) {
  var token = req.cookies.token;
  if (token == null) res.redirect('http://0.0.0.0:4000');
  var secretKey = fs.readFileSync('./public.key','utf8');
  jwt.verify(token, secretKey, { algorithm: ["RS256"] }, function (err, decoded) {
      console.log("ERRO " + err)
      if (err) res.redirect('http://0.0.0.0:4000');
      console.log("DECODED " + JSON.stringify(decoded))
      if (decoded === undefined) res.redirect('http://0.0.0.0:4000');
      if (decoded.level !== 1) res.redirect('/user');
      next();
  });
}

function verifyIdUser(req, res, next) {
  var token = req.cookies.token;
  if (token == null) res.redirect('http://0.0.0.0:4000');
  var secretKey = fs.readFileSync('./public.key','utf8');
  jwt.verify(token, secretKey, { algorithm: ["RS256"] }, function (err, decoded) {
      if (err) res.redirect('http://0.0.0.0:4000');
      console.log("DECODED " + JSON.stringify(decoded))
      if (decoded === undefined) res.redirect('http://0.0.0.0:4000');
      if (decoded.level !== 0) res.redirect('/admin');
      var jsonLog = [];
      jsonLog = JSON.parse(fs.readFileSync('./httpvol/httpLog.json','utf8'));
      console.log("POOP " + JSON.stringify(decoded));
      var loggar = decoded.id;
      jsonLog.push(loggar);
      fs.writeFileSync('./httpvol/httpLog.json',JSON.stringify(jsonLog));
      next();
  });
}

module.exports = router;