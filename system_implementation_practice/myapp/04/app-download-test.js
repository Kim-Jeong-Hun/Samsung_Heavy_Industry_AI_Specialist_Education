import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { getUsers } from './test-db';

const app = express();
const __dirname = path.resolve();

const filePath = path.join(__dirname)
















const stream = fs.createReadStream(filePath);
stream.pipe(res);

app.get('/users', (req, res) => {
    const users = getUsers();
    res.send(users);
});

app.listen(3000, () => {
    console.log('http://localhost:3000/view -> 브라우저에서 보기');
    console.log('http://localhost:3000/download -> 브라우저에서 보기');
    console.log('http://localhost:3000/view -> 브라우저에서 보기');
})