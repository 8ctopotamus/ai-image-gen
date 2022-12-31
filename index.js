require('dotenv').config()
const express = require('express')

const PORT = 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/openai', require('./routes/openai'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))