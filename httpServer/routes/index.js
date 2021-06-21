var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get(['/alunos','/'], (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  axios.get('http://localhost:3000/alunos')
  .then(response=>{ 
    console.log(response)
    res.render('index', {lista: response.data})
  })
})

router.get('/alunos/:id', (req, res) => {
  //res.render('alunos', {alunos: registos /* vem da base de dados */})
  axios.get('http://localhost:3000/alunos'+req.params.id)
  .then(response=>{ 
    console.log(response)
    res.render('index', {lista: response.data})
  })
})
module.exports = router;
