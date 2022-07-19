
const router = require('express').Router();
const redis = require('../module/redisModule');

router.get('/string/:key', async (req, res) => {
    const receive = {
        key: req.params.key
    }
    const result = {
        success: false,
        value: null
    }

    try {
        result.value = await redis.stringRead(receive.key);
        result.success = true;
    }
    catch(err) {
        console.log("err:", err);
        result.value = err;
    }

    res.send(result);
});

router.post('/string', async (req, res) => {
    const receive = {
        key: req.body.key,
        value: req.body.value
    }
    const result = {
        success: false,
        value: null
    }

    try {
        result.value = await redis.stringWrite(receive.key, receive.value);
        result.success = true;
    }
    catch(err) {
        console.log("err:", err);
        result.value = err;
    }

    res.send(result);
});

router.get('/any/:type/:key', async (req, res) => {
    const receive = {
        type: req.params.type,
        key: req.params.key
    }
    const result = {
        success: false,
        value: null
    }

    try {
        result.value = redis.readData(receive.type, receive.key);
    }
    catch(err) {
        console.log("err:", err);
        result.value = err;
    }

    res.send(result);
});

router.post('/any', async (req, res) => {
    const receive = {
        type: req.body.type,
        key: req.body.key,
        value: req.body.value
    }
    const result = {
        success: false,
        value: null
    }

    try {
        result.value = redis.writeData(receive.type, receive.key, receive.value);
    }
    catch(err) {
        console.log("err:", err);
        result.value = err;
    }

    res.send(result);

});

module.exports = router;
