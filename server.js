const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db');
dotenv.config();
connectDB();

const app = express()


app.get('/', (req,res) => {
    res.json('api running')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server running on port ${PORT} ...`)
})