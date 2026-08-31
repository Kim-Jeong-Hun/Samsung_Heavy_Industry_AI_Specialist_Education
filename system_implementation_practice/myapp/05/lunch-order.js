// import
import express from "express";
import path from "path";

// app
const app = express();

// app 환경 설정
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));

// app 미들웨어 사용
app.use(express.urlencoded());

// 코드 작성 1) GET /lunch/form 라우트 작성하기
app.get('/lunch/form', (req, res) => {
    res.render('lunch-form');
})


// lunch-form.ejs 렌더링
app.post("/lunch/result", (req, res) => {
    const { username, lunchbox, sides } = req.body;

    // 체크박스 처리
    // 어떤 형태로 들어오든 항상 배열 형태로 생성하는 코드
    const sidesList = Array.isArray(sides) ? sides : [sides].filter(Boolean);
    // 코드 작성 2) lunch-result.ejs 렌더링하기
    // username, lunchbox, sidesList를 전달
    res.render('lunch-result', {username, lunchbox, sidesList});
});
app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000/lunch/form");
});
