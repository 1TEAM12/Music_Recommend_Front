window.onload = () => {
    console.log("접속 완료")
}





function songrecommend() {
    $('#songs-box2').empty()
    const song_id = 10
    $.ajax({
        type:"POST",
        url: "http://127.0.0.1:8000/songs/"+song_id+"/recommend/",
        data: {},
        success: function (response) {
            let rows = response
            for (let i = 0; i < rows.length; i++) {
                let title = rows[i]['title']
                let singer = rows[i]['singer']
                let image = rows[i]['image']
                let id = rows[i]['id']

                let temp_html = `<figure style="display:inline-block;margin:10px;">
                                    <a href="song_rcm.html">
                                    <div class="img-wrapper">
                                    <img src="${image}" style="width:300px;height:300px;"onerror="this.src='https://avatars.githubusercontent.com/u/114125954?s=200&v=4'">
                                        <div class="img-overlay text-white">
                                            <div class="figcaption">
                                                <ul class="list-inline d-flex align-items-center justify-content-between">
                                                    <li class="list-inline-item">
                                                        <a href="#" class="snackbar" data-text="Added to favourites"
                                                        data-pos="top-right"
                                                        data-showAction="true"
                                                        data-actionText="ok"
                                                        data-actionTextColor="#fff"
                                                        data-backgroundColor="#0c101b">
                                                            <i class="icon-heart-o s-18"></i>
                                                        </a>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <a href="album-single.html"><i
                                                                class="icon-more s-18 pt-3"></i></a></li>
                                                </ul>
                                                <div class="text-center mt-5">
                                                    <h5>${title}</h5>
                                                    <span>${singer}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="figure-title text-center p-2">
                                            <h5>${title}</h5>
                                            <span style="width:300px;">${singer}</span>
                                        </div>
                                    </div>
                                </figure>`
                                $('#songs-box2').append(temp_html)
                console.log(title, singer, image, id)
            }
        }
    })
}


$(document).ready(function(){
    songrecommend();
});