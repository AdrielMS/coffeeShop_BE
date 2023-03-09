const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  // host: "localhost",
  host: "db.vnaryaewnfnthieeltnt.supabase.co",
  // database: "coffee_shop",
  database: "postgres",
  // password: "admin",
  password: "@Ms21122012@Ms7895123",
  port: 5432,
});

db.connect((err) => {
  if (err) {
    console.log("db connection error", err);
  }
});

module.exports = db;
