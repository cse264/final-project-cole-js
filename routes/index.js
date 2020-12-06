var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  var cash = 0
  if(req.cookies.username) {
    username = req.cookies.username;
    pool.query("SELECT cash FROM users WHERE username=$1", [req.cookies.username], (err, result) => {
      if(err) {
         
      } else {
        cash = result.rows[0].cash;
        res.render('index', { title: 'Cash Clicker', user_id: username, cash: cash });
      }
    });
  } else {
    res.render('index', { title: 'Cash Clicker', user_id: username, cash: cash });
  }
});

router.get('/admin', function(req, res, next) {
  if(req.cookies.username) {
    pool.query("SELECT role_id FROM users WHERE username=$1", [req.cookies.username], (err, result) => {
      if(result.rows[0].role_id == 2) {
        res.render('admin', { title: 'Cash Clicker', user_id: req.cookies.username });
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/signin');
  }
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
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    pool.query('INSERT INTO users (username, password, date_created, cash) VALUES ($1, $2, $3, $4)', 
      [req.body.username, hash, new Date(), 0], (err, result) => {
      if(err) {
        res.status(400).redirect('/signup?error=true');
      } else {
        res.cookie('username', req.body.username, { maxAge: 600000 });
        res.status(200).redirect('/');
      }
    })
  });
});

router.post('/signin', function(req, res, next) {
  pool.query('SELECT * FROM users WHERE username=$1', [req.body.username], (err, result) => {
    if(result.rows[0] == null) {
      res.status(401).redirect('/signin?reattempt=true');
    } else {
      bcrypt.compare(req.body.password, result.rows[0].password, function(err, compareResult) {
        if (compareResult) {
          res.cookie('username', req.body.username, { maxAge: 600000 });
          res.status(200).redirect('/');
        } else {
          res.status(401).redirect('/signin?reattempt=true');
        }
      });
    }
  })
});

router.post('/signout', function(req, res, next) {
  res.cookie('username', '', { maxAge: 600000 });
  res.status(200).redirect('/');
});

router.post('/getCash', function(req, res, next) {
  pool.query("UPDATE users SET cash=cash+1 WHERE username=$1", [req.body.username], (err, result) => {
    res.status(200).send();
  })
});

router.put('/cash', function(req, res, next) {
  pool.query("UPDATE users SET cash=$1 WHERE username=$2", [req.body.cash, req.body.username], (err, result) => {
    res.status(200).send();
  })
});

router.get('/leaderboard', function(req, res, next) {
  username = ''
  if(req.cookies.username) {
    username = req.cookies.username;
  }
  pool.query("SELECT username, cash FROM users ORDER BY cash DESC", (err, result) => {
    res.render('leaderboard', {title: "Cash Clicker", data: result.rows, user_id: username})
  });
});

module.exports = router;
