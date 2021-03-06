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

const diceValue = document.getElementById("dice")

const modalWindow = document.getElementById("modalWindow")
const winnerDisplay = document.getElementById("winnerDisplay")
const rulesDisplay = document.getElementById("rulesDisplay")
const rulesButton = document.getElementById("rulesButton")
const closeModal = document.getElementById("closeModal")

// Define Variable
// Stock the last displayed modal content
let displayedModal = ""

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
}

class Player {
    constructor(name) {
        this.name = name
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
// Init players and game
player1 = new Player("PLAYER 1")
player2 = new Player("PLAYER 2")

game = new Game(player1, player2)

// Highlight the first player.
highlightPlayer(game.currentPlayer)

// Event listenners
newGameButton.addEventListener("click", () => {
    game.newGame()
    updatePlayerScore()
    highlightPlayer(game.currentPlayer)
})

rollDiceButton.addEventListener("click", () => {
    if (game.winner == null) {
        // Roll the dice and stock the result
        let diceRoll = game.currentPlayer.rollDice()

        // Launch roll animation
        diceValue.removeAttribute("class")
        void diceValue.offsetWidth // To reset animation
        diceValue.classList.add(drawDice(diceRoll), "animateDice")

        // Check dice result to determine if the current player lost
        let playerTurn = game.currentPlayer.checkDiceResult(diceRoll)
        // Check if current player can continue or switch current player to the next.
        let nextPlayer = game.changePlayer(playerTurn)
        highlightPlayer(nextPlayer)
    } else {
        // If there is a winner, don't throw.
    }
    updatePlayerScore()
})

holdButton.addEventListener("click", () => {
    if (game.currentPlayer.roundScore > 0) {
        let newGlobalScore = game.currentPlayer.hold()
        let winner = game.checkWinner(newGlobalScore)
        updatePlayerScore()

        if (winner == null) {
            // If player hold and dont have enougth pts to win, switch to next player.
            let nextPlayer = game.changePlayer(game.currentPlayer.turn)
            highlightPlayer(nextPlayer)
        } else {
            gameOver()
        }
    }
})

// DOM Manipuation functions
function updatePlayerScore() {
    player1Global.innerText = player1.globalScore
    player1Round.innerText = player1.roundScore

    player2Global.innerText = player2.globalScore
    player2Round.innerText = player2.roundScore
}

function highlightPlayer(nextPlayer) {
    if (nextPlayer == player1) {
        player1Tag.classList.add("highlightPlayer")
        player2Tag.classList.remove("highlightPlayer")
    } else {
        player1Tag.classList.remove("highlightPlayer")
        player2Tag.classList.add("highlightPlayer")
    }
}

function drawDice(diceRoll) {
    let diceClass = "dice" + diceRoll
    return diceClass
}

function gameOver() {
    // Display modal & winner div
    toggleModalWindow("open", "winner")
    // Inject winner name to the div
    winnerDisplay.innerText = game.winner.name + " WINS !"
}

function toggleModalWindow(action, content = displayedModal) {
    displayedModal = content
    action == "close" ? (action = "none") : (action = "block")
    modalWindow.style.display = action
    switch (displayedModal) {
        case "rules":
            rulesDisplay.style.display = action
            break
        case "winner":
            winnerDisplay.style.display = action
            break
        default:
            break
    }
}

// Open rules when user click on rules button.
rulesButton.addEventListener("click", () => {
    toggleModalWindow("open", "rules")
})

// Close modal when user click on the cross or on the background.
closeModal.addEventListener("click", () => {
    toggleModalWindow("close")
})
modalWindow.addEventListener("click", (e) => {
    if (e.target.id == "modalWindow") {
        toggleModalWindow("close")
    }
})
