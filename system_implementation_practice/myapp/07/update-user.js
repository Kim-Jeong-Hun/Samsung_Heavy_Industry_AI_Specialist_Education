import { updateUser } from './db-users.js';

// Controller
async function run() {
    const result = await updateUser();
    console.log(result);
}

run();

// View에게 위임
// 마무리 작업