const express = require('express')
const connectDB = require('./config/db')
const app = express()

//Connect to DB
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))

const PORT = 5000

// Define Routes
app.use('/', require('./routes/core'))
app.use('/exercises', require('./routes/exercises'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
