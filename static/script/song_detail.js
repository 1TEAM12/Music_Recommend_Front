const token = localStorage.getItem("payload");
let user_id = JSON.parse(token)



//노래 GET
async function SongDetailView(id){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    let decodeResult = decodeURI(getLink_result);
    console.log(decodeResult);

    const response = await fetch(`${backendBaseUrl}/songs/${decodeResult}/`, {
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
        let SongDetailInfo = response_json
        return SongDetailInfo

    }else {
        alert(response_json["error"])
    }

}

//댓글 GET
async function CommentDetailView(id){

    const response = await fetch(`${backendBaseUrl}/songs/${id}/comment/`, {
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
        let CommentDetailInfo = response_json
        return CommentDetailInfo

    }else {
        alert(response_json["error"])
    }

}

//모창 GET
async function VoiceDetailView(id){

    const response = await fetch(`${backendBaseUrl}/songs/${id}/voice/`, {
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
        let VoicelInfo = response_json
        return VoiceInfo

    }else {
        alert(response_json["error"])
    }

}

//댓글 POST
async function commentView(id, content){

    const commentInput = document.getElementById("comment-content");

    const commentTextData = {
        "content" : content,
    }
    const response = await fetch(`${backendBaseUrl}/songs/${id}/comment/`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            },
        body: JSON.stringify(commentTextData)
}
    )
    response_json = await response.json()
    
    if (response.status == 201) {
        commentInput.value = null;
        return response_json

    }else {
        alert(response_json["error"])
        commentInput.value = null;
    }
}

//댓글 Delete
async function deletecommentView(id, comment_id){
    alert("댓글이 삭제되었습니다.")
        const response = await fetch(`${backendBaseUrl}/songs/${id}/comment/${comment_id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        })
        response_json = await response.json
        if (response.status === 200) {
            return response_json
        }else {
            alert(response_json["error"])
        }
}

//댓글 Update
async function updatecommentView(id, comment_id, comment){

    const commentTextData = {
        "content" : comment,
    }
    const response = await fetch(`${backendBaseUrl}/songs/${id}/comment/${comment_id}/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            },
        body: JSON.stringify(commentTextData)
}
    )
    response_json = await response.json()
    
    if (response.status == 200) {
        alert ("댓글이 수정되었습니다.")
        location.reload();
        return response_json

    }else {
        alert(response_json["error"])
    }
}

//좋아요 POST
async function SongLike(id) {

    const response = await fetch(`${backendBaseUrl}/songs/${id}/song_like/`, {
        method: 'POST',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
    }
    )
    response_json = await response.json()
    
    if (response.status == 200) {
        return
    }else {
        alert(response_json["msg"])
    }
}


// 좋아요 불러오기
async function songlistview2() {
    const response = await fetch('http://127.0.0.1:8000/1/song_like/', {
        headers:{'content-type':'application/json'},
        method:'GET',
    })
    response_json = await response.json()
    console.log(response_json)
    response_json.forEach(item => {
        $('#like-card').append(
            `<div class="d-flex align-items-center mb-4 ">
            <div class="col-5">
                <img src="assets/img/demo/v4.jpg" alt="Card image">
            </div>
            <div class="ml-3">
                <a href="video-single.html">
                    <h6 id="songs_title">Song Title</h6>
                </a>
                <small class="mt-1">Song Singer</small>
            </div>
        </div>`
        )
    });
}