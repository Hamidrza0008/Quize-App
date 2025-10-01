
document.addEventListener("DOMContentLoaded" , () => {
    let helloUser = document.getElementById("hello-user");
    let username = localStorage.getItem("userName")
    console.log(username)
    helloUser.innerHTML = "Hello,  " + username
})