const pas = document.getElementById("password")
const confirm_pas = document.getElementById("confirm_password")
const user = document.getElementById("user")
const email = document.getElementById("email-address")


if(pas.value == confirm_pas.value){
    let res = await fetch("http//localhost:8080/registration",{
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
    if(res.status == 0){
        window.location.replace("index.html");
        
    }
}