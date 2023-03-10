
let key = {}; 
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
        let encrypted = await window.crypto.subtle.encrypt("RSA-OAEP", key.publicKey, data);
        return encrypted;
    }
    return 0;
}
async function decryption(data){

    let decrypted = await window.crypto.subtle.decrypt({name: "RSA-OAEP"}, key.privateKey, data);
    return decrypted;


}

async function main(){
    await generate_key()
    let enc = new TextEncoder("utf-8");
    let encrypted = await encryption(enc.encode("test"))
    enc = new TextDecoder("utf-8");
    encrypted = await decryption(encrypted)
}

function b64toab(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
function ab2str(buf) {
    return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}

document.addEventListener("DOMContentLoaded", (event) =>{
    try{
        let enc = new TextEncoder("utf-8");
        let enc2 = new TextDecoder("utf-8");
        const getkey = document.getElementById("key")
        getkey.onclick = async () =>
        {
            await generate_key()
            outputPrivateKey = document.getElementById("Output_private_key")
            outputPublicKey = document.getElementById("Output_public_key")
            outputPrivateKey.value = ab2str(await window.crypto.subtle.exportKey("pkcs8", key.privateKey));
            outputPublicKey.value = ab2str(await window.crypto.subtle.exportKey("spki", key.publicKey));
        }
        const enter_Public_Key = document.getElementById("Enter_Public_Key")
        const enter_Private_Key = document.getElementById("Enter_Private_Key")
        async function importPublicKey(pem){
            const binaryDer = b64toab(pem);

            return window.crypto.subtle.importKey(
                "spki",
                binaryDer,
                {
                name: "RSA-OAEP",
                hash: "SHA-256",
                },
                true,
                ["encrypt"]
            );
        }
        async function importPrivateKey(pem) {    
 
            const binaryDer = b64toab(pem);

            return await window.crypto.subtle.importKey(
                "pkcs8",
                binaryDer,
                {
                name: "RSA-OAEP",
                hash: "SHA-256",
                },
                true,
                [ "decrypt "]
            );
        }
        enter_Public_Key.onkeydown = async () =>{
            key.publicKey = await importPublicKey(enter_Public_Key.value)
        }
        enter_Private_Key.onkeydown = async () =>{
            key.privateKey = await importPrivateKey(enter_Private_Key.value)
        }
        const encryptInput = document.getElementById("Enter_encrypting")
        const encryptOutput = document.getElementById("Output_encrypting")
        let decrypt_elem 
        encryptInput.onkeydown = async () => {
            decrypt_elem = await encryption(enc.encode(encryptInput.value))
            encryptOutput.value = ab2str(decrypt_elem)
        }

        const decryptInput = document.getElementById("Enter_decrypting")
        const decryptOutput = document.getElementById("Output_decrypting")
        decryptInput.onkeydown = async () => {
            decryptOutput.value = enc2.decode(await decryption(b64toab(decryptInput.value)))
        }

    }
    catch(error){
        err = document.getElementById("Error")``
        err.textContent = "There is an error"
        err.style.color = "red"
    }

})