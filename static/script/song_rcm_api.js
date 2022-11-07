$(songrecommend)
const songId = location.href.split('=')[1]

//노래 GET
async function SongDetailView(id){

    const response = await fetch(`${backendBaseUrl}/songs/${id}/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        return response_json

    }else {
        alert(response_json["error"])
    }

}

//노래 타이틀 읽어오기
async function loadSongsTitle(){
    const song_detail = await SongDetailView(songId)

    const p_result_title = document.getElementById("result_title")

    p_result_title.innerHTML =  `<p style="text-align:center;font-size:30px;font-weight: bold;">선택된 노래 "${song_detail.title}"</p>`
}

loadSongsTitle()


async function rcmParam(){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    let decodeResult = decodeURI(getLink_result);
    console.log(decodeResult);
}


async function songrecommend(){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    let decodeResult = decodeURI(getLink_result);
    console.log(decodeResult);


    const response = await fetch(`http://127.0.0.1:8000/songs/${decodeResult}/recommend/`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            // "Authorization": "Bearer " + localStorage.getItem("access")
            }
    }
    )
    response_json = await response.json()


    $('#rcm-box').empty()
    response_json.forEach(item => {
        $('#rcm-box').append(
            `<figure style="display: inline-block;margin:10px;">
            <a href="#" onclick="move_detail_page(${item.pk}+1)">
                <div class="img-wrapper">
                    <img src="${item.image}" style="width:300px;height:300px;"onerror="this.src='https://avatars.githubusercontent.com/u/114125954?s=200&v=4'">
                    <div class="img-overlay text-white text-center">
                        <div class="figcaption mt-3">
                            <i class="icon-link s-48"></i>
                            
                            <div id="SongCard" class="mt-5">
                                <h5 id="title" class="mt-5""></h5>
                            </div>
                            <span style="font-weight:bold;font-size:25px;" id="singer">${item.title}</span>
                            <div style="color:yellow" id="songs">${item.singer}</div>
                        </div>
                    </div>
                    <div class="figure-title text-center p-2" style="width:300px;">
                        <h5 id="title"></h5>
                        <span id="singer" style="width:300px;"></span>
                    </div>
                </div>
            </a>
        </figure>`
        )
    });
}

function move_detail_page(click_id){ 
    console.log(click_id)
    window.location.href = `/song_detail.html?$id=${click_id}`;
}