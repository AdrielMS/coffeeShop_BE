const { Client } = require("pg");
const {USER, HOST, DATABASE, PASSWORD, PORT} = process.env

const db = new Client({
  user: USER,
  // host: "localhost",
  host: HOST,
  // database: "coffee_shop",
  database: DATABASE,
  // password: "admin",
  password: PASSWORD,
  port: PORT,
});

db.connect((err) => {
  if (err) {
    console.log("db connection error", err);
  }
});

module.exports = db;
