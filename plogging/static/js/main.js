// var submit=document.getElementById("submitButton");
// submit.onclick=showImage();
// $('#toHome').change(function (){
//    document.location.href=$('#fashome').val();
// });

$(document).ready(function () {
    get_weather();
    getPost();
});

function showImage(){
    var newImage=document.getElementById('image-show').lastElementChild;
    var fileName=document.getElementById('fileName').textContent

    newImage.style.visibility = "visible";

    //document.getElementById("image-upload").style.visibility="hidden";
    document.getElementById('fileName').textContent=null;

    //newImage를 html에 지정된 위치(id가 ~인 곳)의 자식으로 추가한다.
    // var container=document.getElementById("image-show");
    // container.append(newImage);

    // postingPost(newImage, fileName);
}

function loadFile(input) {
    var file = input.files[0];

    //file의 이름을 가져와서 fileName이라는 id 가진 요소에 넣어준다.
    var name = document.getElementById('fileName');
    name.textContent = file.name;

    //newImage라는 이름의 img 태그를 만든후, 여기 들어갈 수 있는 값을 img형식으로 제한한다.
    var newImage = document.createElement('img');
    newImage.setAttribute("class", "img");
    //file의 URL을 가져와서, 위에서 만든 newImage의 src로 넣어준다.
    source=URL.createObjectURL(file);
    newImage.src = source
    //newImage의 스타일
    newImage.style.width = "70%";
    newImage.style.height = "70%";
    //newImage.style.visibility = "hidden";
    newImage.style.objectFit = "contain";
    // document.getElementById("post").style.visibility = "hidden";
}

function postingPost(){

    let title= $('#title').val()
    let tag=$('#tag').text()
    let content=$('#content').val()
    let fileName=$('#fileName').text()
    $.ajax({
        type:"POST",
        url: "/logPost",
        data: {title_give:title, tag_give:tag,cont_give:content, filename_give:fileName},
        success: function (response){
            alert(response["msg"]);
            window.location.reload()
        }
    })
}

function getPost(){
    document.getElementById('fileName').textContent=null;

    $.ajax({
        type:"GET",
        url: "/logPost",
        data:{},
        success: function (response){
            let logs=response['all_logs']
            for (let i=0;i<logs.length;i++){
                let title=logs[i]['title']
                let tag=logs[i]['tag']
                let content=logs[i]['content']
                let picture=logs[i]['picture']

                temp_html=`<div class="card">
                                <img class="card-img-top" src="" alt="">
                                <div class="card-body">
                                  <h5 class="card-title">${title}</h5>
                                  <p class="card-text">${content}</p>
                                  <p class="card-text"><small class="text-muted">${tag}</small></p>
                                </div>
                            </div>`
                $('.card-deck').append(temp_html)
            }
        }
    })

        // `<div class="a_plog">
        //             <h3>제목</h3>
        //             <h4>${title}</h4>
        //             <h3>태그</h3>
        //             <h4>${tag}</h4>
        //             <h3>내용</h3>
        //             <h4>${content}</h4>
        //         </div>`

}


function get_weather() {
    // 날씨 API 연결
    $.ajax({
        type: "GET",
        url: "/weather",
        data: {},
        success: function (responses) {
            let response=responses['hourlyweather']
            // for (let i=0;i<response.length;i++){
            let tempa = response['기온']
            let weastat = response['기상상황']
            let date =response['날짜']

            temp_html=`<h3> 기온 : ${tempa}'C 날씨 : ${weastat} </h3>`
            // $(".headImg").append(temp_html)
            $(".show_weather").append(temp_html)
            // $('#tag').append(`<div id='datetag'>${date}</div>`)
            $('#tag').text(`${date}의 P-Log`)
        }
    })
}
