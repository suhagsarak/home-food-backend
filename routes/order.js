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
router.get("/userOrder", (request, response) => {
  const uid = request.query.uid;
  const statement = `select * from orders where uid=${uid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// get single order details with product list
router.get("/details", (request, response) => {
  const oid = request.query.oid;
  const statement1 = `select * from orders where oid=${oid}`;
  const connection = db.connect();
  connection.query(statement1, (error, data) => {
    if (!error && data && data.length) {
      const order = data[0];
      const statement2 = `select P.pid, P.name, P.category, P.price from Product P INNER JOIN productsInOrders OP on OP.pid = P.pid where OP.oid = ${oid}`;
      connection.query(statement2, (error, data) => {
        if (!error) {
          connection.end();
          order.products = data;
          response.send(order);
        } else {
          connection.end();
          response.send(data);
        }
      });
    } else {
      connection.end();
      response.send(data);
    }
  });
});

// cancel order update
router.get("/cancel", (request, response) => {
  const oid = request.query.oid;
  const statement = `update orders set status="CANCELLED" where oid=${oid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

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
