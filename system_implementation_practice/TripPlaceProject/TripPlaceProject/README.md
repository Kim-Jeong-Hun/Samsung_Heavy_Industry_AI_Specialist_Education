# TripPlaceProject

국내 여행지 추천 웹 애플리케이션 실습 프로젝트

## 실행 준비

1. `tripplace_schema.sql` 파일을 MySQL/MariaDB에서 실행하여 `tripplace` 데이터베이스와 `place` 테이블, 초기 데이터(38건)를 생성
2. `db/place.js` 상단의 접속 정보(host, user, password, port)를 자신의 DB 환경에 맞게 수정
3. 아래 명령으로 패키지 설치 및 실행

```
npm install
node app.js
```

4. 브라우저에서 `http://localhost:3000` 접속

## 완성해야 할 항목

| 위치 | 태그 | 내용 |
|---|---|---|
| `db/place.js` - `getListAll` | [필수] | 지역, 카테고리 조건도 함께 검색되도록 쿼리 수정 |
| `db/place.js` - `getById` | [필수] | id 하나에 해당하는 데이터를 조회하는 쿼리 작성 |
| `routes/list.js` | 버그 | 페이지네이션 시작 위치 계산이 잘못되어 있음 |
| `routes/detail.js` | [필수] | 상세보기 라우터 전체 작성 |
| `app.js` | [필수] | 상세보기 라우터 연결 누락 |
| `views/list.ejs` | 버그 | 카드에 여행지 이름이 표시되지 않음 (변수명 불일치) |
| `views/detail.ejs` | [필수] | 상세보기 화면 완성 |
| `public/js/favorite.js` | 버그 | 즐겨찾기가 브라우저를 닫으면 사라짐 |
| `middleware/logger.js` | [도전] | 쿼리 파라미터까지 로그로 출력 |

## 폴더 구조

```
TripPlaceProject/
├── app.js
├── routes/
│   ├── list.js
│   └── detail.js
├── middleware/
│   └── logger.js
├── db/
│   └── place.js
├── public/
│   ├── css/style.css
│   ├── js/favorite.js
│   └── images/ (카테고리별 일러스트)
└── views/
    ├── list.ejs
    └── detail.ejs
```
