// 1) 한 페이지에 10명씩 보여주기 + 페이지네이션 UI 사용하기
// 2) 사람 이름으로 검색하기

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
export const getListAll = async (start, hg_nm="", poly_nm="", orig_nm="") => {
  try {
    const [rows] = await pool.query(
        `SELECT *
        FROM assembly_member
        WHERE hg_nm LIKE ? OR poly_nm LIKE ? OR orig_nm LIKE ?
        ORDER BY sch_unit_cd ASC
        LIMIT ?, 10`, 
        [`%${hg_nm}%`, `%${poly_nm}%`, `%${orig_nm}%`, Number(start)] // start 값을 확실하게 숫자 타입으로 변환
    );
    return rows;
  } catch (e) {
    console.error('조회 실패:', e.message);
    return []; // 에러 발생 시 빈 배열을 반환하여 프로그램이 멈추는 것을 방지
  }
};
