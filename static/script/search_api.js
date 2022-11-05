window.onload = () => {
    console.log('실행');
}
async function searchclick(){
    var inputValue = document.getElementById('keyword').value;
    console.log(inputValue);
    if(inputValue){
        const response = await fetch(`http://127.0.0.1:8000/songs/search/?keyword=${inputValue}`,{
                headers:{
                    'content-type':'application/json',
            },
            method:'GET',
        })
            response_json = await response.json()
            console.log(response_json)
        if(response_json.length){
                const articles = document.getElementById("articles")
                console.log(response_json)
                while (articles.firstChild) {
                    articles.removeChild(articles.firstChild);
                }
                response_json.forEach(element => {
                // console.log(element.title)
                const newArticle = document.createElement("div")
                newArticle.innerText = element.title
                articles.appendChild(newArticle)
                const newArticle1 = document.createElement("div")
                newArticle1.innerText = element.singer
                articles.appendChild(newArticle1)
                const newArticle2 = document.createElement("div")
                newArticle2.innerText = element.genre
                articles.appendChild(newArticle2)
                const x = document.createElement("IMG");
                x.setAttribute("src", element.image);
                console.log(element.image)
                x.setAttribute("width", "265");
                x.setAttribute("height", "265");
                x.setAttribute("alt", "랜덤짤");
                articles.appendChild(x)
                });
        }else{
            alert(`${inputValue} 검색내용이 없습니다!`);
        }
    }else{
        alert(`검색내용을 입력해주세요!`);
    }
}
function enterkey(e) {
    if (window.event.keyCode == 13){
        searchclick().then();
    }
}