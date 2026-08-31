import express from 'express';
import path from 'path';
import memberRouter from './routes/member.js';

const __dirname = import.meta.dirname;
const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/member', memberRouter);

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000/member/form');
});


