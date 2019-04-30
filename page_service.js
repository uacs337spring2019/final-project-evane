/*
Evan Ellingsberg
CSC 337, Spring 2019
Final
Program: Final
This file handles service for the html page. It accesses the sql database and
sends back table data depending on what url mode is fetched. The modes are the
commands found in the html page with change the query to the database.
*/
const express = require("express");
const app = express();

const fs = require("fs");

app.use(express.static('public'));



app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  let file = fs.readFileSync("recipes.txt", "utf8");
  console.log(file);
  res.send(file);
})

app.listen(3000);
