var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false }
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
      res.render('user', {user_id: user_id, username: result.rows[0].username, date: result.rows[0].date_created.toDateString(), cash: result.rows[0].cash });
    }
  });
});

module.exports = router;
