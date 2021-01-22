// Find and init DOM elements
const rollDiceButton = document.getElementById('rollDiceButton')
const holdButton = document.getElementById('holdButton')
const newGameButton = document.getElementById('newGameButton')

const player1Round = document.getElementById('player1Round')
const player1Global = document.getElementById('player1Global')

const player2Round = document.getElementById('player2Round')
const player2Global = document.getElementById('player2Global')


const diceValue = document.getElementById('diceValue')

// Declare Classes for Game and Players.
class Game {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.winner = null
    }

    newGame() {
        // New Game Method
    }

    randFirstPlayer() {
        // Rand to know who will play first.
    }

    gameOver() {
        // Game Over Method
    }
}

class Player {
    constructor() {
        this.roundScore = 0
        this.gloabalScore = 0
    }
    rollDice() {
        // Roll dice method
    }
    hold() {
        // Hold method
    }
}

player1 = new Player()
player2 = new Player()

game = new Game()

newGameButton.addEventListener('click', () => {
    // new game event
})

rollDiceButton.addEventListener('click', () => {
    // player roll event
})

holdButton.addEventListener('click', () => {
    // player hold event
})