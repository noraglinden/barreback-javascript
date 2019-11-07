const express = require('express')
const app = express()

const PORT = 5000

app.get('/', function (req, res) {
  res.send('hello barreback')
})

app.listen(PORT)