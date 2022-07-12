
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.listen(port, (req, res) => {
    console.log("postgres test server start");
});
