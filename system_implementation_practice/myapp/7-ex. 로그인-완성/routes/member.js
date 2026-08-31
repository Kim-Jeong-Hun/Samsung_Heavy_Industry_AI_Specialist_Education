import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { name, email } = req.body;

  try {
    const sql = 'SELECT * FROM member WHERE name = ? AND email = ?';
    const [rows] = await pool.query(sql, [name, email]);

    if (rows.length === 1) {
      req.session.user = { id: rows[0].id, name: rows[0].name };
      res.redirect('/member/welcome');
    } else {
      res.send('<h2>로그인 실패</h2><a href="/member/signin">다시 시도</a>');
    }
  } catch (e) {
    console.log(e);
    console.error('로그인 오류:', e.message);
    res.status(500).send('서버 오류');
  }
});

router.get('/welcome', (req, res) => {
  const user = req.session && req.session.user;
  if (!user) return res.redirect('/member/signin');
  res.send(`<h2>${user.name}님 환영합니다!</h2><a href="/member/logout">로그아웃</a>`);
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/member/signin');
  });
});

export default router;
