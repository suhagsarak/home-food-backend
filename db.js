const mysql = require('mysql2')

function connect() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'homefood',
        password: 'homefood',
        database: 'homefood',
        port: 3306
    })

    connection.connect()
    return connection
}

module.exports = {
    connect: connect
}

