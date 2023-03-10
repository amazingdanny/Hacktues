var mysql = require('mysql');


require('dotenv').config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD
});
con.query("CREATE DATABASE mydb", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});

const res = await con.query
