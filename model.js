const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  database: "testDb",
  password:"mskumar1045"
});

// Connect to the MySQL server
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
})

module.exports = conn;