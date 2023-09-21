const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var cors = require("cors");

const ports = process.env.PORT || 3000;
const server = express();
server.use(bodyParser.json());
server.use(cors());

//CREATE CONNECTION ==========
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
  port: 3306,
});

// DB CONNECTION ===========
db.connect((err) => {
  if (err) {
    return err;
  }
});
// checking connection
server.listen(ports, () => {
  console.log("server running ", ports);
});

// get single user data
// get all user data
server.post("/adminUserLoginAPI", (req, res) => {
  console.log(req);
  let username = req.body.username;
  let password = req.body.password;

  let qr = `SELECT * FROM admin_users WHERE username='${username}' and password='${password}' AND status_id=1`;
  db.query(qr, (err, result) => {
    console.log(result);
    if (err) {
      console.log("Error : ", err);
      return err;
    }
    if (result.length > 0) {
      res.send({
        status:true,
        message: "login successfully",
        data: result
      });
    }
    else{
      res.send({
        status:false,
      })
    }
  });
});
server.get("/adminuser", (req, res) => {
  // console.log("get user successfully....");
  let qr = "select * from admin_users";
  // console.log("get ll ")
  console.log(qr);
  db.query(qr, (err, result) => {
    console.log(result);
    if (err) {
      console.log("Error : ", err);
      return err;
    }
    if (result.length > 0) {
      res.send({
        message: "get all user details",
        data: result,
      });
    }
  });
});

// get all brand data
server.get("/viewBrand", (req, res) => {
  // console.log("get user successfully....");
  let qr = "select * from brand";
  // console.log("get ll ")
  console.log(qr);
  db.query(qr, (err, result) => {
    console.log(result);
    if (err) {
      console.log("Error : ", err);
      return err;
    }
    if (result.length > 0) {
      res.send({
        message: "get all brand details",
        data: result,
      });
    }
  });
});
// create brand data ===> POST
server.post("/addBrand", (req, res) => {
  console.log(req, "request");
  console.log(res, "response");
  console.log(req.body, "create data");
  
  let name = req.body.name;
  let img = req.body.img;
  let statusid = req.body.statusid;
  let createdat=req.body.createdat;
  let updatedat=req.body.updatedat;
  console.log(name,img,statusid,createdat,updatedat);
  let qr = `INSERT INTO brand(name, img, status_id, createdat, updatedat) VALUES(
              '${name}',
              '${img}',
              '${statusid}',
              '${createdat}',
              '${updatedat}'
              )`;
              console.log(qr)
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "error");
    }
    console.log(result, "result");
    res.send({
      message: "single brand data inserted successfully..",
    });
  });
});


