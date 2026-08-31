import mysql from "mysql2/promise";
const leakTest = async () => {
    const connections = [];

    // 200번 접속 시도하는 로직
    for (let i = 0; i < 200; i++) {
        try {
            const conn = await mysql.createConnection({
                host: "svc.sel3.cloudtype.app",
                port: 31776,
                user: "root",
                password: "1234",
                database: "myapp",
            });
            connections.push(conn); // 종료하지 않고 배열에 저장만
            console.log(`연결 ${i + 1}번 성공`);
        } catch (e) {
            console.error(`연결 ${i + 1}번 실패:`, e.message);

            break;
        }
    }
};

// 실행
leakTest();
