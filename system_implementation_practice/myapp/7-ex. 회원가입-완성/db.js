import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'svc.sel3.cloudtype.app',
  port: 31776,
  user: 'root',
  password: '1234',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;

const check_duplication = async (email) => {
  pool.execute();
}