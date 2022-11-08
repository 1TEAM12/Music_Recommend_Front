const token = localStorage.getItem("payload");
let user_id = JSON.parse(token)
const likeId = location.href.split('=')[1]
console.log(likeId)



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
        let VoiceDetailInfo = response_json
        return VoiceDetailInfo

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
    var delConfirm = confirm("정말 파일을 삭제하시겠습니까?")
        if(delConfirm){
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
            alert("댓글이 삭제되었습니다.")
            window.location.reload()
            return response_json
        }else {
            alert(response_json["error"])
        }
}}

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
async function SongLike() {
    const response = await fetch(`${backendBaseUrl}/songs/${likeId}/song_like/`, {

        method: 'POST',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
    }
    )

    const a_heart_btn = document.getElementById("heartBtn")

    response_json = await response.json

    if (response.status == 200) {
        window.location.reload()
        return
    }else {
        alert(response_json["msg"])
    }
    

}


async function mpload() {
    let voice = document.querySelector('#mp-file-upload');
    let voice_file = voice.files[0]
    formData = new FormData();
    
    formData.append("recode",voice_file)
    console.log(formData)
    const response = await fetch(`${backendBaseUrl}/songs/${songId}/voice/`, {
        method: "POST",
        headers: {
        "Authorization": "Bearer " + localStorage.getItem("access")
    },
    body: formData
    })
    if (response.status == 201) {
        alert('저장됐습니다.')
        window.location.reload()
    }else {
        alert(response_json["msg"])
    }
}

async function deletevoiceView(id, voice_id){
    var delConfirm = confirm("정말 파일을 삭제하시겠습니까?")
        if (delConfirm){
        const response = await fetch(`${backendBaseUrl}/songs/${id}/voice/${voice_id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            }
        })
        response_json = await response.json
        if (response.status === 200) {
            alert("파일이 삭제되었습니다.")
            window.location.reload()
        }else {
            alert(response_json["error"])
        }
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


//토글부분
$(function (){
	$("#btn_toggle").click(function (){
    $("#Toggle").toggle();
    });
});
$(function (){
	$("#btn_toggle2").click(function (){
    $("#Toggle2").toggle();
    });
});
$(function (){
	$("#btn_toggle3").click(function (){
    $("#Toggle3").toggle();
    });
});