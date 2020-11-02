const express = require('express');
const app = express();
const http = require('http');

const port = process.env.PORT || 3000;

//Server Setup
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`App started on port: ${port}`);
})

//Middlewares
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})