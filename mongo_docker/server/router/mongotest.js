
const router = require('express').Router();
const mongo = require('../module/mongo');

router.get('/log', async (req, res) => {
    
    const result = await mongo.getLog();

    res.send(result);
})

router.post('/log', async (req, res) => {
    const receive = {
        string: req.body.string,
        number: req.body.number
    }

    const result = await mongo.writeLog(receive.string, receive.number);

    res.send(result);
});

module.exports = router