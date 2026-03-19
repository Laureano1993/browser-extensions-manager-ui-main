const body = document.querySelector("body");
const switchBtn = document.querySelector(".nav__switch");
const icon = document.querySelector("#icon-switch");
const logo = document.querySelector("#logo");
let darkMode = false;
switchBtn.addEventListener("click", () => {
    if (darkMode === false) {
        icon.setAttribute("src", "assets/images/icon-sun.svg");
        logo.setAttribute("src", "assets/images/logo-white.svg");
        darkMode = true;
    }
    else {
        icon.setAttribute("src", "assets/images/icon-moon.svg");
        logo.setAttribute("src", "assets/images/logo.svg");
        darkMode = false;
    }
    body.classList.toggle("dark-mode");
});
