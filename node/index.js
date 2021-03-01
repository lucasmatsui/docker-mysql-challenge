const express = require('express')
const mysql = require("mysql")

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

connection.query("INSERT INTO people (name) VALUES ('Kenzo')")

let getUserList = function () {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM people', function (err, result, field) {
            if (err) {
                console.log("ERROR 3")
                reject(err)
            } else {
                resolve(result)
            }
        });
    });
};

app.get('/', async (req, res) => {
    let html = "<h1>Full Cycle Rocks!</h1>"
    let products = await getUserList()

    html += "<ul>"
    products.map(product => {
        html += `<li>${product.name}</li>`
    })
    html += "</ul>"

    res.send(html)
})

app.listen(port, () => {
    console.log("Rodando na porta " + port);
})