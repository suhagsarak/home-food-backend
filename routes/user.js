const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select pid, name, email, gender, address, city, password from user;`
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
    const password = request.body.password;
    const connection = db.connect()
    const statement = `insert into user (name, email, gender, address, city, password) values ("${name}", "${email}", "${gender}", "${address}", "${city}", "${password}");`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})

router.post('/isValid', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    const connection = db.connect()
    const statement = `select pid, name, email, gender, address, city, password from user where email="${email}" and password="${password}";`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})


module.exports = router
