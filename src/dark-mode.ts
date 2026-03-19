const body = document.querySelector("body") as HTMLBodyElement;
const switchBtn = document.querySelector(".nav__switch") as HTMLDivElement;
const icon = document.querySelector("#icon-switch") as HTMLImageElement;
const logo = document.querySelector("#logo") as HTMLImageElement;
let darkMode = false;

switchBtn.addEventListener("click",()=> {
    if(darkMode === false){
        icon.setAttribute("src","assets/images/icon-sun.svg");
        logo.setAttribute("src","assets/images/logo-white.svg");
        darkMode = true
    }else{
        icon.setAttribute("src","assets/images/icon-moon.svg");
        logo.setAttribute("src","assets/images/logo.svg");
        darkMode = false
    }
    body.classList.toggle("dark-mode");
})
