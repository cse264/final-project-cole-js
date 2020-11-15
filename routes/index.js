var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
  host: 'ec2-34-232-24-202.compute-1.amazonaws.com',
  user: 'enrudtpvrsgwum',
  database: 'd1d9qff1vs7qpm',
  password: 'b7acfced35709d3c415d928254be7a310b325a45de5e117e242ff66185ddd7db',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

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
  if(req.query.reattempt == 'true') {
    res.render('signin', { title: 'Cash Clicker', reattempt: 'true'});
  } else {
    res.render('signin', { title: 'Cash Clicker', reattempt: 'false'});
  }
});

router.get('/signup', function(req, res, next) {
  if(req.query.error == 'true') {
    res.render('signup', { title: 'Cash Clicker', error: 'true' });
  } else {
    res.render('signup', { title: 'Cash Clicker', error: 'false' });
  }
});


router.post('/signup', function(req, res, next) {
  pool.query('INSERT INTO users (username, password, date_created, cash) VALUES ($1, $2, $3, $4)', 
      [req.body.username, req.body.password, new Date(), 0], (err, result) => {
    console.log(err, result);
    if(err) {
      res.status(400).redirect('/signup?error=true');
    } else {
      res.status(200).redirect('/');
    }
  })
});

router.post('/signin', function(req, res, next) {
  pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [req.body.username, req.body.password], (err, result) => {
    console.log(err, result.rows[0]);
    if(result.rows[0] == null) {
      console.log("user not found");
      res.status(401).redirect('/signin?reattempt=true');
    } else {
      console.log("user found");
      res.cookie('username', req.body.username, { maxAge: 60000 });
      res.status(200).redirect('/');
    }
  })
});

router.post('/signout', function(req, res, next) {
  res.cookie('username', '', { maxAge: 60000 });
  res.status(200).redirect('/');
});

router.post('/getCash', function(req, res, next) {
  pool.query("UPDATE users SET cash=cash+1 WHERE username=$1", [req.body.username], (err, result) => {
    console.log(err, result);
    res.status(200).send();
  })
});

module.exports = router;
