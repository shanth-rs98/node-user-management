const express = require('express')

require('dotenv').config()
const app = express()
const port = 5000
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json())
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})