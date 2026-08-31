import express from 'express';
import { getListAll } from '../db/place.js';

const router = express.Router();

// 사용 예: /?keyword=경복궁&region=서울&category=역사&page=1
router.get('/', async (req, res) => {
  const keyword = req.query.keyword || '';
  const region = req.query.region || '';
  const category = req.query.category || '';
  const page = req.query.page || 1;

  // 페이지 번호에 따라 시작 위치(start)가 올바르게 계산되지 않고 있음
  // 정상 동작: 1페이지 = 0번째부터, 2페이지 = 10번째부터, 3페이지 = 20번째부터 조회되어야 함
  const start = page * 10 - 10; // (page - 1) * 10

  const list = await getListAll(start, keyword, region, category);

  const startPage = parseInt((page - 1) / 10) * 10 + 1;
  const endPage = startPage + 9;

  res.render('list', {
    list, startPage, endPage,
    page: Number(page),
    keyword, region, category,
  });
});

export default router;
