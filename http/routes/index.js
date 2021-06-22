var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get("/admin", function (req, res) {
  res.render('admin', { title: 'admin' });
})

router.get("/user", function (req, res) {
  res.render('user', { title: 'user' });
})

module.exports = router;