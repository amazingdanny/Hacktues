pas = document.getElementById("password")
confirm_pas = document.getElementById("confirm_password")
user = document.getElementById("user")
email = document.getElementById("email-address")


if(pas.value == confirm_pas.value){
    let res = await fetch("http//secureu.network:8080/registration",{
        method: "POST",
        body: JSON.stringify({
            "username" : user,
            "email" : email,
            "password" : pas
        
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    if(res.status == 0){
        window.location.replace("index.html");
        
    }
}