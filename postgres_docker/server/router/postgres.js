
const pg = require('../module/pgRequest');
const router = require('express').Router();
const userTable = "docker_schema.user";
const phoneTable = "docker_schema.phone";

router.get('/phone/:account_name', async (req, res) => {
    const account_name = req.params.account_name;
    console.log("params:", account_name);
    const sql = "SELECT phone FROM " + userTable + " as u JOIN " + phoneTable + " as p ON (u.id = p.id AND u.account_name = $1);";
    const values = [account_name];

    let result;
    try {
        const temp = await pg(sql, values);
        result = temp.rows;
    }
    catch(err) {
        result = err;
    }

    res.send(result);
});

router.post('/user', async (req, res) => {
    const account_name = req.body.account_name;
    const sql = "INSERT INTO " + userTable + " (account_name) VALUES ($1);";
    const values = [account_name];

    let result;
    try {
        result = await pg(sql, values);
    }
    catch(err) {
        result = err;
    }

    res.send(result);
});
// const sql = "INSERT INTO " + userTable + " (account_name) VALUES ($1) ON CONFLICT account_name DO NOTHING;";

router.post('/phone', async (req, res) => {
    const receive = {
        account_name: req.body.account_name,
        phone: req.body.phone
    }

    let result;

    try {
        const sql4id = "SELECT id FROM " + userTable + " WHERE account_name = $1;"
        const values4id = [receive.account_name];

        const temp = await pg(sql4id, values4id);
        console.log("id rows.length:", temp.rows.length);
        console.log("id rows[0].id:", temp.rows[0].id);
        console.log("id type:", typeof(temp.rows[0].id));
        if (temp.rows.length > 0) {
            const sql = "INSERT INTO " + phoneTable + " (id, phone) VALUES ($1, $2);";
            const values = [temp.rows[0].id, receive.phone];

            result = await pg(sql, values);
        }
        else {
            result = "no user";
        }
    }
    catch(err) {
        result = err;
    }

    res.send(result);
});

module.exports = router;



// router.post('/user', async (req, res) => {
//     const account_name = req.body.account_name;
//     const sql = "INSERT INTO $1 (account_name) VALUES ($2);";
//     const values = [userTable, account_name];

//     let result;
//     try {
//         result = await pg(sql, values);
//     }
//     catch(err) {
//         result = err;
//     }

//     res.send(result);
// });
// 테이블 이름을 변수로 넣어봤으나 에러 발생