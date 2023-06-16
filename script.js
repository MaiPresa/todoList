let todoCardContainer = document.querySelector("main");

let cardList = JSON.parse(localStorage.getItem("cardListData")) || [];


function paintCard(cardObject) {
    let todoCard = document.createElement("div");
    let inputCard = document.createElement("input");
    let inputCheckbox = document.createElement("input");
    let buttonDelete = document.createElement("button");
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCard.placeholder = "Escribe aquí";

    inputCheckbox.checked = cardObject.checked;
    inputCard.style.textDecoration = cardObject.checked ? "line-through" : "none";

    inputCheckbox.addEventListener("change", () => {
        cardObject.checked = inputCheckbox.checked;
        inputCard.style.textDecoration = cardObject.checked ? "line-through" : "none"; 
        localStorage.setItem("cardListData", JSON.stringify(cardList));
    })

    inputCard.value = cardObject.inputText;

    inputCard.addEventListener("input", (event) => {
        cardObject.inputText = inputCard.value;
        localStorage.setItem("cardListData", JSON.stringify(cardList));
    })

    buttonDelete.innerHTML = "X";
    buttonDelete.addEventListener("click", () => {
        todoCard.remove();
        cardList.splice(cardList.indexOf(cardObject), 1);
        localStorage.setItem("cardListData", JSON.stringify(cardList));
    })

    todoCard.className = "cardStyle " + cardObject.class;
    todoCard.appendChild(inputCheckbox);
    todoCard.appendChild(inputCard);
    todoCard.appendChild(buttonDelete);
    todoCardContainer.appendChild(todoCard);

}


 cardList.forEach((cardObject) => {
    paintCard(cardObject);
 });



function createCard(className) {
    let cardObject = {
        class: className,
        inputText: "",
        checked: false,
    }
    paintCard(cardObject);

    cardList.push(cardObject);

    localStorage.setItem("cardListData", JSON.stringify(cardList));
}


document.getElementById("studies").addEventListener("click", () => {
    createCard("studiesCard");
    
});

document.getElementById("work").addEventListener("click", () => {
    createCard("workCard");
});

document.getElementById("home").addEventListener("click", () => {
    createCard("homeCard");
});


