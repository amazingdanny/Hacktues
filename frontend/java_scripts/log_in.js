const email = document.getElementById("email-address")
const pas = document.getElementById("password")

let res = await fetch("http//localhost:8080/login",{
        method: "POST",
        body: JSON.stringify({
            "email" : email.value,
            "password" : pas.value
        
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    if(res.status == 0){
        window.location.replace("home_page.html");
        
    }