const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "be_test",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("db connected....");

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM ti20";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: " TI 20 DB " });
    });

    app.post("/tambah", (req, res) => {
      const insertSql = `INSERT INTO ti20 (nama, nim) VALUE('${req.body.nama}','${req.body.nim}');`;
      db.query(insertSql, (err, result) => {
        if (err) throw err;
        res.redirect("/");
      });
      //crud methode
    });
  });
});

app.listen(8000, () => {
  console.log("server ready...");
});
