const express = require('express');
const db = require('../db');

const router = express.Router();

// send all products 
router.get('/', (request, response) => {
    const statement = "select * from product";
    const connection = db.connect();
    connection.query(statement, (error, data) => {
        connection.end();
        response.send(data);
    })
})

// send products categorywise
router.get('/categorywise', (request, response) => {
    const category = request.query.category;
    const statement = `select * from product where category="${category}"`;
    const connection = db.connect();
    connection.query(statement, (error, data) => {
        console.log(data);
        connection.end();
        response.send(data);
    })
})

// delete product
router.get('/delete', (request, response) => {

    const pid = request.query.pid

    // const statement = "delete from product where pid=" + pid;

    const statement = `delete from product where pid=${pid}`


    const connection = db.connect();
    connection.query(statement, (error, data) => {
        connection.end();
        response.send(data);
    })
})

// add product
router.post('/create', (request, response) => {
    const name = request.body.name
    const category = request.body.category
    const price = request.body.price
    const statement = `insert into product (name, category, price) values ("${name}", "${category}", ${price});`
    const connection = db.connect();
    connection.query(statement, (error, data) => {
        connection.end();
        response.send(data);
    })
})

// add multiple products
router.post('/createMultiple', (request, response) => {
    let statement = "insert into product (name, category, price) values "
    const products = request.body.products
    for (let i = 0, l = products.length; i < l; i++) {
        const product = products[i];
        const name = product.name
        const category = product.category
        const price = product.price
        if (i < l - 1) {
            statement += `("${name}", "${category}", ${price}),`
        } else {
            statement += `("${name}", "${category}", ${price});`
        }
    }
    const connection = db.connect();
    connection.query(statement, (error, data) => {
        connection.end();
        response.send(data);
    })
})

module.exports = router
