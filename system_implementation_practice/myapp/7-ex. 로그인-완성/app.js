import express from 'express';
import path from 'path';
import memberRouter from './routes/member.js';
import session from 'express-session';

const __dirname = import.meta.dirname;
const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 10 } // 10분
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/member', memberRouter);

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000/member/signin');
});
