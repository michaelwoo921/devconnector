const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db');
dotenv.config();
connectDB();

const app = express()


app.use(express.json({
    extended: false
}))

app.get('/api/test', (req,res) => {
    res.json('api running')
})

// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server running on port ${PORT} ...`)
})