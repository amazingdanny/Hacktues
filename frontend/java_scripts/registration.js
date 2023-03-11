const pas = document.getElementById("password")
const confirm_pas = document.getElementById("confirm_password")
const user = document.getElementById("user")
const email = document.getElementById("email-address")

function signIn(){
    if(pas.value == confirm_pas.value){
        fetch("http://localhost:8080/registration",{
            method: "POST",
            body: JSON.stringify({
                "username" : user.value,
                "email" : email.value,
                "password" : pas.value
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            console.log(response)
            if (response.code === 1){
                window.location = "/frontend/htmls/home_page.html";
            }    
        })
        
    }
}