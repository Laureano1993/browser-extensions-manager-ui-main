interface Extension {
    logo: string,
    name: string,
    description: string,
    isActive: boolean
}

const list = document.querySelector(".list");
const btnAll = document.querySelector("#all");
const btnActive = document.querySelector("#active");
const btnInactive = document.querySelector("#inactive");
const buttonsStates = [btnAll,btnActive,btnInactive];
const extensions: Extension[] = [];

const getJSONFile = async () => {
    try{
        const res = await fetch("./data.json");
        const data = await res.json();
        data.forEach(el => extensions.push(el))
    }catch(err){
        console.log(err);
    }
}

const showExtensions = (arr: Extension[]) => {
    list.innerHTML = "";
    arr.forEach(extension => {
        list.insertAdjacentHTML("beforeend",`
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
        `)
    })

    const switchBtn = document.querySelectorAll(".extension__buttons__switch") as NodeListOf<HTMLDivElement>;
    const removeBtn = document.querySelectorAll(".btn-remove") as NodeListOf<HTMLButtonElement>;

    switchBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const myTarget = target.closest(".extension__buttons__switch") as HTMLDivElement;
        
        const extensionDiv = myTarget.closest(".extension") as HTMLElement;
        
        if (!extensionDiv) return; 

        const index = extensions.findIndex(extension => extension.name === extensionDiv.id);

        if (index !== -1) {
            extensions[index].isActive = !extensions[index].isActive;
    
            myTarget.classList.toggle("isActive");
            myTarget.classList.toggle("noActive", !extensions[index].isActive);
        }
    });
});

    removeBtn.forEach(btn => {
        btn.addEventListener("click",(e)=> {
            const button = e.target as HTMLButtonElement; 
            const extensionDiv = button.parentElement.parentElement;
            const index = extensions.findIndex(extension => extension.name === extensionDiv.id);
            
            extensions.splice(index,1);
            extensionDiv.remove();
            
            
            
        })
    })
} 


const filterExtensions = (state: string) => {
    if(state === "active"){
        const filterActives: Extension[] = extensions.filter(extension => extension.isActive);
        showExtensions(filterActives);
    }else if(state === "inactive"){
        const filterInactives: Extension[] = extensions.filter(extension => extension.isActive === false);
        showExtensions(filterInactives);
    }else{
        showExtensions(extensions);
    }
}

btnActive.addEventListener("click",()=> {
    buttonsStates.forEach(btn => btn.classList.remove("isSelected"))
    btnActive.classList.add("isSelected");
    filterExtensions("active");
});
btnInactive.addEventListener("click",()=> {
    buttonsStates.forEach(btn => btn.classList.remove("isSelected"))
    btnInactive.classList.add("isSelected");
    filterExtensions("inactive");
});
btnAll.addEventListener("click",()=> {
    buttonsStates.forEach(btn => btn.classList.remove("isSelected"))
    btnAll.classList.add("isSelected");
    filterExtensions("all");
});

const init = async () => {
    await getJSONFile(); // Espera a que cargue el JSON
    showExtensions(extensions); // Renderiza
}

init();