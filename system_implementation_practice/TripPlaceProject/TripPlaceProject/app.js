import express from 'express';
import path from 'path';
import { logger } from './middleware/logger.js';
import listRouter from './routes/list.js';
import detailRouter from './routes/detail.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.use(logger);

app.use('/', listRouter);

// TODO: 상세보기 라우터(detailRouter)를 '/place' 경로로 연결할 것
// 현재 상태: listRouter만 연결되어 있어 상세보기 페이지가 동작하지 않음
// 힌트: 바로 위의 app.use('/', listRouter); 줄과 형태가 비슷함


app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});
