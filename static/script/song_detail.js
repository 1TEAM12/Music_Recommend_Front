const token = localStorage.getItem("payload");
let user_id = JSON.parse(token)

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

    const response = await fetch(`${backendBaseUrl}/songs/${songId}/song_like/`, {
        method: 'POST',
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access")
        },
    }
    )
    
    response_json = await response.json

    const a_heart_btn = document.getElementById("heartBtn")

    if(a_heart_btn.style.color == 'red'){
        a_heart_btn.style.color = 'gray' 
    } elif 

    if (a_heart_btn.style.color == "gray"){
        a_heart_btn.style.color = 'red'
    } else{
        a_heart_btn.style.color = 'gray' 
    }

    if (response.status == 200) {
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
        }else {
            alert(response_json["error"])
        }
}
}