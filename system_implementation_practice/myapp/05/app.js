// route 함수, 컨트롤러
import express from "express";
import path from "path";
import { getListAll } from "./db.js";

const app = express();
const __dirname = import.meta.dirname;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", async (req, res) => {
    const list = await getListAll();
    res.render("assembly_member", { list: list });
});

app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000");
});
