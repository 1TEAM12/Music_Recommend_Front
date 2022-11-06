console.log("노래 상세페이지")

// 노래 상세정보
window.onload = async function loadSongs(){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    console.log(getLink_result)



    const response = await fetch(`http://127.0.0.1:8000/songs/${getLink_result}/`, { 
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }})
    
    response_json = await response.json() 

    console.log(response_json)

    const h1_song_title = document.getElementById("song_title")
    const h1_song_singer = document.getElementById("song_singer")
    const h1_song_genre = document.getElementById("song_genre")
    
    
    console.log(h1_song_title);
    h1_song_title.innerText = response_json.title
    h1_song_singer.innerText = response_json.singer
    h1_song_genre.innerText = response_json.genre
    document.getElementById("song_image").src = response_json.image

    const h6_song_lyrics = document.getElementById("song_lyrics")
    const span_song_likes = document.getElementById("song_likes")
    const h6_song_comments = document.getElementById("song_comments")

    span_song_likes.innerText = response_json.song_likes_count
    h6_song_lyrics.innerText = response_json.lyrics
     
    // comments
    const h6_comment_user = document.getElementById("comment_user")
    const h7_comment_content = document.getElementById("comment_content")
    const h7_comment_created_at = document.getElementById("comment_created_at")
    const comments_box = document.getElementById("comments_box")

    response_json.comments.forEach(element => {
        const boxEl = document.createElement('div');
        boxEl.innerText =`${element.user} ${element.created_at} ${element.content}`
        comments_box.append(boxEl);
    })
        // document.getElementById("profile_image").src = `http://127.0.0.1:8000${element.comments.profile_image}`

}


