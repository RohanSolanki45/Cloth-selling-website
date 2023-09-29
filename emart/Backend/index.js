const express = require('express')
const app = express()
const dataBase = require('./db')
const cors = require('cors')
const bodyParser = require("body-parser");
const port = 5000
dataBase()

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use(cors())
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json())
app.use('/product',require('./router/product'))
app.use('/user',require('./router/user'))

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})