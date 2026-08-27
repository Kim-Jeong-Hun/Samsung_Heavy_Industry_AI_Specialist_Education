import express from "express";
import { logger } from './middleware/logger.js';
import userRouter from "./routes/user.js";

const app = express();
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// /user로 시작하는 요청은 userRouter에게 위임
app.use('/user', userRouter);

// 루트 주소
app.get("/", (req, res) => {
    res.status(200).type("html").send("<h1>Hello, Express!</h1>");
});

// 
app.get("/list", (req, res) => {
    res.send([1, 2, 3]);
});


app.listen(3000, () => {
    console.log("http://localhost:3000 실행 중");
});
