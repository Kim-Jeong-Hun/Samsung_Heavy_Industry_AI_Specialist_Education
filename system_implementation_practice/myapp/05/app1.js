// route 함수, 컨트롤러
import express from "express";
import path from "path";
import { getListAll } from "./db1.js";

const app = express();
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ?page=1    ?page=123
app.get("/", async (req, res) => {
    const page = req.query.page || 1;
    const hg_nm = req.query.hg_nm || "";
    const poly_nm = req.query.poly_nm || "";
    const orig_nm = req.query.orig_nm || "";

    // 시작번호 끝번호 계산 후 데이터 가져오기
    const start = page * 10 - 10;
    const list = await getListAll(start, hg_nm, poly_nm, orig_nm);
    console.log(list);

    // 페이지네이션 계산, 시작 페이지, 끝 페이지 값을 구하기
    let startPage = parseInt((page - 1) / 10) * 10 + 1;
    let endPage = startPage + 9;

    res.render("assembly_member", {
        list: list,
        startPage: startPage,
        endPage: endPage,
        hg_nm: hg_nm,
        poly_nm: poly_nm,
        orig_nm: orig_nm
    });
});

app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000");
});
