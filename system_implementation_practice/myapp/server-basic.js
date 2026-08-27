const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    fs.readFile("app.html", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
            res.end("서버 에러 발생!");
        } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data); // 읽어온 파일 데이터를 그대로 전송
        }
    });
});
server.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000");
});
