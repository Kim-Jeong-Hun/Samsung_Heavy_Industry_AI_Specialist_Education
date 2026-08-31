import mysql from "mysql2/promise";

// svc.sel3.cloudtype.app:31776
const pool = mysql.createPool({
    host: "svc.sel3.cloudtype.app",
    user: "root",
    password: "1234",
    database: "tripplace",
    port: 31776,
    waitForConnections: true,
    connectionLimit: 10,
});

// 1. 목록 + 검색 조회
// TODO: region(지역), category(카테고리) 조건도 함께 검색되어야 함
// 현재 상태: name(이름) 조건만 적용되어 있음
// 힌트: WHERE 절에 조건을 추가할 때, 값이 비어있는 경우(전체 조회)도 함께 고려할 것 (예: '%' 사용)
export const getListAll = async (start, keyword, region, category) => {
    try {
        const [rows] = await pool.query(
            `SELECT * 
      FROM place
      WHERE name LIKE ? AND region LIKE ? AND category LIKE ?
        ORDER BY id`,
        //LIMIT ?, 10`,
            [
                `%${keyword}%`,
                `%${region}%`,
                `%${category}%`
            ],
        );
        return rows;
    } catch (e) {
        console.error("목록 조회 실패:", e.message);
        throw e;
    }
};

// 상세 조회
// TODO: id 하나에 해당하는 place 데이터를 조회하는 쿼리를 작성할 것
// 힌트: getListAll 함수의 쿼리 작성 방식을 참고. where 조건만 다르면 됨
export const getById = async (id) => {
    try {
        // 이 부분을 완성할 것
    } catch (e) {
        console.error("상세 조회 실패:", e.message);
    }
};
