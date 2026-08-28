import mysql from "mysql2/promise";

// DAO(Data Access Object)

const pool = mysql.createPool({
    host: "svc.sel3.cloudtype.app",
    user: "root",
    password: "1234",
    database: "ggoreb",
    port: 31776,
    waitForConnections: true,
    connetcionLimit: 10,
});

const getUsers = async () => {
    try {
        const [rows] = await pool.execute("SELECT * FROM users");
        console.log(rows);
    } catch (e) {
        console.error("조회 실패:", e.message);
    } finally {
        await pool.end();
        console.log("풀 종료");
    }
};

const getProducts = async () => {};

const getOrders = async () => {};
