var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  username = ''
  if(req.cookies.username) {
    username = req.cookies.username;
  }
  console.log("Logged in user: " + username);
  res.render('index', { title: 'Cash Clicker', user_id: username });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Cash Clicker' });
});

router.post('/signin', function(req, res, next) {
  res.cookie('username', req.body.username, { maxAge: 60000 });
  res.status(200).redirect('/');
});

router.post('/signout', function(req, res, next) {
  res.cookie('username', '', { maxAge: 60000 });
  res.status(200).redirect('/');
});

module.exports = router;
