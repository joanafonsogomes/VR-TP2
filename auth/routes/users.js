var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../controllers/user');


router.get('/', function(req, res) {
  res.render('login', { title: 'VR-TP2' });
});

router.get('/registar', function(req, res) {
  res.render('registar', { title: 'VR-TP2' });
});

router.get('/profile/', function(req, res) {
  res.render('profile', { title: 'VR-TP2'});
});

router.get('/auth', function(req, res) {
  res.render('auth', { title: 'VR-TP2' });
});

/* Autenticação utilizador e geração de token para a sessão */
router.post('/login', (req, res) => {
  var email = req.body.email
  var password = req.body.password
  User.lookup(email)
  .then(data => {
    if(data.email == email && data.password == password){
      const id = email; 
      const token = jwt.sign({ id }, "segredo", {
        expiresIn: 1800 // expires in 30min
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + "1d"),
        secure: false, // set to true if your using https
        httpOnly: true,
      });
      res.redirect('/profile')
    }
    else{
      res.cookie("auth", "1", {
        expires: new Date(Date.now() + "1d"),
        secure: false, // set to true if your using https
        httpOnly: true,
      });
      res.redirect("/");
    }
  })
  .catch(err => res.status(500).json({message: 'Login inválido!'+ err}))  // erro no lookup   
})


router.post('/registar', (req,res)=>{
  user = req.body
  User.insert(user)
  .then(data => res.redirect('/'))
  .catch(err => res.status(404).json({message: err}))
})



module.exports = router;