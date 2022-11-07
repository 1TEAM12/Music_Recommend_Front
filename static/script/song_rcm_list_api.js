console.log("Home 접속 완료")

window.onload = async function songlistview2() {
    const response = await fetch('http://127.0.0.1:8000/songs/', {method:'GET'})
    response_json = await response.json()
    console.log(response_json)

    const songs = document.getElementById("songs")

    response_json.forEach(element => {
        const song_title = document.createElement("h4");
        const song_singer = document.createElement("h5");
        const song_image = document.createElement("image");
        const song_id = document.createElement("p");

        // song_title.setAttribute("class", "song_title");
        // song_singer.setAttribute("class", "song_singer");
        // song_image.setAttribute("class", "song_image");
        // song_id.innerHTML = `<a onclick=goDetail(${response_json.id})>${response_json.title}</a>`;
        // song_id.setAttribute("class", "song_id");

        // song_image.style.backgroundImage = `url(${image})`
        
        song_title.innerText = element.title
        songs.appendChild(song_title)

        
        song_singer.innerText = element.singer
        songs.appendChild(song_singer)
        
        
        song_image.innerText = element.image
        songs.appendChild(song_image)

        
        song_id.innerText = element.id
        songs.appendChild(song_id)
    })
}



// async function songlistview2() {
//     $('#songs-box').empty()
//     $.ajax({
//         type:"GET",
//         url: "http://127.0.0.1:8000/songs/",
//         data: {},
//         success: function (response) {
//             let rows = response
//             for (let i = 0; i < rows.length; i++) {
//                 let title = rows[i]['title']
//                 let singer = rows[i]['singer']
//                 let image = rows[i]['image']
//                 let id = rows[i]['id']
//                 localStorage.setItem('song_id',id);
//                 let temp_html = ``
//                                 $('#songs-box').append(temp_html)
//                 console.log(title, singer, image, id)
//             }
//         }
//     })
// }


// function click_song() {
//     $('#song_id').append(temp_html)
//     localStorage.setItem('song_id',song_id);
// }





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

// async function songlistview() {
//     const response = await fetch('http://127.0.0.1:8000/songs/', {method:'GET'})
//     response_json = await response.json();
//     console.log(response_json);

//     const Songs = document.getElementById("SongCard")

//     response_json.forEach(element => {
//         const newSong = document.createElement("div")
//         newSong.innerText = element.title
//         Songs.appendChild(newSong)
//     })
// }




// async function songlistview() {
//     const response = await fetch('http://127.0.0.1:8000/songs/')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
