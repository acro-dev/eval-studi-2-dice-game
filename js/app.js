// Find and init DOM elements
const rollDiceButton = document.getElementById("rollDiceButton")
const holdButton = document.getElementById("holdButton")
const newGameButton = document.getElementById("newGameButton")

const player1Round = document.getElementById("player1Round")
const player1Global = document.getElementById("player1Global")

const player2Round = document.getElementById("player2Round")
const player2Global = document.getElementById("player2Global")

const diceValue = document.getElementById("diceValue")

// Declare Classes for Game and Players.
class Game {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.currentPlayer = this.randFirstPlayer()
        this.winner = null
    }

    newGame() {
        this.player1.roundScore = 0
        this.player1.globalScore = 0
        this.player2.roundScore = 0
        this.player2.globalScore = 0
        this.currentPlayer = this.randFirstPlayer()
        this.winner = null

        return this
    }

    randFirstPlayer() {
        let rand = Math.round(Math.random())
        let firstPlayer = null
        rand == 0 ? (firstPlayer = this.player1) : (firstPlayer = this.player2)
        return firstPlayer
    }

    gameOver() {
        // Game Over Method
    }
}

class Player {
    constructor() {
        this.roundScore = 0
        this.globalScore = 0
    }
    rollDice() {
        // Roll dice method
        // We simulate a dice roll (random number between 1 and 6).
        let diceValue = Math.ceil(Math.random() * 6)
        console.log(`${this.name} get a ${diceValue}.`)

        return diceValue
    }
    hold() {
        // Hold the round score and add to global score.
        // Only if he roll dice at least once !
        if (this.roundScore > 0) {
            this.globalScore += this.roundScore

            // Then, reset is roundScore for the next turn.
            this.roundScore = 0

            return this.globalScore
        } else {
            return "Error : Your round score is null, cannot hold your score."
        }
    }
}

player1 = new Player()
player2 = new Player()

game = new Game(player1, player2)

newGameButton.addEventListener("click", () => {
    // new game event
})

rollDiceButton.addEventListener("click", () => {
    // player roll event
})

holdButton.addEventListener("click", () => {
    // player hold event
})
