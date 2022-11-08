window.onload = async function loadSongs(){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    console.log(getLink_result)



    const response = await fetch(`http://127.0.0.1:8000/songs?$id=${getLink_result}/`, { 
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
            }})
    
    response_json = await response.json() 

    console.log(response_json)
}

const songId = location.href.split('=')[1]
const commentId = location.href.split('=')[1]
const voiceId = location.href.split('=')[1]


// 댓글시간 나타내기
function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
};
// 노래 상세정보

async function loadSongs(){
    const song_detail = await SongDetailView(songId)
    console.log(song_detail.song_likes)
    console.log(user_id.email)
    const h1_song_title = document.getElementById("song_title")
    const h1_song_singer = document.getElementById("song_singer")
    const h1_song_genre = document.getElementById("song_genre")
    const a_heart_btn = document.getElementById("heartBtn")

    h1_song_title.innerText = song_detail.title
    h1_song_singer.innerText = song_detail.singer
    h1_song_genre.innerText = song_detail.genre


    if (song_detail.song_likes.indexOf(user_id.email)){
        a_heart_btn.innerHTML = '<i class="icon-heart s-24"></i>'
    } else {
        a_heart_btn.innerHTML = '<i class="icon-heart s-24" style="color:red;"></i>'
    }

    document.getElementById("song_image").src = song_detail.image

    const h6_song_lyrics = document.getElementById("song_lyrics")
    const span_song_likes = document.getElementById("song_likes")

    span_song_likes.innerText = song_detail.song_likes_count
    h6_song_lyrics.innerText = song_detail.lyrics

}

//댓글 전체정보
async function loadComments(){
    
    const comment_detail = await CommentDetailView(commentId)
    console.log(comment_detail)
    const auctionComments = document.getElementsByClassName("one-comment")[0]
    const span_comments_count = document.getElementById("comments_count")

    span_comments_count.innerText = comment_detail.length
    console.log(comment_detail.length)
    

    for (let i = 0; i < comment_detail.length; i++) {

        const newCommentLayout = document.createElement("div")
        newCommentLayout.setAttribute("class", "bg-white p-2")
        auctionComments.append(newCommentLayout)

        const newCommentUser = document.createElement("div")
        newCommentUser.setAttribute("class", "d-flex flex-row user-info")
        newCommentLayout.append(newCommentUser)

        const newCommentUserInfo = document.createElement("div")
        newCommentUserInfo.setAttribute("class", "d-flex flex-column justify-content-start ml-2")
        newCommentUser.append(newCommentUserInfo)
        
        //프로필이미지
        const newCommentUserImage = document.createElement("img")
        let profile_image = comment_detail[i]['profile_image']
        newCommentUserImage.setAttribute("src", `${backendBaseUrl}${profile_image}` )
        newCommentUserImage.setAttribute("class", "avatar avatar-md mr-3 mt-1" )
        newCommentUserInfo.append(newCommentUserImage)        

        //유저닉네임
        const newCommentUserName = document.createElement("span")
        newCommentUserName.setAttribute("class", "d-block font-weight-bold name")
        newCommentUserName.innerText = comment_detail[i]['user']
        newCommentUserInfo.append(newCommentUserName)

        
        //댓글단 시간
        const newCommentTime = document.createElement("span")
        newCommentTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(comment_detail[i]['created_at'])
        let time_before = time2str(time_post)

        newCommentTime.innerText = time_before
        newCommentUserInfo.append(newCommentTime)

        //댓글내용
        const newCommentArea = document.createElement("div")
        newCommentArea.setAttribute("class", "mt-2")
        newCommentLayout.append(newCommentArea)

        const newCommentText = document.createElement("p")
        newCommentText.setAttribute("class", "comment-text")
        newCommentText.innerText = comment_detail[i]['content']
        newCommentArea.append(newCommentText)

        //삭제 버튼
        if(comment_detail[i]['user'] == user_id['nickname'] ){
        const newDeleteBtn = document.createElement("button")
        newDeleteBtn.setAttribute("class", "comment-delete")
        newDeleteBtn.setAttribute("id", comment_detail[i]['id'])
        newDeleteBtn.setAttribute("onclick", "deleteComment(this)")
        newDeleteBtn.innerText = "삭제"
        newCommentUser.append(newDeleteBtn)

        //수정 버튼
        const newUpdateBtn = document.createElement("button")
        newUpdateBtn.setAttribute("class", "comment-update")
        newUpdateBtn.setAttribute("id", comment_detail[i]['id'])
        newUpdateBtn.setAttribute("onclick", `updateComment(this)`)
        newUpdateBtn.innerText = "수정"
        newCommentUser.append(newUpdateBtn)
    }
}}

//모창 전체정보
async function loadVoices(){
    
    const voice_detail = await VoiceDetailView(voiceId)
    console.log(voice_detail)
    const auctionVoices = document.getElementsByClassName("one-voice")[0]
    const span_voice_count = document.getElementById("voices_count")
    console.log(voice_detail.length)
    span_voice_count.innerText = voice_detail.length

    for (let i = 0; i < voice_detail.length; i++) {

        const newVoiceLayout = document.createElement("div")
        newVoiceLayout.setAttribute("class", "bg-white p-2")
        auctionVoices.prepend(newVoiceLayout)

        const newVoiceUser = document.createElement("div")
        newVoiceUser.setAttribute("class", "d-flex flex-row user-info")
        newVoiceLayout.append(newVoiceUser)

        const newVoiceUserInfo = document.createElement("div")
        newVoiceUserInfo.setAttribute("class", "d-flex flex-column justify-content-start ml-2")
        newVoiceUser.append(newVoiceUserInfo)

        const audioContainer = document.querySelector('#audioContainer')
        newVoiceUserInfo.append(audioContainer)


        
        //프로필이미지
        const newVoiceUserImage = document.createElement("img")
        let profile_image = voice_detail[i]['profile_image']
        newVoiceUserImage.setAttribute("src", `${backendBaseUrl}/${profile_image}` )
        newVoiceUserImage.setAttribute("class", "avatar avatar-md mr-3 mt-1" )
        newVoiceUserInfo.append(newVoiceUserImage)        

        //유저닉네임
        const newVoiceUserName = document.createElement("span")
        newVoiceUserName.setAttribute("class", "d-block font-weight-bold name")
        newVoiceUserName.innerText = voice_detail[i]['user']
        newVoiceUserInfo.append(newVoiceUserName)

        
        //모창 등록 시간
        const newVoiceTime = document.createElement("span")
        newVoiceTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(voice_detail[i]['created_at'])
        let time_before = time2str(time_post)

        newVoiceTime.innerText = time_before
        newVoiceUserInfo.append(newVoiceTime)

        // 모창 재생
        const newVoice = document.createElement("audio")
        let currentAudio = voice_detail[i]['recode'].split('/')[3]
        newVoice.setAttribute("class", "mt-2")
        newVoice.setAttribute("src", `${backendBaseUrl}/media/voice_record/${currentAudio}` )
        newVoiceLayout.append(newVoice)
        console.log(audioContainer)

        
        function playAudio() {
        audioContainer.volume = 0.2;
        audioContainer.loop = true;
        audioContainer.play();
        }

        function stopAudio() {
        audioContainer.pause();  
        }


        function loadAudio() {
        let source = document.querySelector('#audioSource');
        let currentAudio = voice_detail[i]['recode'].split('/')[3]

        console.log(currentAudio)
        source.src = `${backendBaseUrl}/media/voice_record/${currentAudio}`
        audioContainer.load();
        playAudio();
        }

        const newvoiceBtn = document.createElement("button")
        newvoiceBtn.setAttribute("class", "voice-play")
        newvoiceBtn.setAttribute("id", voice_detail[i]['id'])
        // newvoiceBtn.setAttribute("onclick", "loadAudio(this)")
        newvoiceBtn.onclick = ()=> loadAudio(currentAudio,this);
        newvoiceBtn.innerText = "♬ Play Music"
        newVoiceUser.append(newvoiceBtn)


        const newstopBtn = document.createElement("button")
        newstopBtn.setAttribute("class", "voice-play")
        newstopBtn.setAttribute("id", voice_detail[i]['id'])
        newstopBtn.onclick = ()=> stopAudio(currentAudio,this);
        newstopBtn.innerText = "♬ stop Music"
        newVoiceUser.append(newstopBtn)


        //삭제 버튼
        if(voice_detail[i]['user'] == user_id['nickname'] ){
        const newDeleteBtn = document.createElement("button")
        newDeleteBtn.setAttribute("class", "voice-delete")
        newDeleteBtn.setAttribute("id", voice_detail[i]['id'])
        newDeleteBtn.setAttribute("onclick", "deleteVoice(this)")
        newDeleteBtn.innerText = "삭제"
        newVoiceUser.append(newDeleteBtn)


    }
}
}

loadSongs()
loadComments()
loadVoices()

async function handleComment(){

    const content = document.getElementById("comment-content").value
    console.log(content)

    if (content.Length == 0) {
        alert("댓글을 입력해주세요.")
    }else{
        
        const comment_content = await commentView(songId, content)
        const comment_detail = await CommentDetailView(commentId)      
        const loadComments = document.getElementsByClassName("one-comment")[0]

        const newCommentLayout = document.createElement("div")
        newCommentLayout.setAttribute("class", "bg-white p-2")
        loadComments.prepend(newCommentLayout)

        const newCommentUser = document.createElement("div")
        newCommentUser.setAttribute("class", "d-flex flex-row user-info")
        newCommentLayout.append(newCommentUser)

        const newCommentUserInfo = document.createElement("div")
        newCommentUserInfo.setAttribute("class", "d-flex flex-column justify-content-start ml-2")
        newCommentUser.append(newCommentUserInfo)
        
        //프로필이미지
        const newCommentUserImage = document.createElement("img")
        let profile_image = comment_detail[0]['profile_image']
        newCommentUserImage.setAttribute("src", `${backendBaseUrl}${profile_image}` )
        newCommentUserImage.setAttribute("class", "avatar avatar-md mr-3 mt-1" )
        newCommentUserInfo.append(newCommentUserImage)

        //유저닉네임
        const newCommentUserName = document.createElement("span")
        newCommentUserName.setAttribute("class", "d-block font-weight-bold name")
        newCommentUserName.innerText = comment_detail[0]['user']
        newCommentUserInfo.append(newCommentUserName)

        //댓글단 시간
        const newCommentTime = document.createElement("span")
        newCommentTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(comment_detail[0]['created_at'])
        let time_before = time2str(time_post)

        newCommentTime.innerText = time_before
        newCommentUserInfo.append(newCommentTime)
        //댓글내용
        const newCommentArea = document.createElement("div")
        newCommentArea.setAttribute("class", "mt-2")
        newCommentLayout.append(newCommentArea)

        const newCommentText = document.createElement("p")
        newCommentText.setAttribute("class", "comment-text")
        newCommentText.innerText = comment_detail[0]['content']
        newCommentArea.append(newCommentText)

        //삭제 버튼
        if(comment_detail[0]['user'] == user_id['nickname'] ){
        const newDeleteBtn = document.createElement("button")
        newDeleteBtn.setAttribute("class", "comment-delete")
        newDeleteBtn.setAttribute("id", comment_detail[0]['id'])
        newDeleteBtn.setAttribute("onclick", `deleteComment(this)`)
        newDeleteBtn.innerText = "삭제"
        newCommentUser.append(newDeleteBtn)

        //수정 버튼
        const newUpdateBtn = document.createElement("button")
        newUpdateBtn.setAttribute("class", "comment-update")
        newUpdateBtn.setAttribute("id", comment_detail[0]['id'])
        newUpdateBtn.setAttribute("onclick", `updateComment(this)`)
        newUpdateBtn.innerText = "수정"
        newCommentUser.append(newUpdateBtn)
    }
}}

async function updateComment(comment)  {
    let a;
    const comment_id = Number(comment.id)
    const comment_detail = await CommentDetailView(commentId)

    for(let i=0; i < comment_detail.length; i++){
        if(comment_detail[i]['id'] === comment_id ){
            a = comment_detail[i]['content']
        }
    }
    let update_comment = prompt('수정할 댓글을 적어주세요', a);
    await updatecommentView(songId, comment_id, update_comment)
  }

async function deleteComment(comment) {
    const commentId = comment.id
    await deletecommentView(songId, commentId)
}

async function deleteVoice(voice) {
    const voiceId = voice.id
    await deletevoiceView(songId, voiceId)
}

