document.addEventListener("DOMContentLoaded", (even) =>{
    const BAC = document.getElementById("BAC")
    const Cr_fail = document.getElementById("Cr_fail")
    const inject = document.getElementById("inj")
    const Insec_design = document.getElementById("insec_des")
    const Sec_misconfig = document.getElementById("Sec_misconfig")
    const SSRF = document.getElementById("SSRF")
    const SLMF = document.getElementById("SLMF")
    const IAF = document.getElementById("IAF")
    const VOC = document.getElementById("VOC")




    document.querySelectorAll(".buttons").forEach(element => {
        console.log("ok")
        element.onclick = () =>{
            document.querySelectorAll(".divs").forEach(object =>{
                console.log("ok ok")
                console.log(object.id, element.dataset.showdiv)
                if(object.id == element.dataset.showdiv)
                {
                    console.log("ok ok ok")
                    object.classList.remove("hidden")
                }
                else{
                    object.classList.add("hidden")
                }
            });
        };
    });
})
