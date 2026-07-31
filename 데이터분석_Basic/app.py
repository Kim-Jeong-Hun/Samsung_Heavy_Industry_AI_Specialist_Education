# flask 모듈 임포트해서 Flask 객체 사용
from flask import Flask, jsonify, render_template
from pymysql.cursors import DictCursor
from flask import request, session
from flask_bcrypt import Bcrypt
import requests

from datetime import timedelta

# Flask 초기화 + 설정
app = Flask(__name__)
app.secret_key = '1234abcd'
app.permanent_session_lifetime = timedelta(minutes=30)


# 로그인
@app.route("/login")
def login():

    form = request.args
    user_id = form['user_id']
    user_pw = form['user_pw']

    session['user_id'] = user_id

    return f'{user_id} {user_pw}'

    import pymysql
    from pymysql.cursors import DictCursor

    conn = pymysql.connect(
        host='svc.sel3.cloudtype.app', user='root',
        password='1234',
        db='ggoreb', charset='utf8', port=31776
    )
    cursor = conn.cursor(DictCursor)
    sql = f'''
        SELECT
        FROM ggoreb
        WHERE 
    '''


# 요청 주소
# 회원가입
@app.route("/join", methods=['GET', 'POST'])
def join():
    if request.method == 'GET':
        return render_template('join.html')
    else :
        form = request.form
        user_id = form['user_id']
        user_pw = form['user_pw']
        user_name = form['user_name']

        import pymysql
        from pymysql.cursors import DictCursor
    
        conn = pymysql.connect(
            host='svc.sel3.cloudtype.app', user='root',
            password='1234',
            db='ggoreb', charset='utf8', port=31776
        )
        cursor = conn.cursor(DictCursor)
        sql = f'''
            INSERT INTO user (id, user_id, user_name, user_pw, 
            created_at) VALUES (null, %s, %s, %s, now())
        '''
        # 암호화
        bcrypt = Bcrypt(app)
        hashed_pw = bcrypt.generate_password_hash(user_pw).decode('utf-8')

        cursor.execute(sql, (user_id, user_name, hashed_pw))
        conn.commit()
    
        cursor.close()
        conn.close()

        return f'가입완료 {user_id} {user_name} {hashed_pw}'



@app.route('/customers')
def customers():
    import pymysql
    from pymysql.cursors import DictCursor

    conn = pymysql.connect(
        host='svc.sel3.cloudtype.app', user='root',
        password='1234',
        db='BLEAX', charset='utf8', port=31776
    )
    cursor = conn.cursor(DictCursor)
    sql = '''
        select * from 고객
    '''
    cursor.execute(sql)
    result = cursor.fetchall()

    cursor.close()
    conn.close()
    return render_template('customers.html', data=result)



@app.route('/template')
def template():
    return render_template('template.html')

@app.route('/assembly')
def assembly():
    import pymysql

    conn = pymysql.connect(
        host='svc.sel3.cloudtype.app', user='root', password='1234', port=31776,
        db='BLEAX', charset='utf8'
    )

    cursor = conn.cursor(DictCursor)

    sql = '''
    SELECT *
    FROM assembly_member
    limit 0, 100;
    '''

    cursor.execute(sql)
    result = cursor.fetchall()


    # 커서 닫고, 연결 끊기
    conn.commit()
    cursor.close()
    conn.close()

    # DB의 데이터를 조회하려는데 JSON 응답에 오류
    # 왜? 리스트 또는 딕셔너리가 반환되어야 하는데 튜플로 반환해서
    
    # 해결방법 1) 리스트 컴프리헨션으로 리스트 형태로 변환
    # result2 = [list(result) for r in result]
    
    # 해결방법 2) jsonify() 함수 사용
    # jsonify : json화 (flask 모듈의 함수)
    
    # 해결방법 3) DictCursor 딕셔너리로 조회
    return render_template('assembly_members.html', data=result)

@app.route('/test1')
def test1():
    return render_template('test1.html', score=100)

@app.route('/test2', methods=[ 'GET', 'POST' ])
def test2():
    return [1, 2, 3]


@app.route('/test3/<tid>')
def test3(tid):
    return 'tid is %s' % tid

@app.route('/test4')
@app.route('/test4/<int:tid>')
def test4(tid=None):
    return 'test4 tid is %s' % tid


# debug : 자동으로 변경 결과 반영
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
