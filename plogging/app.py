from flask import Flask, render_template, request, jsonify
import requests
import datetime
from bs4 import BeautifulSoup
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.plogging
# fs=gridfs.GridFS(db)

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
# data = requests.get('',headers=headers)

# soup = BeautifulSoup(data.text, 'html.parser')

## 포스팅 API 포함된 페이지
@app.route('/')
@app.route('/main.html')
def home():
    return render_template('main.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/logPost', methods=['POST'])
def upload_log():
    # f=request.files['file']
    # f.save('static/uploads/'+f.filename)
    title_receive = request.form['title_give']
    tag_receive = request.form['tag_give']
    content_receive = request.form['cont_give']
    # src_receive=request.form['src_give']
    filename_receive=request.form['filename_give']
    # posi_receive = request.form['posi_give']
    # pic_receive = request.form['pic_give']

    # with open(filename_receive, 'rb') as f:
    #     contents=Binary(f.read())


    # imageID = fs.put(contents, filename=filename_receive)

    doc={
        'title':title_receive,
        'tag':tag_receive,
        'content':content_receive,
        'picture':filename_receive
        # 'position':posi_receive,
        # 'picture':pic_receive
    }
    db.plogging.insert_one(doc)
    return jsonify({'msg':'플로그 기록 완료!'})

@app.route('/logPost', methods=['GET'])
def read_logs():
    logs=list(db.plogging.find({},{'_id':False}))
    return jsonify({'all_logs':logs})

# 날씨 전달해주기
@app.route('/weather', methods=['GET'])
def save_weather():
    vilage_weather_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?"
    service_key = "IIAWO3kOcOOz3GXcA68FlABIiRgR1BLNA15kaKab0PxYeLMV5AV3mS%2Fq%2BExXQR4U6kR6QAn4MfCnkUyxFHimxA%3D%3D"
    today = datetime.datetime.today()
    base_date = today.strftime("%Y%m%d")  # "20200214" == 기준 날짜
    base_time = "0800"  # 날씨 값
    nx = "60"
    ny = "128"
    payload = "serviceKey=" + service_key + "&" + \
              "dataType=json" + "&" + \
              "base_date=" + base_date + "&" + \
              "base_time=" + base_time + "&" + \
              "nx=" + nx + "&" + \
              "ny=" + ny
    # 값 요청
    r = requests.get(vilage_weather_url + payload)
    items = r.json().get('response').get('body').get('items')

    data = dict()
    data['date'] = base_date
    weather_data = dict()
    for item in items['item']:
        # 기온
        if item['category'] == 'TMP':
            weather_data['기온'] = item['fcstValue']

        # 기상상태
        if item['category'] == 'PTY':

            weather_code = item['fcstValue']

            if weather_code == '1':
                weather_state = '비'
            elif weather_code == '2':
                weather_state = '비/눈'
            elif weather_code == '3':
                weather_state = '눈'
            elif weather_code == '4':
                weather_state = '소나기'
            else:
                weather_state = '맑음'

            # weather_data['code'] = weather_code
            weather_data['기상상황'] = weather_state
    weather_data['날짜']=base_date
    data['weather']=weather_data

    return jsonify({'hourlyweather': data['weather']})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
