
let key; 
async function generate_key(){
    key = await window.crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",

    },
    true,
    ["encrypt", "decrypt"]
    );
}
async function encryption(data){
    if (key)
    {
        console.log(key)
        let encrypted = await window.crypto.subtle.encrypt("RSA-OAEP", key.publicKey, data);
        return encrypted;
    }
    return 0;
}
async function decryption(data){
    if (key)
    {
        let decrypted = await window.crypto.subtle.decrypt("RSA-OAEP", key.privateKey, data);
        return decrypted;
    }
    return 0
}

/*async function main(){
    await generate_key()
    let enc = new TextEncoder("utf-8");
    let encrypted = await encryption(enc.encode("test"))
    enc = new TextDecoder("utf-8");
    console.log(enc.decode(encrypted))
    encrypted = await decryption(encrypted)
    console.log(enc.decode(encrypted))
}
main()
*/
function password_checker(password){
    let timeout;
    let strengthBadge //kato go addvwash w site-a mahni teq dwete
    //let password = document.getElementById('PassEntry');
    //let strengthBadge = document.getElementById('StrengthDisp');
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    if(strongPassword.test(password)) {
        //strengthBadge.style.backgroundColor = "green";
        //strengthBadge.textContent = 'Strong';
        return  "strong";
    } else if(mediumPassword.test(password)) {
        //strengthBadge.style.backgroundColor = 'blue';
        //strengthBadge.textContent = 'Medium';
        return "medium";
    } else {
        //strengthBadge.style.backgroundColor = 'r ed';
        //strengthBadge.textContent = 'Weak';
        return "weak";
    }
}
/*function main(){
    console.log(password_checker("Passw0r!dg4@"))
}
main()
*/