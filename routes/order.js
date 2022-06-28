const express = require("express");
const moment = require("moment");
const db = require("../db");

const router = express.Router();

// add orders
router.post("/create", (request, response) => {
  const time = moment().format();
  const totalPrice = request.body.totalPrice;
  const uid = request.body.uid;
  const statement1 = `insert into orders (time, totalPrice, status, uid) values ("${time}",${totalPrice}, "RECEIVED", ${uid});`;
  const connection = db.connect();
  connection.query(statement1, (error, data) => {
    if (!error) {
      // add products
      let statement2 = "insert into productsinorders (oid, pid, count) values ";
      const products = request.body.products;
      for (let i = 0, l = products.length; i < l; i++) {
        if (i < l - 1) {
          statement2 += `( ${data.insertId}, ${products[i].pid}, ${products[i].count}), `;
        } else {
          statement2 += `( ${data.insertId}, ${products[i].pid}, ${products[i].count});`;
        }
      }
      console.log(statement2);
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

// show all orders
router.get("/", (request, response) => {
  const statement = "select * from orders";
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// show all owner-orders with user join
router.get("/owner-orders-with-user", (request, response) => {
  const statement =
    `select 
   O.oid, O.time, O.totalPrice, O.status, O.dpid,
   U.uid, U.name,  U.email, U.gender, U.address, U.city, U.type
   from
   orders O INNER JOIN 
   user U
   where
   O.uid = U.uid
   `;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// show all customer-orders with user join
router.get("/customer-orders", (request, response) => {
  const uid = request.query.uid;
  const statement = `select O.oid, O.time, O.totalPrice, O.status, O.dpid, U.uid, U.name,  U.email, U.gender, U.address,  U.city, U.type from orders O INNER JOIN user U where O.uid = U.uid && O.uid = ${uid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// show all delivery-person-orders with user join
router.get("/delivery-person-orders", (request, response) => {
  const dpid = request.query.dpid;
  const statement = `select O.oid, O.time, O.totalPrice, O.status, O.dpid, U.uid, U.name,  U.email, U.gender, U.address,  U.city, U.type from orders O INNER JOIN user U where O.uid = U.uid && O.dpid = ${dpid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// show all owner-orders with user join
router.get("/order-details", (request, response) => {
  const oid = request.query.oid;
  const statement = `select O.oid, O.time, O.totalPrice, O.status, U.uid, U.name,  U.email, U.gender, U.address,  U.city, U.type from orders O INNER JOIN user U where O.uid = U.uid and O.oid="${oid}"`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    if (data[0]) {
      const statement1 = `select P.pid, P.name, P.category, P.price, PO.count from orders O INNER JOIN product P INNER JOIN  productsinorders PO  where PO.oid = O.oid and PO.pid = P.pid and O.oid = "${oid}"`;
      connection.query(statement1, (error1, data1) => {
        data[0].products = data1;
        connection.end();
        response.send(data[0]);
      });
    }
  });
});

// assign-delivery-person update
router.get("/assign-delivery-person", (request, response) => {
  const oid = request.query.oid;
  const dpid = request.query.dpid;
  const statement = `update orders set dpid=${dpid} where oid=${oid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
  });
});

// update order passed status
router.get("/update-status", (request, response) => {
  const oid = request.query.oid;
  const status = request.query.status;
  const statement = `update orders set status="${status}" where oid=${oid}`;
  const connection = db.connect();
  connection.query(statement, (error, data) => {
    connection.end();
    response.send(data);
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


// // get user specific orders
// router.get("/userOrder", (request, response) => {
//   const uid = request.query.uid;
//   const statement = `select * from orders where uid=${uid}`;
//   const connection = db.connect();
//   connection.query(statement, (error, data) => {
//     connection.end();
//     response.send(data);
//   });
// });

// // get single order details with product list
// router.get("/details", (request, response) => {
//   const oid = request.query.oid;
//   const statement1 = `select * from orders where oid=${oid}`;
//   const connection = db.connect();
//   connection.query(statement1, (error, data) => {
//     if (!error && data && data.length) {
//       const order = data[0];
//       const statement2 = `select P.pid, P.name, P.category, P.price, OP.count from Product P INNER JOIN productsinorders OP on OP.pid = P.pid where OP.oid = ${oid}`;
//       connection.query(statement2, (error, data) => {
//         if (!error) {
//           connection.end();
//           order.products = data;
//           response.send(order);
//         } else {
//           connection.end();
//           response.send(data);
//         }
//       });
//     } else {
//       connection.end();
//       response.send(data);
//     }
//   });
// });

module.exports = router;
