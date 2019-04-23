
const express = require("express");
const app = express();
var mysql = require('mysql');

app.use(express.static('public'));

// connection object
var con = mysql.createConnection({
  host: "http://localhost:3306",
  database: "cs337final",
  user: "root",
  password: "Unlock-sql_complete2739",
  debug: "true"
});
console.log("connected");

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	let city = query.city;

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		});
	});
})
