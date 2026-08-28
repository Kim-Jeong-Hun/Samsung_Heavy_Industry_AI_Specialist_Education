import express from "express";
import path from "path";

const app = express();
const __dirname = import.meta.dirname;
// 애플리케이션의 설정(Configuration) 값을 저장하는 함수
// 개발자가 직접 만든 커스텀 변수를 저장할 수도 있고,
// Express가 자체적으로 제공하는 예약된 설정 이름을 사용해
// 서버의 특정 동작(예: 템플릿 엔진 지정)을 바꿀 수도 있음.
app.set("view engine", "ejs");

// 현재 내 파일 "app-ejs.js"의 위치
// D:/Dev/repositories/Samsung_Heavy_Industry_AI_Specialist_Education/system_implementation_practice/myapp/05
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index", { name: "nodejs" });
});

// welcome 경로의 쿼리 스트링 들어오면 렌더링
// request 객체의 query 객체의 name을 name으로 지정하고
// welcome이라는 파일을 렌더링하는데, 
app.get("/welcome", (req, res) => {
    const name = req.query.name;
    res.render("welcome", { 
        name: name,
        list: [1, 2, 3]
    });
});

app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000");
});
