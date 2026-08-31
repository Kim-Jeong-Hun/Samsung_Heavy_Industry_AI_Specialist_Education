// app.js

import { insertUser } from './db-users.js';

// route 함수
// 1) 비동기 함수의 결과 받기 1
async function run() {
    const result = await insertUser();
    console.log(result);
}

run();
//-------------------------------------------------------

// 2) 비동기 함수의 결과 받기 2
// insertUser().then((result) => {
//     console.log(result);
// });

// .then() 보다는 await 권장
// insertUser.then(() => {...})
// Promise 객체를 .then()으로 다루는 건 너무 옛날 방법임...
// router.get('/signin', async (req, res) => {
//     const result = await insertUser();
//     console.log(result);
// });