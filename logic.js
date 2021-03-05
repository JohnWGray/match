document.addEventListener('DOMContentLoaded', () => {
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
        }
    ]

    // Radomize card order when page loads
    cardArray.sort(() => 0.5 - Math.random())

    // Sets this grid var to the grid class in the index. Notice the .grid because it's a class. 
    // Sets resultDisplay var to #result in the index. Notice the # because it's an id.
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
    // #3: Adds the 'cardback' image to every new img element.
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
            setTimeout(checkForMatch, 500)
        }
    }

    //////////check for matches//////////////
    //(IT'S CHECKING IF THE 'name' FOR EACH CARD MATCHES)

    // #1:
    // #2:
    // #3: 
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        //If the same square is chosen.
        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/fire.png')
            cards[optionTwoId].setAttribute('src', 'images/fire.png')
            alert('You have clicked the same image!')
        }
        // Or if you find a match.
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match')
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/fire.png')
            cards[optionTwoId].setAttribute('src', 'images/fire.png')
            alert('Sorry, try again')
        }
        //These will happen regardless of what happens. 

        // #1: Set cardsChosen to an empty array (resetting it)
        // #2: Set cardsChosenId to an empty array (resetting it)
        // #3: Sets the textConent(same idea as innerhtml) of resultDisplay to the # of cards won/matched. 
        // #4: Checks if you got all the cards. (Still figuring it out) 

        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            headingDisplay.textContent = 'Congratulations! You found them all!'

        }
    }
    // Initializes the createBoard function. So it runs automatically when the page loads. 
    createBoard()
})

