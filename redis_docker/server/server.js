
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

const redis = require('./router/redis');
app.use('/redis', redis);

app.listen(port, () => {
    console.log("redis test server start");
});
