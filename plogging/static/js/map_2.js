// from flask import Flask, render_template, request, jsonify, send_from_directory, abort
//
// import requests
// import datetime
// import os
// from bs4 import BeautifulSoup
// app = Flask(__name__)
//
// # app.config['images']="c:/client/img/"
//
// from pymongo import MongoClient
// client = MongoClient('localhost', 27017)
// db = client.plogging
// # fs=gridfs.GridFS(db)
//
// headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
// # data = requests.get('',headers=headers)
//
// # soup = BeautifulSoup(data.text, 'html.parser')
//
// ## 포스팅 API 포함된 페이지
// @app.route('/')
// @app.route('/main.html')
// def home():
//     return render_template('main.html')
//
// @app.route('/index.html')
// def index():
//     return render_template('index.html')
//
//
// # @app.route('/fileUpload', methods=['post'])
// # def upload_image():
// #     f=request.files['file']
// #     f.save(app.config['images']+f.filename)
// #     return
// #
// # @app.route('/get-image/<image_names>')
// # def get_image(image_name):
// #     try:
// #         return send_from_directory(app.config['images'],filename=image_name, as_attachment=True)
// #     except FileNotFoundError:
// #         abort(404)
//
// @app.route('/logPost', methods=['POST'])
// def upload_log():
//     # f=request.files['file']
//     # f.save('static/uploads/'+f.filename)
//     title_receive = request.form['title_give']
//     tag_receive = request.form['tag_give']
//     content_receive = request.form['cont_give']
//     # src_receive=request.form['src_give']
//     filename_receive=request.form['filename_give']
//     # posi_receive = request.form['posi_give']
//     # pic_receive = request.form['pic_give']
//
//     # with open(filename_receive, 'rb') as f:
//     #     contents=Binary(f.read())
//
//     # imageID = fs.put(contents, filename=filename_receive)
//
//     doc={
//         'title':title_receive,
//         'tag':tag_receive,
//         'content':content_receive,
//         'picture':filename_receive
//         # 'img':img
//         # 'position':posi_receive,
//         # 'picture':pic_receive
//     }
//     db.plogging.insert_one(doc)
//     return jsonify({'msg':'플로그 기록 완료!'})
//
// @app.route('/logPost', methods=['GET'])
// def read_logs():
//     logs=list(db.plogging.find({},{'_id':False}))
//     return jsonify({'all_logs':logs})
//
// # 날씨 전달해주기
// @app.route('/weather', methods=['GET'])
// def save_weather():
//     vilage_weather_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?"
//     service_key = "IIAWO3kOcOOz3GXcA68FlABIiRgR1BLNA15kaKab0PxYeLMV5AV3mS%2Fq%2BExXQR4U6kR6QAn4MfCnkUyxFHimxA%3D%3D"
//     today = datetime.datetime.today()
//     base_date = today.strftime("%Y%m%d")  # "20200214" == 기준 날짜
//     base_time = "0800"  # 날씨 값
//     nx = "60"
//     ny = "128"
//     payload = "serviceKey=" + service_key + "&" + \
//               "dataType=json" + "&" + \
//               "base_date=" + base_date + "&" + \
//               "base_time=" + base_time + "&" + \
//               "nx=" + nx + "&" + \
//               "ny=" + ny
//     # 값 요청
//     r = requests.get(vilage_weather_url + payload)
//     items = r.json().get('response').get('body').get('items')
//
//     data = dict()
//     data['date'] = base_date
//     weather_data = dict()
//     for item in items['item']:
//         # 기온
//         if item['category'] == 'TMP':
//             weather_data['기온'] = item['fcstValue']
//
//         # 기상상태
//         if item['category'] == 'PTY':
//
//             weather_code = item['fcstValue']
//
//             if weather_code == '1':
//                 weather_state = '비'
//             elif weather_code == '2':
//                 weather_state = '비/눈'
//             elif weather_code == '3':
//                 weather_state = '눈'
//             elif weather_code == '4':
//                 weather_state = '소나기'
//             else:
//                 weather_state = '맑음'
//
//             # weather_data['code'] = weather_code
//             weather_data['기상상황'] = weather_state
//     weather_data['날짜']=base_date
//     data['weather']=weather_data
//
//     return jsonify({'hourlyweather': data['weather']})
//
// if __name__ == '__main__':
//     app.run('0.0.0.0', port=5000, debug=True)
//

// var submit=document.getElementById("submitButton");
// submit.onclick=showImage();
// $('#toHome').change(function (){
//    document.location.href=$('#fashome').val();
// });

// $(document).ready(function () {
//     get_weather();
//     getPost();
// });
//
// function showImage(name){
//     var newImage=document.getElementById(name).lastElementChild;
//     // var fileName=document.getElementById('fileName').textContent
//
//     newImage.style.visibility = "visible";
//
//     //document.getElementById("image-upload").style.visibility="hidden";
//     // document.getElementById('fileName').textContent=null;
//
//
//
//     // postingPost(newImage, fileName);
// }
//
// function loadFile(input) {
//     var file = input.files[0];
//
//     //file의 이름을 가져와서 fileName이라는 id 가진 요소에 넣어준다.
//     var name = document.getElementById('fileName');
//     name.textContent = file.name;
//
//     //newImage라는 이름의 img 태그를 만든후, 여기 들어갈 수 있는 값을 img형식으로 제한한다.
//     var newImage = document.createElement('img');
//     newImage.setAttribute("class", "img");
//     //file의 URL을 가져와서, 위에서 만든 newImage의 src로 넣어준다.
//     source=URL.createObjectURL(file);
//     newImage.src = source
//     //newImage의 스타일
//     newImage.style.width = "70%";
//     newImage.style.height = "70%";
//     //newImage.style.visibility = "hidden";
//
//     // newImage를 html에 지정된 위치(id가 ~인 곳)의 자식으로 추가한다.
//     var container=document.getElementById(name.textContent);
//     container.append(newImage);
//
//     newImage.style.objectFit = "contain";
//     document.getElementById(name.textContent).style.visibility = "hidden";
// }
//
// function postingPost(){
//     let title= $('#title').val()
//     let tag=$('#tag').text()
//     let content=$('#content').val()
//     let fileName=$('#fileName').text()
//
//     var newImage=document.getElementById(fileName).lastElementChild;
//     newImage.style.visibility = "visible";
//
//     $.ajax({
//         type:"POST",
//         url: "/logPost",
//         data: {title_give:title, tag_give:tag,cont_give:content, filename_give:fileName},
//         success: function (response){
//             alert(response["msg"]);
//             window.location.reload()
//         }
//     })
// }
//
// function getPost(){
//     document.getElementById('fileName').textContent=null;
//
//     $.ajax({
//         type:"GET",
//         url: "/logPost",
//         data:{},
//         success: function (response){
//             let logs=response['all_logs']
//             for (let i=0;i<logs.length;i++){
//                 let title=logs[i]['title']
//                 let tag=logs[i]['tag']
//                 let content=logs[i]['content']
//                 let picture=logs[i]['picture']
//                 // let img=logs[i]['img']
//                 temp_html=`<div class="card" style="width: 18rem;">
//                                 <img class="card-img-top" id="${picture}" alt="">
//                                 <div class="card-body">
//                                   <h5 class="card-title">${title}</h5>
//                                   <p class="card-text">${content}</p>
//                                   <p class="card-text"><small class="text-muted">${tag}</small></p>
//                                 </div>
//                             </div>`
//                 $('.card-deck').append(temp_html)
//             }
//         }
//     })
//
//         // `<div class="a_plog">
//         //             <h3>제목</h3>
//         //             <h4>${title}</h4>
//         //             <h3>태그</h3>
//         //             <h4>${tag}</h4>
//         //             <h3>내용</h3>
//         //             <h4>${content}</h4>
//         //         </div>`
//
// }
//
//
// function get_weather() {
//     // 날씨 API 연결
//     $.ajax({
//         type: "GET",
//         url: "/weather",
//         data: {},
//         success: function (responses) {
//             let response=responses['hourlyweather']
//             // for (let i=0;i<response.length;i++){
//             let tempa = response['기온']
//             let weastat = response['기상상황']
//             let date =response['날짜']
//
//             temp_html=`<h3> 기온 : ${tempa}'C 날씨 : ${weastat} </h3>`
//             // $(".headImg").append(temp_html)
//             $(".show_weather").append(temp_html)
//             // $('#tag').append(`<div id='datetag'>${date}</div>`)
//             $('#tag').text(`${date}의 P-Log`)
//         }
//     })
// }
