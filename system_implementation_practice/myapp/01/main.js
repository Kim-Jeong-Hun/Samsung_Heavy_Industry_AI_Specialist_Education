import http from "node:http";
import getGreeting from './greet.js';

const server = http.createServer((req, res) => {
    const name = "뭐하지";
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf8" });
    res.end(getGreeting(name));
});
server.listen(3000, () => {
    console.log("http://localhost:3000 에서 인사 메시지를 확인하세요");
});
