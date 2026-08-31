import express from 'express';
import { getById } from '../db/place.js';

const router = express.Router();

// 사용 예: /place/3  ->  id가 3인 여행지의 상세 정보를 보여주는 라우터
// TODO: 아래 라우터를 완성할 것
// 1) 경로 파라미터로 넘어온 id 값을 꺼낼 것
// 2) getById 함수를 이용해 해당 id의 데이터를 조회할 것
// 3) 조회한 데이터를 place 라는 이름으로 detail.ejs 에 전달할 것
// 힌트: 경로 파라미터는 req.params 에서 꺼낼 수 있음. list.js 라우터의 전체적인 구조를 참고할 것
router.get('/:id', async (req, res) => {
  // 이 부분을 완성할 것

});

export default router;
