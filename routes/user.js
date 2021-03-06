const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select uid, name, email, gender, address, city, type, password from user;`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})

router.get('/deliverypersons', (request, response) => {
    const connection = db.connect()
    const statement = `select dpid, name, email, gender, address, city, type, password from deliveryperson;`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})

router.post('/', (request, response) => {
    const name = request.body.name;
    const email = request.body.email;
    const gender = request.body.gender;
    const address = request.body.address;
    const city = request.body.city;
    const type = request.body.type;
    const password = request.body.password;
    const connection = db.connect()

    let statement;
    if (type == 'Delivery Person') {
        statement = `insert into deliveryperson(name, email, gender, address, city, type, password) values ("${name}", "${email}", "${gender}", "${address}", "${city}", "${type}", "${password}");`
    } else {
        statement = `insert into user (name, email, gender, address, city, type, password) values ("${name}", "${email}", "${gender}", "${address}", "${city}", "${type}", "${password}");`
    }

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})

router.post('/isValid', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    const type = request.body.type;
    const connection = db.connect()

    let statement;
    if (type == 'Delivery Person') {
        statement = `select dpid, name, email, gender, address, city, type, password from deliveryperson where email="${email}" and password="${password}" and type="${type}";`
    } else {
        statement = `select uid, name, email, gender, address, city, type, password from user where email="${email}" and password="${password}" and type="${type}";`
    }
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})


module.exports = router
