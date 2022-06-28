const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select fid, name, address, email, city, gender, feedback from feedback;`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})

router.post('/', (request, response) => {
    const name = request.body.name;
    const address = request.body.address;
    const email = request.body.email;
    const city = request.body.city;
    const gender = request.body.gender;
    const feedback = request.body.feedback;
    const connection = db.connect()
    const statement = `insert into feedback(name, address, email, city, gender, feedback) values ("${name}", "${address}", "${email}", "${city}", "${gender}", "${feedback}");`;
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(data)
    })
})

module.exports = router
