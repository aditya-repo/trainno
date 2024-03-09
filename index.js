const express = require('express');
const trainnoViaConfirmTkt = require('./controller/trainno');
const processData = require('./test');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', trainnoViaConfirmTkt)
// app.get('/', processData)

app.listen(4500, ()=>{
    console.log(`The server is running on port 4500`);
})