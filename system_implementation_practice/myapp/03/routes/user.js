import express from "express";
const router = express.Router();
// GET /user/
router.get("/", (req, res) => {
    res.send("사용자 목록을 보여줍니다.");
});
// GET /user/profile
router.get("/profile", (req, res) => {
    res.send("사용자 프로필 페이지입니다.");
});
// POST /user/register
router.post("/register", (req, res) => {
    res.send("사용자 등록이 완료되었습니다.");
});
export default router;
