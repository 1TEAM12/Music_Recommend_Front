window.onload = () => {
    console.log("Home 접속 완료")
    
}


$(document).ready(function(){
    songlistview2();
});



async function songlistview2() {
    $('#songs-box').empty()
    $.ajax({
        type:"GET",
        url: "http://127.0.0.1:8000/songs/",
        data: {},
        success: function (response) {
            let rows = response
            for (let i = 0; i < rows.length; i++) {
                let title = rows[i]['title']
                let singer = rows[i]['singer']
                let image = rows[i]['image']
                let id = rows[i]['id']

                let temp_html = `<figure style="display: inline-block;margin:10px;">
                                    <a href="song_rcm.html">
                                    <div class="img-wrapper">
                                        <img src="${image}" style="width:300px;height:300px;"onerror="this.src='https://avatars.githubusercontent.com/u/114125954?s=200&v=4'">
                                        <div class="img-overlay text-white text-center">
                                            <div class="figcaption mt-3">
                                                <i class="icon-link s-48"></i>
                                                
                                                <div id="SongCard" class="mt-5">
                                                    <h5 class="mt-5"">${title}</h5>
                                                </div>
                                                <span>${id}</span>
                                                <span>${singer}</span>
                                            </div>
                                        </div>
                                        <div class="figure-title text-center p-2" style="width:300px;">
                                            <h5>${title}</h5>
                                            <span style="width:300px;">${singer}</span>
                                        </div>
                                    </div>
                                    </a>
                                </figure>`
                                $('#songs-box').append(temp_html)
                console.log(title, singer, image, id)
            }
        }
    })
}






// async function songlistview() {
//     const response = await fetch('http://127.0.0.1:8000/songs/', {
//         headers:{
//             "Authorization":"Bearer " + localStorage.getItem("access"),
//             'content-type' : 'application/json',
//         },
//         method: 'GET',
//     }
//     const result = await response.text();)

//     console.log(response)
// }

async function songlistview() {
    const response = await fetch('http://127.0.0.1:8000/songs/', {method:'GET'})
    response_json = await response.json();
    console.log(response_json);

    const Songs = document.getElementById("SongCard")

    response_json.forEach(element => {
        const newSong = document.createElement("div")
        newSong.innerText = element.title
        Songs.appendChild(newSong)
    })
}




// async function songlistview() {
//     const response = await fetch('http://127.0.0.1:8000/songs/')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
