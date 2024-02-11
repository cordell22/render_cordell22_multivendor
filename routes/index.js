var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', function(req, res) {
  //  res.redirect('/catalog');
  //  res.send('Shopping Ma Niggaz')
  res.redirect('/shop');
});

module.exports = router;
