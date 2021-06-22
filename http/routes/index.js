var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var fs = require('fs');

router.get("/admin", verifyIdAdmin, function (req, res) {
  res.render('admin', { title: 'admin' });
})

router.get("/user", verifyIdUser, function (req, res) {
  res.render('user', { title: 'user' });
})

router.get("/", function (req, res) {
  res.redirect('http://0.0.0.0:4000');
})

function verifyIdAdmin(req, res, next) {
  var token = req.cookies.token;
  console.log("printa")
  if (token == null) res.redirect('http://0.0.0.0:4000');

  var secretKey = fs.readFileSync('./public.key','utf8');
  jwt.verify(token, secretKey, { algorithm: ["RS256"] }, function (err, decoded) {
      if (err) res.redirect('http://0.0.0.0:4000');
      if (decoded === undefined) res.redirect('http://0.0.0.0:4000');
      if (decoded.level !== 1) res.redirect('http://0.0.0.0:4004/admin');
      next();
  });
}

function verifyIdUser(req, res, next) {
  var token = req.cookies.token;
  if (token == null) res.redirect('http://0.0.0.0:4000');

  var secretKey = fs.readFileSync('./public.key','utf8');
  jwt.verify(token, secretKey, { algorithm: ["RS256"] }, function (err, decoded) {
      if (err) res.redirect('http://0.0.0.0:4000');
      if (decoded === undefined) res.redirect('http://0.0.0.0:4000');
      if (decoded.level !== 0) res.redirect('http://0.0.0.0:4004/user');
      next();
  });
}

module.exports = router;