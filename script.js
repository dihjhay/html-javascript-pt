const board = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartBtn");

let symbols = [
"A","A","B","B","C","C","D","D",
"E","E","F","F","G","G","H","H"
];

let firstCard = null;
let secondCard = null;
let locked = false;

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createBoard(){

    board.innerHTML = "";

    shuffle(symbols);

    for(let i=0;i<symbols.length;i++){

        let card = document.createElement("div");
        card.className = "card";
        card.dataset.value = symbols[i];

        card.addEventListener("click", function(){
            flipCard(card);
        });

        board.appendChild(card);
    }
}

function flipCard(card){

    if(locked) return;
    if(card === firstCard) return;

    card.textContent = card.dataset.value;
    card.classList.add("flipped");

    if(firstCard === null){
        firstCard = card;
        return;
    }

    secondCard = card;
    locked = true;

    checkMatch();
}

function checkMatch(){

    if(firstCard.dataset.value === secondCard.dataset.value){

        resetTurn();

    }else{

        setTimeout(function(){

            firstCard.textContent = "";
            secondCard.textContent = "";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        },1000);

    }
}

function resetTurn(){
    firstCard = null;
    secondCard = null;
    locked = false;
}

function restartGame(){
    resetTurn();
    createBoard();
}

restartButton.addEventListener("click", restartGame);

createBoard();