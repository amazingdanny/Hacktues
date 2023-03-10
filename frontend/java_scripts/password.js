document.addEventListener("DOMContentLoaded", (event) =>{
    let password = document.getElementById("PassEntry");

    password.onkeydown = () => {
        let strengthBadge = document.getElementById("StrengthDisp");
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
        if(strongPassword.test(password.value)) {
            strengthBadge.style.backgroundColor = "green";
            strengthBadge.value = 'Strong';
        } else if(mediumPassword.test(password.value)) {
            strengthBadge.style.backgroundColor = 'yellow';
            strengthBadge.value = 'Medium';
        } else {
            strengthBadge.style.backgroundColor = 'red';
            strengthBadge.value = 'Weak';
        }
    }
    pass_generator = document.getElementById("Generate_Pass")
    generated_pass = document.getElementById("Generated_pass")
        pass_generator.onclick = () =>{
        let password = ''
        let length = 20
        const chars = "0123456789abcdefghijklmnopqrstuvxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVXYZ"
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        for (i = 0; i < length; i++)
        {
            password += chars[array[i] % chars.length];
        }
        generated_pass.value = password
    }
});