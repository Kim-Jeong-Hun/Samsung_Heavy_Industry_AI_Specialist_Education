import express from "express";
const router = express.Router();
// GET /user/
router.get("/", (req, res) => {
    res.send("사용자 목록을 보여줍니다.");
});
// GET /user/profile
router.get("/profile", (req, res) => {
    req.query.page = 
    res.send("사용자 프로필 페이지입니다.");
});

// POST /user/register
// POST이므로 쿼리스트링 사용 불가능
router.post("/register", (req, res) => {
    res.send("사용자 등록이 완료되었습니다.");
});

// GET /user/:name → 이름을 경로에서 받기
router.get('/:name', (req, res) => {
const userName = req.params.name;
res.send(`${userName}님, 반갑습니다!`);
});


export default router;
