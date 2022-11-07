$(function(){

    $("").click(function(){
        $("").show();
    });
    
})
//Playlist 노래 추가
async function PlaylistSongCreate(playlistId){
    var delConfirm = confirm("플레이리스트에 해당 노래를 추가하시겠습니까?")
    if (delConfirm){const response = await fetch(`${backendBaseUrl}/playlists/${playlistId.id}/${songId}/`, {
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
        alert(`플레이리스트에 노래가 추가되었습니다.`)
        window.location.replace('playlist.html')
        
    }else {
        alert(response_json["error"])
    }
}}

//노래 상세페이지에 playlist 불러오기
async function PlaylistSongView(){

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
        response_json.forEach(item => {
            $('#playlist_song_view').append(
                `
                <div class="card-header transparent b-b">
                </div>
                <ul class="playlist list-group list-group-flush">
                <li class="list-group-item">
                    <div class="d-flex align-items-center">
                        <div>
                            <a id="${item.id}" onclick="PlaylistSongCreate(this)"class="ml-3"><i class="icon-plus s-24" style="color:red"></i></a>
                        </div>
                        <div class="col-10">
                            <figure class="avatar-md float-left  mr-3 mt-1">
                                <img class="r-3" src="assets/img/demo/a4.jpg" alt="">
                            </figure>
                            <h6>${item.title}</h6>
                            <small>${item.content}</small>
                        </div>
                    </div>
                </li>
                </ui>
                    `
            )
        })
} PlaylistSongView()


const openButton = document.getElementById("playlistupdate");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay")
const closeBtn = modal.querySelector("#playlist_song_create")
const openModal = () =>{
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}
overlay.addEventListener("click", closeModal)
closeBtn.addEventListener("click", closeModal)
openButton.addEventListener("click", openModal)



