from flask import Flask, render_template,request
import jsonify
import requests
import datetime

app = Flask(__name__)

from pymongo import MongoClient

## HTML 화면 보여주기
@app.route('/')
def homework():
    return render_template('index.html')

# 날씨 전달해주기
@app.route('/order', methods=['GET'])
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

    data['weather']=weather_data

    return jsonify({'hourlyweather': data['weather']})

