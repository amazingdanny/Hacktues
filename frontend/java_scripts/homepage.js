
function pullDown(id, arrow) {
    const paragraph = document.getElementById(id);
    const arr = document.getElementById(arrow);
    if (arr.classList.contains("fa-circle-arrow-down")) {
      paragraph.style.height = paragraph.firstElementChild.offsetHeight + "px";
      arr.classList.remove("fa-circle-arrow-down");
      arr.classList.add("fa-circle-arrow-up");
      paragraph.style.removeProperty("box-shadow");
    }
    else{
        paragraph.style.height = "149px"
        arr.classList.remove("fa-circle-arrow-up");
        arr.classList.add("fa-circle-arrow-down");
        paragraph.style.boxShadow = "black 0px -80px 100px -50px inset"
    }
}  
document.addEventListener("DOMContentLoaded", (event) =>{
    function pullDown(id, arrow) {
        const paragraph = document.getElementById(id);
        console.log(paragraph)
        const arr = document.getElementById(arrow);
        if (arr.classList.contains("fa-circle-arrow-down")) {
        paragraph.style.height = paragraph.firstElementChild.offsetHeight + "px";
        console.log(paragraph.firstChild);
        arr.classList.remove("fa-circle-arrow-down");
        arr.classList.add("fa-circle-arrow-up");
        paragraph.style.removeProperty("box-shadow");
        }
        else {
        paragraph.style.height = '130px';
        arr.classList.remove("fa-circle-arrow-up");
        arr.classList.add("fa-circle-arrow-down");
        paragraph.style.boxShadow = "black 0px -60px 60px -50px inset";
        }
    }
})

function toggleMenu(id){
    const menu = document.getElementById(id);
    if(menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
    }
    else{
        menu.classList.add("hidden");
    }
}