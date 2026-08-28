// 1) 한 페이지에 10명씩 보여주기 + 페이지네이션 UI 사용하기
// 2) 사람 이름으로 검색하기

import mysql from "mysql2/promise";

// DB 커넥션 풀 생성
const pool = mysql.createPool({
  host: "svc.sel3.cloudtype.app",
  user: "root",
  password: "1234",
  database: "ggoreb",
  port: 31776,
  waitForConnections: true,
  connectionLimit: 10,
});

export const getCount = async (hg_nm = "", poly_nm = "", orig_nm = "") => {
  const { where, params } = buildWhere(hg_nm, poly_nm, orig_nm);
  try {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS cnt FROM assembly_member ${where}`,
      params,
    );
    return rows[0].cnt;
  } catch (e) {
    console.error("카운트 조회 실패:", e.message);
    return 0;
  }
};

const buildWhere = (hg_nm, poly_nm, orig_nm) => {
  const conds = [];
  const params = [];
  if (hg_nm) {
    conds.push("hg_nm LIKE ?");
    params.push(`%${hg_nm}%`);
  }
  if (poly_nm) {
    conds.push("poly_nm LIKE ?");
    params.push(`%${poly_nm}%`);
  }
  if (orig_nm) {
    conds.push("orig_nm LIKE ?");
    params.push(`%${orig_nm}%`);
  }
  return {
    where: conds.length ? `WHERE ${conds.join(" OR ")}` : "",
    params,
  };
};

// getListAll() 데이터 조회, 모델
export const getListAll = async (
  start,
  hg_nm = "",
  poly_nm = "",
  orig_nm = "",
) => {
  const { where, params } = buildWhere(hg_nm, poly_nm, orig_nm);
  try {
    const [rows] = await pool.query(
      `SELECT * FROM assembly_member
       ${where}
       ORDER BY sch_unit_cd ASC
       LIMIT ?, 10`,
      [...params, Number(start)],
    );
    return rows;
  } catch (e) {
    console.error("조회 실패:", e.message);
    return []; // 에러 발생 시 빈 배열을 반환하여 프로그램이 멈추는 것을 방지
  }
};
