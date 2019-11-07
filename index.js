const express = require('express')
const app = express()

const PORT = 5000

// Define Routes
app.use('/', require('./routes/core'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
