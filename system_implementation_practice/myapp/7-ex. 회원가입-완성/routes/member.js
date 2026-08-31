import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/form", (req, res) => {
    res.render("form");
});

router.post("/form", async (req, res) => {
    const { name, email } = req.body;

    try {
        const sql = "INSERT INTO member (name, email) VALUES (?, ?)";
        const [result] = await pool.query(sql, [name, email]);
        res.render("result", { success: true, id: result.insertId });
    } catch (e) {
        console.error("회원 등록 실패:", e.message);
        res.render("result", { success: false });
    }
});

router.get("/check", async (req, res) => {
    // 2) 전달된 이메일 확인
    const email = req.query.email;
    console.log(email);
    // 3) DB에 저장여부 확인
    try {
        // sql문 지정 (프론트로부터 받은 이메일이 있으면 1(id) 리턴)
        const sql = "SELECT 1 FROM member WHERE email = ?";
        // result는 DB에 sql과 email을 전달해서 email을 넣은 sql문을 실행하고,
        // 그에 따른 결과가 들어감.
        // result의 값은 1이거나 0이거나
        const [result] = await pool.query(sql, [email]);
        // 결과 확인용 result 출력
        // result는 객체형태로 리턴됨.
        console.log(result);
        if (result.length >= 1) {
            res.send({
                msg: "사용불가\n이미 사용중인 이메일입니다.",
                code: 403,
            });
        } else {
            res.send({
                msg: "사용가능",
                code: 201,
            });
        }
    } catch (e) {
        console.log(e);
    }
});

export default router;
