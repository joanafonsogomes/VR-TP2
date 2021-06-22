var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../controllers/users');
var fs = require('fs');

/* GET home page. */
router.get('/login', function(req, res, next) {
  //if(req.cookies.auth == "1"){
  //  res.cookie("auth", {expires: Date.now});
  //  res.render('login', { title: 'Login' });
  //}
  res.render('login', { title: 'Login' });
});

router.get("/signup", function (req, res) {
  res.render('signup', { title: 'signup' });
})

router.get("/homepage", function (req, res) {
  res.render('homepage', { title: 'homepage' });
})

router.get('/auth', function(req, res) {
  link = req.query.link
  token = req.cookies.token
  if(token == null){
    res.render('login', { title: 'Login' });
  }
  else{
    console.log(token)
    res.render('auth', { title: 'Authentication' });
  }

});

router.get('/', function(req, res, next) {
  res.redirect('/login')
});


router.post('/login', function(req, res, next) {
  console.log(req.body._id)
  User.lookUp(req.body._id).then((dados) => {
    const user = dados;
    if (! user) {
      res.render('loginError', { title: 'Login',error:'User not registered' });
    } else {
        if (req.body.password == user.password) {
            var privateKey = fs.readFileSync('./private.key','utf8');
            console.log("USER" + user)
            var token = jwt.sign({
                id: user._id,
                name: user.name,
                level: user.level
            }, privateKey, {
                expiresIn: "1d",
                algorithm: 'RS256'
            }); 
            console.log("TOKEN" + token)
            // function (err, token) {
            //     console.log("TOKEN" + token + " " + err)
            //     if (err) {
            //       res.render('loginError', { title: 'Login',error:'Could not login' });
            //     } else {
            //       res.cookie('token', token)
            //       if(user.level==1){
            //         res.redirect('http://0.0.0.0:4004/admin')
            //       }
            //       else if(user.level==0){
            //         res.redirect('http://0.0.0.0:4004/user')
            //       }
            //     }
            // });
        } else {
          res.render('loginError', { title: 'Login',error:'Wrong password' });
        }
    }
});
});

router.post("/signup", function (req, res) {
  var user = req.body;
  if(user.level == 'admin'){
    user.level=1
  }
  else{
    user.level=0
  }
  User.insereUser(user).then(() => {
      res.redirect('/login')
  }).catch((err) => {
      res.status(500).jsonp({error: err})
  });
  
});

router.post('/verifyToken', function(req,res){
  var token = req.body.token;
  jwt.verify(token, 'VR2021', function (e, payload) {
    if (e) {
        res.status(403).jsonp({msg:"JWT is not valid."});
    } else {
        res.status(200).jsonp({msg:'JWT is valid'})
    }
  })
})

module.exports = router;
