
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
// expres.json은 함수가 아니라는 에러가 떴음
// express를 다시 설치해보니 정상적으로 작동
// 모듈 파일에 손상이 있던 것으로 추정

const mongo = require('./router/mongotest.js');
app.use('/mongo', mongo);

app.listen(port, (req, res) => {
    console.log("mongo test server start");
});
