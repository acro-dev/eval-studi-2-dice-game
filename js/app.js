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
        firstPlayer.turn = true
        return firstPlayer
    }

    changePlayer() {
        if (!this.currentPlayer.turn) {
            // Switch between the 2 players.
            this.currentPlayer == this.player1
                ? (this.currentPlayer = this.player2)
                : (this.currentPlayer = this.player1)
            this.currentPlayer.turn = true
        }

        return this.currentPlayer
    }

    gameOver() {
        // Game Over Method
    }
}

class Player {
    constructor() {
        this.roundScore = 0
        this.globalScore = 0
        this.turn = false
    }
    rollDice() {
        // Roll dice method
        // We simulate a dice roll (random number between 1 and 6).
        let diceValue = Math.ceil(Math.random() * 6)

        // If dice value = 1, the round is over and player loose his current stack.
        if (diceValue == 1) {
            this.roundScore = 0
            this.turn = false
        }
        // Else, the dice value is add to his current stack.
        else {
            this.roundScore += diceValue
        }

        return diceValue
    }
    hold() {
        // Hold the round score and add to global score.
        // Only if he roll dice at least once !
        if (this.roundScore > 0) {
            this.globalScore += this.roundScore

            // Then, reset is roundScore for the next turn.
            this.roundScore = 0
            this.turn = false

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
    game.newGame()
    updatePlayerscore()
})

rollDiceButton.addEventListener("click", () => {
    if (game.winner == null) {
        if (game.currentPlayer.turn) {
            // If current player turn =  true, then current player roll dice.
            diceValue.innerText = game.currentPlayer.rollDice()
        } else {
            // If current player turn = false, then next player roll dice.
            diceValue.innerText = game.changePlayer().rollDice()
        }
    } else {
        // If there is a winner, don't throw.
    }
    updatePlayerscore()
})

holdButton.addEventListener("click", () => {
    if (game.winner == null) {
        // If there is no winner
        game.currentPlayer.hold()

        if (game.currentPlayer.globalScore >= 100) {
            game.gameOver()
        } else {
            game.changePlayer()
        }
    }
    updatePlayerscore()
})

function updatePlayerscore() {
    player1Global.innerText = player1.globalScore
    player1Round.innerText = player1.roundScore
    player2Global.innerText = player2.globalScore
    player2Round.innerText = player2.roundScore
}
