
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
    let strengthBadge //kato go addvwash w site-a mahni teq dwete i otkomentriraj wsichko
    //let password = document.getElementById('PassEntry');
    //let strengthBadge = document.getElementById('StrengthDisp');
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    if(strongPassword.test(password)) {
        //strengthBadge.style.backgroundColor = "green";
        //strengthBadge.textContent = 'Strong';
        return  "strong";
    } else if(mediumPassword.test(password)) {
        //strengthBadge.style.backgroundColor = 'yello w';
        //strengthBadge.textContent = 'Medium';
        return "medium";
    } else {
        //strengthBadge.style.backgroundColor = 'red';
        //strengthBadge.textContent = 'Weak';
        return "weak";
    }
}
/*function main(){
    console.log(password_checker("Passw0r!dg4@"))
}
main()
*/
function password_generator(){
    let password = ''
    let length = 15
    const chars = "0123456789abcdefghijklmnopqrstuvxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVXYZ"
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (i = 0; i < length; i++)
    {
        password += chars[array[i] % chars.length];
    }
    return password
}
/*function main(){
    console.log(password_generator());
}
main()
*/
getkey = document.getElementById("key")
console.log(getkey)
getkey.onclick = () =>
{
    console.log("key yay")
    generate_key()
}
console.log(getkey)
let Elem = document.getElementById("Enter_encrypting")
let Elem2 = document.getElementById("\f")
Elem.onchange = () => {
    Elem2.val = encryption((Elem.val))
}

Elem = document.getElementById("Enter_decrypting")
Elem2 = document.getElementById("Output_decrypting")
Elem.onchange = () => {
    Elem2.val = decryption((Elem.val))
}
