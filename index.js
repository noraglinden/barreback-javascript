const express = require('express')
const connectDB = require('./config/db')
const app = express()

//Connect to DB
connectDB()

const PORT = 5000

// Define Routes
app.use('/', require('./routes/core'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
