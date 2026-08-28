import mysql from "mysql2/promise";

// DB 커넥션 풀 생성
const pool = mysql.createPool({
    host: 'svc.sel3.cloudtype.app',
    user: 'root', password: '1234',
    database: 'ggoreb', port: 31776,
    waitForConnections: true,
    connectionLimit: 10
})

// getListAll() 데이터 조회, 모델
export const getListAll = async () => {
  try {
    const [rows] = await pool.query(
        `SELECT *
        FROM assembly_member
        ORDER BY row_num ASC
        LIMIT 50`);
    return rows;
  } catch (e) {
    console.error('조회 실패:', e.message);
  }
};
