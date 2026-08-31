// 틀을 잡고 특정 부분만 바꾸는 것
// ex) 다이어리, 달력, ...
// => template, Placeholder
// 준비해놓았다 => prepared 

import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host: "svc.sel3.cloudtype.app",
    port: 31776,
    user: "root",
    password: "1234",
    database: "myapp",
    waitForConnections: true,
    connectionLimit: 10,
});

const insertUser = async () => {
    const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
    try {
        const [result] = await pool.execute(sql, ["hi", 25]);
        console.log("사용자 삽입 완료:", result);
        return result;
    } catch (e) {
        console.error("삽입 실패:", e.message);
    } finally {
        await pool.end();
        console.log("풀 종료");
    }
};

const updateUser = async () => {
    const sql = "UPDATE users SET name = ? where id = ?";
    try {
        const [result] = await pool.execute(sql, ["변경할이름", 1]);
        console.log("사용자 삽입 완료:", result);
        return result;
    } catch (e) {
        console.error("삽입 실패:", e.message);
    } finally {
        await pool.end();
        console.log("풀 종료");
    }
};

const getUsers = async () => {
    try {
        const [rows] = await pool.execute("SELECT * FROM users");
        console.log(rows);
        return result;
    } catch (e) {
        console.error("조회 실패:", e.message);
    } finally {
        await pool.end();
        console.log("풀 종료");
    }
};

export default db;