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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', function(req, res, next) {
  user_id = ''
  if(req.cookies.username) {
    user_id = req.cookies.username;
  }
  pool.query("SELECT * FROM users WHERE username=$1", [req.params.username], function(err, result) {
    if(err) {
      res.status(404).send();
    } else {
      console.log(result.rows[0].date_created.toDateString());
      res.render('user', {user_id: user_id, username: result.rows[0].username, date: result.rows[0].date_created.toDateString(), cash: result.rows[0].cash });
    }
  });
});

module.exports = router;
