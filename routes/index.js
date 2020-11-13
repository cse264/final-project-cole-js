var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cash Clicker', user_id: '' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Cash Clicker' });
});

router.post('/signin', function(req, res, next) {
  res.render('index', { title: 'Cash Clicker', user_id: req.body.username })
});

module.exports = router;
