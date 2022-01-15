const express = require('express')
const db = require('../db')

const router = express.Router()

// send all products 
router.get('/',(request,response) => { 
    const statement = "select * from product";
    const connection = db.connect();
    connection.query(statement,(error,data)=>{ 
        connection.end();
        response.send(data);
    })
})

// add product
router.post('/create',(request,response) => {
    const name = request.body.name
    const category = request.body.category
    const price = request.body.price
    const statement = `insert into product (name, category, price) values ("${name}", "${category}", ${price});`
    const connection = db.connect();
    connection.query(statement,(error,data) => {
        connection.end();
        response.send(data);
    })   
})

// add multiple products
router.post('/createMultiple',(request,response) => {
    let statement = "insert into product (name, category, price) values "
    for (let i = 0, l = request.body.length; i < l; i++) {
        const product = request.body[i];
        const name = product.name
        const category = product.category
        const price = product.price
        if (i < l-1) {
            statement+= `("${name}", "${category}", ${price}),`        
        } else {
            statement+= `("${name}", "${category}", ${price});`                    
        }
    }
    const connection = db.connect();
    connection.query(statement,(error,data) => {
        connection.end();
        response.send(data);
    })   
})

module.exports = router