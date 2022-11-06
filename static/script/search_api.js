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
                                        <img src="${item.image}" alt="/">
                                        <div class="img-overlay text-white text-center">
                                            <a href="album-single.html">
                                                <div class="figcaption mt-3">
                                                    <i class="icon-link s-48"></i>
                                                    <h5 class="mt-5">${item.title}</h5>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="figure-title text-center p-2">
                                            <h5>${item.title}</h5>
                                            <div>${item.singer}</div>
                                            <div>${item.genre}</div>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        `
                    )
                // console.log(element.title)
                // const newArticle = document.createElement("div")
                // newArticle.innerText = element.title
                // articles.appendChild(newArticle)

                // const newArticle1 = document.createElement("div")
                // newArticle1.innerText = element.singer
                // articles.appendChild(newArticle1)

                // const newArticle2 = document.createElement("div")
                // newArticle2.innerText = element.genre
                // articles.appendChild(newArticle2)

                // const x = document.createElement("IMG");
                
                // x.setAttribute("src", element.image);
                // console.log(element.image)
                // x.setAttribute("width", "265");
                
                // x.setAttribute("height", "265");
                
                // x.setAttribute("alt", "랜덤짤");
                
                // articles.appendChild(x)
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


