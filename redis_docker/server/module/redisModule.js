
const config = require('../private/private').redisConfig;
const redis = require('redis').createClient(config);

const dataType = {
    STRING: "string",
    LIST: "list",
    HASH: "hash",
    SET: "set",
    SORTED_SET: "sorted_set"
};
Object.freeze(dataType); // 내부를 바꿀 수 없게 함.

// 입력 받을 수 있는 경우를 생각하고 입력 받을 양식을 짜고
// 그 양식을 인자로 받는 함수를 구현할 것.

// {"errno":-111,"code":"ECONNREFUSED","syscall":"connect","address":"172.18.0.3","port":6379}
// 연결 에러. 에러 원인 아직 못찾음.
// 아마 config 파일에 bind 설정에 ip를 추가하지 않아서 그런듯.
// 다른 오류가 생겼음.

// err: Error: getaddrinfo ENOTFOUND redis
// 인식할 수 없는 호스트가 설정되었을 때 발생함.
// config 파일에 bind redis를 추가하니까 됐음.
// 뭐지? 허가할 상대 ip가 아니었나?

const stringWrite = async (key, value) => {
    console.log("stringWrite");
    let result;

    await redis.connect();
    console.log("connect success");

    result = await redis.set(key, value);
    console.log("set success");

    await redis.quit();

    return result;
}

const stringRead = async (key) => {
    console.log("stringRead");
    let result;

    await redis.connect();

    if (await redis.exists(key)) {
        result = await redis.get(key);
    }
    else {
        result = new Error("no key");
    }

    await redis.quit();

    return result;
}

const typebytype = async (type, string, list, set, sorted, hash) => {
    let result;

    if (redis.exists(key)) {
        switch(type) {
            case dataType.STRING:
                result = await string();
                break;
            case dataType.LIST:
                result = await list();
                break;
            case dataType.SET:
                result = await set();
                break;
            case dataType.SORTED_SET:
                result = await sorted();
                break;
            case dataType.HASH:
                result = await hash();
                break;
            default:
                console.log("somthing wrong");
                throw "invalid type";
        }
    }
    else {
        throw "no key";
    }

    return result;
}

const writeData = async (type, key, value) => {
    let result;

    await redis.connect();

    result = await typebytype(type,
        async () => { // string
            result = await redis.set(key, value);
        },
        async () => { // list
            result = await redis.lPush(key, value);
        },
        async () => { // set
            result = await redis.sAdd(key, value);
        },
        async () => { // sorted
            result = await redis.zAdd(key, value);
        },
        async () => { // hash
            result = await redis.hSet(key, value);
        }
    );

    await redis.quit();

    return result;
}

const readData = async (type, key) => {
    let result;

    await redis.connect();

    result = await typebytype(type,
        async () => { // string
            result = await redis.get(key);
        },
        async () => { // list
            result = await redis.lRange(key, 0, -1);
        },
        async () => { // set
            result = await redis.sMembers(key);
        },
        async () => { // sorted
            result = await redis.zRange(key, 0, -1);
        },
        async () => { // hash
            result = await redis.hGetAll(key);
        }
    );

    await redis.quit();

    return result;
};

module.exports = {
    writeData,
    readData,
    stringWrite,
    stringRead
};
