// Find and init DOM elements
const rollDiceButton = document.getElementById("rollDiceButton")
const holdButton = document.getElementById("holdButton")
const newGameButton = document.getElementById("newGameButton")

const player1Tag = document.getElementById("player1")
const player2Tag = document.getElementById("player2")

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

    changePlayer(playerTurn) {
        if (!playerTurn) {
            // Switch between the 2 players.
            this.currentPlayer == this.player1
                ? (this.currentPlayer = this.player2)
                : (this.currentPlayer = this.player1)
            this.currentPlayer.turn = true
        }

        return this.currentPlayer
    }

    checkWinner(globalScore) {
        if (globalScore >= 100) {
            this.winner = this.currentPlayer
        }
        return this.winner
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

        return diceValue
    }

    checkDiceResult(diceValue) {
        if (diceValue == 1) {
            this.roundScore = 0
            this.turn = false
        } else if (diceValue > 1 && diceValue <= 6) {
            this.roundScore += diceValue
            this.turn = true
        }
        return this.turn
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

nplayer(game.currentPlayer)

newGameButton.addEventListener("click", () => {
    game.newGame()
    updatePlayerscore()
    nplayer(game.currentPlayer)
})

rollDiceButton.addEventListener("click", () => {
    if (game.winner == null) {
        let diceRoll = game.currentPlayer.rollDice()
        diceValue.innerText = diceRoll
        let playerTurn = game.currentPlayer.checkDiceResult(diceRoll)
        let nextPlayer = game.changePlayer(playerTurn)
        nplayer(nextPlayer)
    } else {
        // If there is a winner, don't throw.
    }
    updatePlayerscore()
})

holdButton.addEventListener("click", () => {
    if (game.currentPlayer.roundScore > 0) {
        let newGlobalScore = game.currentPlayer.hold()
        let winner = game.checkWinner(newGlobalScore)

        if (winner == null) {
            let nextPlayer = game.changePlayer(game.currentPlayer.turn)
            nplayer(nextPlayer)
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

function nplayer(nextPlayer) {
    if (nextPlayer == player1) {
        player1Tag.classList.add("currentPlayer")
        player2Tag.classList.remove("currentPlayer")
    } else {
        player1Tag.classList.remove("currentPlayer")
        player2Tag.classList.add("currentPlayer")
    }
    return
}
