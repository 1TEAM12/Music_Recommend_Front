window.onload = () => {
    console.log('실행');
}



function sendSearchKeyword(){
    var inputValue = document.getElementById('keyword').value;
    console.log(inputValue);
    window.location.href = `/search.html?keyword=${inputValue}`;
}


async function searchParam(){
    let getLink = window.location.search;
    let getLink_Name = getLink.split('=');
    let getLink_result = getLink_Name[1]
    let decodeResult = decodeURI(getLink_result);
    console.log(decodeResult);


    if(decodeResult){
        const response = await fetch(`http://127.0.0.1:8000/songs/search?keyword=${decodeResult}`,{
                headers:{
                    'content-type':'application/json',      
            },
            method:'GET',
        })
            response_json = await response.json()

        if(response_json.length){
                const articles = document.getElementById("articles")
                console.log(response_json)
                while (articles.firstChild) {
                    articles.removeChild(articles.firstChild);
                }


                response_json.forEach(item => {
                    $('#articles').append(
                        `
                        <div class="col-lg-3 col-md-4 col-sm-6 my-2">
                                <figure>
                                    <div class="img-wrapper">
                                        <img src="${item.image}" onerror="this.src='../assets/img/demo/a7.jpg'" alt="/">
                                        <div class="img-overlay text-white text-center">
                                            <a href="song_detail.html">
                                                <div class="figcaption mt-3">
                                                    <i class="icon-link s-48"></i>
                                                    <h5 class="mt-5">${item.title}</h5>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="figure-title text-center p-2">
                                            <h5 class="text_reduce">${item.title}</h5>
                                            <div class="text_reduce">${item.singer}</div>
                                            <div class="text_reduce">${item.genre}</div>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        `
                    )
                
                });  
                
        }else{
            alert(`${decodeResult} 검색내용이 없습니다!`);
        }
    }else{
        alert(`검색내용을 입력해주세요!`);
    }
}

function enterkey(e) {
    if (window.event.keyCode == 13){
        sendSearchKeyword().then();
    }
}


