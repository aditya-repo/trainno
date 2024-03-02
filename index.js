const express = require('express');
const confirmtkt = require('./controller/confirmtkt');
const authenticate = require('./middleware');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/pnr-query', authenticate, confirmtkt)

app.listen(4500, ()=>{
    console.log(`The server is running on port 4500`);
})