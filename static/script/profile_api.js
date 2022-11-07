//로그인 확인
function service(){
  const storge = localStorage.getItem("payload");
  if (storge){}else{
    alert("로그인을 해주세요.")
    location.replace('user.html')
  } 
}
service();
  

const backendBaseUrl = "http://127.0.0.1:8000"
const frontendBaseUrl = "http://127.0.0.1:5500"

//프로필 정보
async function Profile() {
  const response = await fetch(`${backendBaseUrl}/users/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access")
    }

  })
  response_json = await response.json()
  const h4_profile_nickname = document.getElementById("profile_nickname")
  const h4_profile_email = document.getElementById("profile_email")

  h4_profile_email.innerText = response_json.email
  h4_profile_nickname.innerText = response_json.nickname

  document.getElementById("profile_image").src = `${backendBaseUrl}${response_json.profile_image}`
}

Profile()

// 회원탈퇴
async function withdrawal() {
    var delConfirm = confirm("정말 회원 탈퇴를 진행하시겠습니까?")
    if (delConfirm) {
      const response = await fetch(`${backendBaseUrl}/users/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access")
        }
      })

    withdrawal_json = await response.json()
    if (response.status === 200) {
    alert(withdrawal_json["message"])
    localStorage.removeItem("payload")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    location.replace('user.html')    }
    }
  }

//회원수정
async function ProfileEdit() {

  let image = document.querySelector("#id_photo")
  let nickname = document.getElementById("nickname").value
  let profile_image = image.files[0]
  let formData = new FormData()

  formData.append("profile_image", profile_image)
  formData.append("nickname", nickname)
  
  const response = await fetch(`${backendBaseUrl}/users/`, {
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access")
    },
    body: formData
  })

  const result = await response.json()

    if (response.status === 201) {
        alert("회원정보 수정이 완료되었습니다.")
        window.close()
        
    } else if (response.status === 400) {
        document.getElementById('alert-danger').style.display ="block"
        const key = Object.keys(result)[0];
        makeAlert(key, result[key][0]);
        
    }  else if(response.status == 403) {
      alert("접근이 불가능합니다.")
      window.location.replace(`user.html`)
  }
}

//비밀번호 변경을 위한 인증
async function ConfirmPassword() {

    const password =  document.getElementById("password").value
    const response = await fetch(`${backendBaseUrl}/users/changepassword/`,{
        headers:{
            'Content-type':'application/json',
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify(password)
    })

  const result = await response.json()

  if (response.status === 200) {
      alert("비밀번호 확인 완료")
      window.location.replace(`user_password_change.html`)
  } else if (response.status === 400) {
    alert("현재 비밀번호와 동일한 비밀번호를 입력해주세요")
  } 
}

//비밀번호 변경
async function ChangePassword() {

  const ChangePassowordData = {
    current_password: document.getElementById("current_password").value,
      repassword: document.getElementById("repassword").value,
      password: document.getElementById("password").value,
  }

  const response = await fetch(`${backendBaseUrl}/users/changepassword/`,{
      headers:{
          'Content-type':'application/json',
          "Authorization": "Bearer " + localStorage.getItem("access")
      },
      method: 'PUT',
      body: JSON.stringify(ChangePassowordData)
  })

  const result = await response.json()

  if (response.status === 201) {
      alert("비밀번호 변경 완료")
      localStorage.removeItem("payload")
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      window.close()

  } else if (response.status === 400) {
      document.getElementById('alert-danger').style.display ="block"
      const key = Object.keys(result)[0];
      makeAlert(key, result[key][0]);
      
  }
}

//에러 메시지
function makeAlert(key, errorText){
  if (document.getElementsByClassName("alert-danger")[0]){
      const alert_div = document.getElementsByClassName("alert-danger")[0];
      alert_div.innerText = `${errorText}`
  } else {
  const alert_div = document.createElement("div");
  const signup_form = document.getElementsByClassName("signup")[0];
  alert_div.setAttribute("class", "alert-danger");
  alert_div.innerText = `${errorText}`;
  const signup_button = signup_form.childNodes[8];
  signup_form.insertBefore(alert_div, signup_button); }
}

//새로운 창 뜨게하기
function ProfileEditNewTab() {
  window.open(`${frontendBaseUrl}/profile_edit.html`, "","width=600, height=600");
}
function ChangePasswordNewTab() {
  window.open(`${frontendBaseUrl}/user_password_confrim.html`, "","width=600, height=600");
}

//로그아웃
function handleLogout(){
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  localStorage.removeItem("payload")
  alert("로그아웃 완료")
  window.location.replace('user.html')
}