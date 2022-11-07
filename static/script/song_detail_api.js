const songId = location.href.split('?')[1]
const commentId = location.href.split('?')[1]


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
        a_heart_btn.innerHTML = '<i class="icon-heart s-24" style="color:red;"></i>'
    } else {
        a_heart_btn.innerHTML = '<i class="icon-heart s-24"></i>'
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
    const auctionComments = document.getElementsByClassName("one-comment")[0]
    const span_comments_count = document.getElementById("comments_count")

    span_comments_count.innerText = comment_detail.count
    
    for (let i = 0; i < comment_detail['results'].length; i++) {

        const newCommentLayout = document.createElement("div")
        newCommentLayout.setAttribute("class", "bg-white p-2")
        auctionComments.prepend(newCommentLayout)

        const newCommentUser = document.createElement("div")
        newCommentUser.setAttribute("class", "d-flex flex-row user-info")
        newCommentLayout.append(newCommentUser)

        const newCommentUserInfo = document.createElement("div")
        newCommentUserInfo.setAttribute("class", "d-flex flex-column justify-content-start ml-2")
        newCommentUser.append(newCommentUserInfo)
        
        //프로필이미지
        const newCommentUserImage = document.createElement("img")
        let profile_image = comment_detail['results'][i]['profile_image']
        newCommentUserImage.setAttribute("src", `${backendBaseUrl}${profile_image}` )
        newCommentUserImage.setAttribute("class", "avatar avatar-md mr-3 mt-1" )
        newCommentUserInfo.append(newCommentUserImage)        

        //유저닉네임
        const newCommentUserName = document.createElement("span")
        newCommentUserName.setAttribute("class", "d-block font-weight-bold name")
        newCommentUserName.innerText = comment_detail['results'][i]['user']
        newCommentUserInfo.append(newCommentUserName)

        
        //댓글단 시간
        const newCommentTime = document.createElement("span")
        newCommentTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(comment_detail['results'][i]['created_at'])
        let time_before = time2str(time_post)

        newCommentTime.innerText = time_before
        newCommentUserInfo.append(newCommentTime)

        //댓글내용
        const newCommentArea = document.createElement("div")
        newCommentArea.setAttribute("class", "mt-2")
        newCommentLayout.append(newCommentArea)

        const newCommentText = document.createElement("p")
        newCommentText.setAttribute("class", "comment-text")
        newCommentText.innerText = comment_detail['results'][i]['content']
        newCommentArea.append(newCommentText)

        //삭제 버튼
        if(comment_detail['results'][i]['user'] == user_id['nickname'] ){
        const newDeleteBtn = document.createElement("button")
        newDeleteBtn.setAttribute("class", "comment-delete")
        newDeleteBtn.setAttribute("id", comment_detail['results'][i]['id'])
        newDeleteBtn.setAttribute("onclick", "deleteComment(this)")
        newDeleteBtn.innerText = "삭제"
        newCommentUser.append(newDeleteBtn)

        //수정 버튼
        const newUpdateBtn = document.createElement("button")
        newUpdateBtn.setAttribute("class", "comment-update")
        newUpdateBtn.setAttribute("id", comment_detail['results'][i]['id'])
        newUpdateBtn.setAttribute("onclick", `updateComment(this)`)
        newUpdateBtn.innerText = "수정"
        newCommentUser.append(newUpdateBtn)
    }
}}

loadSongs()
loadComments()

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
        let profile_image = comment_detail['results'][0]['profile_image']
        newCommentUserImage.setAttribute("src", `${backendBaseUrl}${profile_image}` )
        newCommentUserImage.setAttribute("class", "avatar avatar-md mr-3 mt-1" )
        newCommentUserInfo.append(newCommentUserImage)

        //유저닉네임
        const newCommentUserName = document.createElement("span")
        newCommentUserName.setAttribute("class", "d-block font-weight-bold name")
        newCommentUserName.innerText = comment_detail['results'][0]['user']
        newCommentUserInfo.append(newCommentUserName)

        //댓글단 시간
        const newCommentTime = document.createElement("span")
        newCommentTime.setAttribute("class", "date text-black-50")

        let time_post = new Date(comment_detail['results'][0]['created_at'])
        let time_before = time2str(time_post)

        newCommentTime.innerText = time_before
        newCommentUserInfo.append(newCommentTime)
        //댓글내용
        const newCommentArea = document.createElement("div")
        newCommentArea.setAttribute("class", "mt-2")
        newCommentLayout.append(newCommentArea)

        const newCommentText = document.createElement("p")
        newCommentText.setAttribute("class", "comment-text")
        newCommentText.innerText = comment_detail['results'][0]['content']
        newCommentArea.append(newCommentText)

        //삭제 버튼
        if(comment_detail['results'][0]['user'] == user_id['nickname'] ){
        const newDeleteBtn = document.createElement("button")
        newDeleteBtn.setAttribute("class", "comment-delete")
        newDeleteBtn.setAttribute("id", comment_detail['results'][0]['id'])
        newDeleteBtn.setAttribute("onclick", `deleteComment(this)`)
        newDeleteBtn.innerText = "삭제"
        newCommentUser.append(newDeleteBtn)

        //수정 버튼
        const newUpdateBtn = document.createElement("button")
        newUpdateBtn.setAttribute("class", "comment-update")
        newUpdateBtn.setAttribute("id", comment_detail['results'][0]['id'])
        newUpdateBtn.setAttribute("onclick", `updateComment(this)`)
        newUpdateBtn.innerText = "수정"
        newCommentUser.append(newUpdateBtn)
    }
}}



async function updateComment(comment)  {
    let a;
    const comment_id = Number(comment.id)
    const comment_detail = await CommentDetailView(commentId)

    for(let i=0; i < comment_detail['results'].length; i++){
        if(comment_detail['results'][i]['id'] === comment_id ){
            a = comment_detail['results'][i]['content']
        }
    }
    let update_comment = prompt('수정할 댓글을 적어주세요', a);
    await updatecommentView(songId, comment_id, update_comment)
  }

async function deleteComment(comment) {
    const commentId = comment.id
    await deletecommentView(songId, commentId)

    const commentArea = comment.parentNode.parentNode
    console.log(commentArea)
    commentArea.remove();
}
