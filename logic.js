/////////////////////////   Start of Program  ///////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#heading").style.visibility = "hidden";
    document.querySelector("#timer").style.visibility = "hidden";
    document.querySelector(".reset").style.visibility = "hidden";
    document.querySelector(".difficulty").style.visibility = "visible";
})


/////  Reset the page ////////

function restart() {

    location.reload()
}

/////// Timer Logic  /////////

var min;
var sec;

function setEasy() {
    document.querySelector(".difficulty").style.visibility = "hidden";
    document.querySelector("#heading").style.visibility = "visible";
    document.querySelector("#timer").style.visibility = "visible";
    sec = 180;
}

function setMedium() {
    document.querySelector(".difficulty").style.visibility = "hidden";
    document.querySelector("#heading").style.visibility = "visible";
    document.querySelector("#timer").style.visibility = "visible";
    sec = 130;
}

function setHard() {
    document.querySelector(".difficulty").style.visibility = "hidden";
    document.querySelector("#heading").style.visibility = "visible";
    document.querySelector("#timer").style.visibility = "visible";
    sec = 100;
}

setInterval(function () {

    document.getElementById("timer").innerHTML = sec;
    sec--;

    if (sec == 0) {
        document.querySelector("#timer").style.visibility = "hidden";
        document.querySelector(".grid").style.visibility = "hidden";
        headingDisplay.textContent = 'YOU LOST!';
        document.querySelector(".reset").style.visibility = "visible";

    }
}, 700);

//card options
const cardArray = [
    {
        name: 'dog',
        img: 'images/dog.png'
    },
    {
        name: 'dog',
        img: 'images/dog.png'
    },
    {
        name: 'tree',
        img: 'images/tree.png'
    },
    {
        name: 'tree',
        img: 'images/tree.png'
    },
    {
        name: 'tack',
        img: 'images/tack.png'
    },
    {
        name: 'tack',
        img: 'images/tack.png'
    },
    {
        name: 'school',
        img: 'images/school.png'
    },
    {
        name: 'school',
        img: 'images/school.png'
    },
    {
        name: 'butterfly',
        img: 'images/butterfly.png'
    },
    {
        name: 'butterfly',
        img: 'images/butterfly.png'
    },
    {
        name: 'eclipse',
        img: 'images/eclipse.png'
    },
    {
        name: 'eclipse',
        img: 'images/eclipse.png'
    },

    {
        name: 'flower',
        img: 'images/flower.png'
    },

    {
        name: 'flower',
        img: 'images/flower.png'
    },

    {
        name: 'sunset',
        img: 'images/sunset.png'
    },

    {
        name: 'sunset',
        img: 'images/sunset.png'
    },

    {
        name: 'kitty',
        img: 'images/kitty.png'
    },

    {
        name: 'kitty',
        img: 'images/kitty.png'
    },

    {
        name: 'old',
        img: 'images/old.png'
    },

    {
        name: 'old',
        img: 'images/old.png'
    }
]

// Radomize card order when page loads
cardArray.sort(() => 0.5 - Math.random())

// Sets this 'grid' var to the grid class in the index. Notice the .grid because it's a class. 
// Sets 'resultDisplay' var to #result in the index. Notice the # because it's an id.
// Sets headingDisplay to #heading in the index. 
// Makes 3 empty arrays for cards chosen, the chosen id, and cards that are matched/won. 

const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
const headingDisplay = document.querySelector('#heading')
let cardsChosen = []
let cardsChosenId = []
let cardsWon = []

/////////////create board////////////

// #1: Makes board using cardArray as length for the # of iterations on the for loop.
// #2: Creates and sets 'card' to a newly created img element for each iteration.
// #3: Adds the 'fire' image to every new img element.
// #4: Gives each 'card' an id via 'data-id' which is set to i. So each one will be different.
// #5: Adds an event listener for a click, and then runs flipCard if they are clicked.
// #6: Since these are img elements, we use appendChild(card) to the grid.  

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/fire.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
}

/////////////flip the card////////////
//(HAPPENS ON EVERY CLICK)

// #1: Creates and sets cardId to data-id via from this.getAttribute. 'this' refers globally here.
// #2: Pushes cards from cardArray to cardsChosen array based on the cardId. Then get its name.
// #3: Pushes the cardId to the cardsChosenId array.
/* #4: Because flipCard is already in function, we technically already have card picked, 
         this setAttribute will add an image to the square based on the card id it holds */
// #5: If there are 2 entrys in cardsChosen array, (via .length) call checkForMatch, and timeout of 500 ms.
function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 200)
    }
}

//////////check for matches//////////////
//(IT'S CHECKING IF THE 'name' FOR EACH CARD MATCHES)

/* #1: Makes 'cards' and sets it to all 'img' elements in the DOM. This will be used 
as a conduit to change the card images when needed. Particularly when comparing the ids. */
// #2: Makes 'optionOneId and sets it to the 1st element in the cardsChosenId array.
// #3: Makes 'optionTwoId and sets it to the 2st element in the cardsChosenId array.
function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

    //If the same square is chosen.
    // #1: Checks if the optionIds are equal.
    // #2: If the same,  reset attributes of the optionIds to the fire image. 
    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/fire.png')
        cards[optionTwoId].setAttribute('src', 'images/fire.png')

    }
    // Or if you find a match.
    /* #1: Checks if 1st element is 'strictly' equal to 2nd element in cardsChosen array.(same type & Value)
    THIS IS CARDS CHOSEN, NOT CHOSEN ID, ITS DIFFERENT*/
    // #2: Sets optionIds to 'blank image', simulating that they are gone. They are still technically there.
    // #3: Removes eventListeners for the optionIds, so you clicking on them doesnt do anything.  
    // #4: Push the cards in cardsChosen to cardswon array. 
    // #5: Sets the OptionIds to fire image for any other potential scenerio.  
    else if (cardsChosen[0] === cardsChosen[1]) {

        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/fire.png')
        cards[optionTwoId].setAttribute('src', 'images/fire.png')

    }

    //These will occur regardless of what happens. (We're Still in checkformatch() function)

    // #1: Set cardsChosen to an empty array (resetting it)
    // #2: Set cardsChosenId to an empty array (resetting it)
    // #3: Sets the textConent(same idea as innerhtml) of resultDisplay to the # of cards won/matched. 
    /* #4:  Since there are only 6 orignal cards, if the cards won (6) is equal 
    to the cardArray length(12)/2 (which is 6) then logically that means the player won.  */
    // #5: Sets the textContent of headingDisplay to the congrats text. 
    // #6: Hides the grid to get it out of the way. 

    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
        headingDisplay.textContent = 'YOU WON!'
        document.querySelector(".grid").style.visibility = "hidden";
        document.querySelector("#timer").style.visibility = "hidden";
        document.querySelector(".reset").style.visibility = "visible";

    }
}