export const logger = (req, res, next) => {
  const now = new Date().toLocaleString();
  console.log(`[${now}] ${req.method}`);
  console.log(`요청 URL: ${req.url}`);
  // TODO: 요청 URL과 쿼리 파라미터, IP 정보도 함께 출력
  // 힌트: console.log에 출력할 내용을 하나 더 추가하면 됨
  console.log(`쿼리 파라미터: ${req.query}`);
  console.log(`IP 정보: ${req.ip}`);

  next();
};
