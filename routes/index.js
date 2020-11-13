var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cash Clicker', user_id: '' });
});

/* GET home page (signed in). */
router.get('/signedin', function(req, res, next) {
  res.render('index', { title: 'Cash Clicker', user_id: '1' });
});

module.exports = router;
