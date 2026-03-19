var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const list = document.querySelector(".list");
const btnAll = document.querySelector("#all");
const btnActive = document.querySelector("#active");
const btnInactive = document.querySelector("#inactive");
const buttonsStates = [btnAll, btnActive, btnInactive];
const extensions = [];
const getJSONFile = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield fetch("./data.json");
        const data = yield res.json();
        data.forEach(el => extensions.push(el));
    }
    catch (err) {
        console.log(err);
    }
});
const showExtensions = (arr) => {
    list.innerHTML = "";
    arr.forEach(extension => {
        list.insertAdjacentHTML("beforeend", `
            <div class="extension" id="${extension.name}">
                <div class="extension__info">
                    <div class="extension__info__icon">
                        <img src="${extension.logo}" alt="extension logo" />
                    </div>

                    <div class="extension__info__text">
                        <h4 class="name">${extension.name}</h4>
                        <p class="description">${extension.description}</p>
                    </div>
                </div>

                <div class="extension__buttons">
                    <button class="btn-remove">Remove</button>
                    <div class="extension__buttons__switch ${extension.isActive ? 'isActive' : "noActive"}">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>    
        `);
    });
    const switchBtn = document.querySelectorAll(".extension__buttons__switch");
    const removeBtn = document.querySelectorAll(".btn-remove");
    switchBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const target = e.target;
            const myTarget = target.closest(".extension__buttons__switch");
            const extensionDiv = myTarget.closest(".extension");
            if (!extensionDiv)
                return;
            const index = extensions.findIndex(extension => extension.name === extensionDiv.id);
            if (index !== -1) {
                extensions[index].isActive = !extensions[index].isActive;
                myTarget.classList.toggle("isActive");
                myTarget.classList.toggle("noActive", !extensions[index].isActive);
            }
        });
    });
    removeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const button = e.target;
            const extensionDiv = button.parentElement.parentElement;
            const index = extensions.findIndex(extension => extension.name === extensionDiv.id);
            extensions.splice(index, 1);
            extensionDiv.remove();
        });
    });
};
const filterExtensions = (state) => {
    if (state === "active") {
        const filterActives = extensions.filter(extension => extension.isActive);
        showExtensions(filterActives);
    }
    else if (state === "inactive") {
        const filterInactives = extensions.filter(extension => extension.isActive === false);
        showExtensions(filterInactives);
    }
    else {
        showExtensions(extensions);
    }
};
btnActive.addEventListener("click", () => {
    buttonsStates.forEach(btn => btn.classList.remove("isSelected"));
    btnActive.classList.add("isSelected");
    filterExtensions("active");
});
btnInactive.addEventListener("click", () => {
    buttonsStates.forEach(btn => btn.classList.remove("isSelected"));
    btnInactive.classList.add("isSelected");
    filterExtensions("inactive");
});
btnAll.addEventListener("click", () => {
    buttonsStates.forEach(btn => btn.classList.remove("isSelected"));
    btnAll.classList.add("isSelected");
    filterExtensions("all");
});
const init = () => __awaiter(this, void 0, void 0, function* () {
    yield getJSONFile(); // Espera a que cargue el JSON
    showExtensions(extensions); // Renderiza
});
init();
