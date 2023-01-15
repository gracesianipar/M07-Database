import express from 'express'
import mysql2 from 'mysql2';

const app = express()
const hostname = '127.0.0.1'
const port = 3000
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store_db'
})

conn.connect(err => {
    if (err) {
        console.error('database is disconnected!');
        console.error(err);
    } else {
        console.log('database is connected');
    }
})

app.get('/api/customers', (req, res) => {
    let sql = "SELECT * FROM `customers`"
    let query = conn.query(sql, (err, results) => {
        res.json(results)
    })
})

app.get('/api/customer/:nama', (req, res) => {
    let sql = "SELECT * FROM `customers` WHERE cust_name='" + req.params.nama + "'"
    let query = conn.query(sql, (err, results) => {
        if (results.length === 0) {
            res.statusCode = 404
            res.end('Name Not Found')
        } else {
            res.json(results)
        }
    })
})

app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM `product`"
    let query = conn.query(sql, (err, results) => {
        res.json({
            "status": res.statusCode,
            "error": err,
            "response": results
        })
    })
})

app.get('/api/product/:id', (req, res) => {
    let sql = "SELECT * FROM `product` WHERE product_id='" + req.params.id + "'"
    let query = conn.query(sql, (err, results) => {
        res.json({
            "status": res.statusCode,
            "error": err,
            "response": results
        })
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})