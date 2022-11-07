const playlistId = location.href.split('?')[1]
console.log(playlistId)
//user의 플레이리스트
async function PlaylistView(){

    const response = await fetch(`${backendBaseUrl}/playlists/`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
    }
    )
    response_json = await response.json()
    console.log(response_json)
        response_json.forEach(item => {
            $('#playlist').append(
                `
                <div class="col-lg-3 col-md-4 col-sm-6 my-2">
                    <figure>
                        <div class="img-wrapper">
                            <img src="assets/img/demo/a1.jpg" >
                            <div class="img-overlay text-white text-center">
                                <a onclick="location.href='/playlist_detail.html?${item.id}'">
                                    <div class="figcaption mt-3">
                                        <i class="icon-link s-48"></i>
                                        <h5 class="mt-5">${item.title}</h5>
                                    </div>
                                </a>
                            </div>
                            <div class="figure-title text-center p-2">
                                <h5>${item.content}</h5>
                            </div>
                        </div>
                    </figure>
                </div>
                `
            )
        })
}
PlaylistView()

//user의 상세 플레이리스트
async function PlaylistDetailView(playlistId){

    const response = await fetch(`${backendBaseUrl}/playlists/${playlistId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
    }
    )
    response_json = await response.json()

    const playlist_detail_title = document.getElementById('playlist_detail_title_1')
    const playlist_detail_content = document.getElementById('playlist_detail_content_1')

    playlist_detail_title.innerText = response_json.title
    playlist_detail_content.innerText = response_json.content

    const playlist_detail_update_title = document.getElementById("playlist_title")
    const playlist_detail_update_content = document.getElementById("playlist_content")

    playlist_detail_update_title.value = response_json.title
    playlist_detail_update_content.innerText = response_json.content

        response_json.playlist_detail.forEach(item => {
            $('#playlist_detail_content').append(
                `
                <li class="list-group-item my-1">
                    <div class="d-flex align-items-center">
                        <div class="col-1">
                        </div>
                        <div class="col-6">
                            <h6>${item.title}</h6>
                        </div>
                        <div class="col">
                            <h6>${item.singer}</h6>
                        </div>
                        <div class="col">
                            <h6>${item.genre}</h6>
                        </div>
                        <a id="${item.id}" onclick="PlaylistSongDelete(this)" class="nav-link mr-3 btn--searchOverlay no-ajaxy"><i class="icon-minus-1 s-24 style="color:red;"></i></a>
                        <div class="ml-auto">
                            <a onclick="location.href='/song_detail.html?${item.id}'" class="btn btn-outline-primary btn-sm d-none d-lg-block">Song detail</a>
                        </div>
                    </div>
                </li>
                `
            )
        })
}
PlaylistDetailView(playlistId)

//playlist DELETE
async function PlaylistDetailDelete(){
    var delConfirm = confirm("정말 삭제를 하시겠습니까?")
    if (delConfirm) {const response = await fetch(`${backendBaseUrl}/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }
    }
    )
    response_json = await response.json
    if (response.status === 200) {
        alert("플레이리스트가 삭제되었습니다")
        location.replace('playlist.html')    
    }else {
        alert(response_json["error"])
  
    }
}}

//playlist PUT
async function PlaylistDetailUpdate(){
    var delConfirm = confirm("정말 수정을 하시겠습니까?")
    if (delConfirm) {
        const playlist_title = document.getElementById("playlist_title").value
        const playlist_content = document.getElementById("playlist_content").value


        const playlistTextData = {
            "title": playlist_title,
            "content" : playlist_content,
        }   

        const response = await fetch(`${backendBaseUrl}/playlists/${playlistId}/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            },
        body: JSON.stringify(playlistTextData)

    }
    )
    response_json = await response.json
    if (response.status === 200) {
        alert("수정이 완료되었습니다.")
        location.reload()
        
    }else {
        alert(response_json["error"])
    }
}}

//playlist Post
async function PlaylistDetailCreate(){

    const playlist_title = document.getElementById("playlist_title").value
    const playlist_content = document.getElementById("playlist_content").value

    const playlistTextData = {
        "title": playlist_title,
        "content" : playlist_content,
    }   

    const response = await fetch(`${backendBaseUrl}/playlists/`, {
    method: 'POST',
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access")
        },
    body: JSON.stringify(playlistTextData)

    }
    )
    response_json = await response.json
    if (response.status === 200) {
        alert("플레이리스트가 추가되었습니다.")
        location.reload()
        
    }else {
        alert(response_json["error"])
    }
}

//Playlist 노래 삭제
async function PlaylistSongDelete(playlistsongid){
    var delConfirm = confirm("플레이리스트에 노래를  삭제 하시겠습니까?")
    if (delConfirm){const response = await fetch(`${backendBaseUrl}/playlists/${playlistId}/${playlistsongid.id}/`, {
    method: 'POST',
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access")
        },
    }
    )
    response_json = await response.json
    if (response.status === 200) {
        alert("플레이리스트에 노래가 삭제되었습니다.")
        location.reload()
        
    }else {
        alert(response_json["error"])
    }
}}