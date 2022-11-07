$(console.log("rcm_list_api시작"))
$(songlistview2)


async function songlistview2() {
    const response = await fetch('http://127.0.0.1:8000/songs/', {
        headers:{'content-type':'application/json'},
        method:'GET',
    })
    response_json = await response.json()
    console.log(response_json)

    $('#songs-box').empty()
    response_json.forEach(item => {
        $('#songs-box').append(
            `<figure style="display: inline-block;margin:10px;">
            <a href="#" onclick="move_rcm_page(${item.id})">
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


// function move_rcm_page(click_id, click_title){ 
//     console.log(click_id, click_title)
//     encoded_title = encodeURI(click_title)
//     console.log(encoded_id, encoded_title)
//     window.location.href = `/song_rcm.html?id=${encoded_id}&title=${encoded_title}`;
// }



function move_rcm_page(click_id){ 
    console.log(click_id)
    window.location.href = `/song_rcm.html?id=${click_id}`;
}

