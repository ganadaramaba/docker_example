
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const mongo = require('./router/mongotest.js');
app.use('/mongo', mongo);

app.listen(port, (req, res) => {
    console.log("mongo test server start");
});
