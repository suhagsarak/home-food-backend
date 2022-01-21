const express = require("express");
const moment = require("moment");
const db = require("../db");

const router = express.Router();

// show all orders
router.get("/", (request, response) => {
  const statement = "select * from orders";
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// get user specific orders

// get single order details with product list

// cancel order update


// delete orders
router.get("/delete", (request, response) => {
  const oid = request.query.oid;
  const statement = `delete from orders where oid=${oid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// add orders
router.post("/create", (request, response) => {
  const time = moment().format();
  const totalPrice = request.body.totalPrice;
  const uid = request.body.uid;

  const statement1 = `insert into orders (time, totalPrice, status,uid) values ("${time}",${totalPrice}, "RECEIVED", ${uid});`;

  const connection = db.connect();
  connection.query(statement1, (error, data) => {
    if (!error) {
      // add products

      let statement2 = "insert into productsInOrders (oid, pid) values ";
      const products = request.body.products;

      for (let i = 0, l = products.length; i < l; i++) {
        if (i < l - 1) {
          statement2 += `( ${data.insertId}, ${products[i]}),`;
        } else {
          statement2 += `( ${data.insertId}, ${products[i]});`;
        }
      }
      const connection = db.connect();
      connection.query(statement2, (error, data) => {
        connection.end();
        response.send(data);
      });

    } else {
      connection.end();
      response.send(data);
    }
  });
});

module.exports = router;
