const pas = document.getElementById("password")
const confirm_pas = document.getElementById("confirm_password")
const user = document.getElementById("user")
const email = document.getElementById("email-address")
const data = {
    "username" : user.value,
    "email" : email.value,
    "password" : pas.value
}

const button = document.getElementById("signin");
button.onclick = () => {
    if(pas.value == confirm_pas.value){
        fetch("http://localhost:8080/registration",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (response.code === 1){
                //location.href("/frontend/htmls/home_page.html");
                window.location = "/frontend/htmls/home_page.html";
            }    
        })
    }
}