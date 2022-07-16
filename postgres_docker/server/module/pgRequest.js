
const pgClient = require('pg').Client;
const pgConfig = require('../private/pgConfig');

const request = async (sql, values=[]) => {
    
    const pg = new pgClient(pgConfig);

    await pg.connect();
    const result = await pg.query(sql, values);
    // await pg.query에서 await을 안붙여서 broken pipe 에러 떴음.
    // pg.query가 끝나기 전에 pg.end()가 호출되어서 연결이 끊어진 것.

    await pg.end();
    return result;
}

module.exports = request;

// pgConfig.js
// postgres 유저 생성과 권한, 스키마와 테이블 생성 등 설정하는 방법 알아보기.