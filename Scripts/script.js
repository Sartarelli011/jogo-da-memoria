const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame() {
    initializeCards(game.createCardsFromallTechs())
}

function initializeCards() {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = ''

    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon
        createContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)

    })

}

function createContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {

        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = `./Assets/images/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    }
    else {
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace)
}






function flipCard() {


    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.secondCard) {
            if (game.checkMath()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex'
                }
            }
            else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 700)
            }
        }
    }
}

function restart() {
    game.clearCards()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = 'none'
    startGame()
    
}