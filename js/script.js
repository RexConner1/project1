console.log(`JS working!`);

let seconds = 0;
const timer = document.querySelector(`.timer p`);
const score = document.querySelector(`.score p`);
const moves = document.querySelector(`.moves p`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3) {
        this.listOfPegs = this.initializeArray(Peg, numberOfPegs);
        this.listOfRings = this.initializeArray(Ring, numberOfRings);
        this.numberOfRings = numberOfRings;
        this.selectedRing;
        this.selectedPeg;

        this.initializeEventListeners();

        score.innerHTML = this.getCurrentScore();

        this.resetGame = new ResetGame();
        this.resetScore = new ResetScore();
        this.solver = new Solve();
        this.timer = new Timer();
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
    }

    initializeEventListeners() {
        this.pointerToPegEntry = this.onPegEntry.bind(this);
        this.pointerToPegDeparture = this.onPegDeparture.bind(this);
        this.pointerToPegClick = this.onPegClick.bind(this);
        this.pointerToRingEntry = this.onRingEntry.bind(this);
        this.pointerToRingDeparture = this.onRingDeparture.bind(this);
        this.pointerToRingClick = this.onRingClick.bind(this);

        this.listOfPegs.forEach(peg => {
            peg.element.addEventListener(`mouseover`, this.pointerToPegEntry);
            peg.element.addEventListener(`mouseleave`, this.pointerToPegDeparture);
            peg.element.addEventListener(`click`, this.pointerToPegClick);
        });
        this.listOfRings.forEach(ring => {
            ring.element.addEventListener(`mouseover`, this.pointerToRingEntry);
            ring.element.addEventListener(`mouseleave`, this.pointerToRingDeparture);
            ring.element.addEventListener(`click`, this.pointerToRingClick);
        });
    }

    destroyEventListeners() {
        this.listOfPegs.forEach(peg => {
            peg.element.removeEventListener(`mouseover`, this.pointerToPegEntry);
            peg.element.removeEventListener(`mouseleave`, this.pointerToPegDeparture);
            peg.element.removeEventListener(`click`, this.pointerToPegClick);
        });
        this.listOfRings.forEach(ring => {
            ring.element.removeEventListener(`mouseover`, this.pointerToRingEntry);
            ring.element.removeEventListener(`mouseleave`, this.pointerToRingDeparture);
            ring.element.removeEventListener(`click`, this.pointerToRingClick);
        });
    }

    onPegEntry(event) {
        if (this.selectedRing && this.isPegLegalForRing(event.target)) {
            event.target.style.background = `yellow`;
        }
    }

    onPegDeparture(event) {
        event.target.style.background = ``;
    }

    onPegClick(event) {
        event = event.target ? event.target : event;
        if (this.selectedRing && this.isPegLegalForRing(event)) {
            this.selectedPeg = event;
            this.moveRing();
            this.resetSelections();
            if (this.isComplete()) {
                this.timer.stopTime();
                this.destroyEventListeners();
                this.stopRingDragging();
                this.outputWinMessage();
                this.updateScore();
            }
        }
    }

    isPegLegalForRing(peg) {
        const currentTopRing = this.getTopRing(peg);
        return !currentTopRing || parseInt(currentTopRing.style.width) > parseInt(this.selectedRing.style.width);
    }

    moveRing() {
        this.selectedPeg.closest(`.container`).querySelector(`.rings`).prepend(this.selectedRing);
        this.increaseMoveCounter();
    }

    increaseMoveCounter() {
        moves.innerHTML = parseInt(moves.innerHTML) + 1;
    }

    resetSelections() {
        this.selectedRing.style.background = ``;
        this.selectedPeg.style.background = ``;

        this.selectedRing = ``;
        this.selectedPeg = ``;
    }

    onRingEntry(event) {
        if (!this.isARingSelected(event.target) && this.isTopRing(event.target)) {
            event.target.style.background = `yellow`;
        }
    }

    onRingDeparture(event) {
        if (!this.isARingSelected(event.target)) {
            event.target.style.background = ``;
        }
    }

    onRingClick(event) {
        if (this.isARingSelected(event.target)) {
            event.target.style.background = ``;
            this.selectedRing = ``;
        } else if (this.isTopRing(event.target) && !this.selectedRing) {
            event.target.style.background = `green`;
            this.selectedRing = event.target;
        }
    }

    isARingSelected(ring) {
        return ring.style.background === `green`;
    }

    isTopRing(ring) {
        return this.getTopRing(ring) === ring;
    }

    getTopRing(peg) {
        const topRing = peg.parentElement.querySelector(`.ring`);
        return topRing ? topRing : false;
    }

    getCurrentScore() {
        let tempScore = localStorage.getItem('score');
        return tempScore ? parseInt(tempScore) : 0;
    }

    updateScore() {
        const time = seconds;
        const numberOfMoves = parseInt(moves.innerHTML);

        localStorage.setItem(`score`, this.getCurrentScore() + this.determineScore(time, numberOfMoves));
        score.innerHTML = localStorage.getItem(`score`);
    }

    determineScore(userTime, userMoves) {
        const minimumNumberOfMoves = 2 ** this.numberOfRings - 1;
        const numberOfSecondsToSolve = minimumNumberOfMoves * 2;                //2 seconds per move
        const numerator = minimumNumberOfMoves * numberOfSecondsToSolve * 1000; //Constant
        const denominator = userTime * userMoves                                //Make moves and time inversely proportional

        return Math.round(numerator/denominator);
    }

    isComplete() {
        let isWon = false;
        this.listOfPegs.slice(1).forEach(peg => {
            isWon = isWon || peg.rings.querySelectorAll(`.ring`).length === this.numberOfRings;
        });
        return isWon;
    }

    outputWinMessage() {
        const message = `Congratulations. You've won!`
        console.log(message);
        // const winnerMessage = document.querySelector(`.output p`);
        // winnerMessage.innerHTML = message;
        window.setTimeout(() => alert(message), 250);
    }

    stopRingDragging () {
        this.listOfRings.forEach(ring => ring.element.setAttribute(`draggable`, `false`));
    }
}


class Container {
    constructor(containerIndex){
        this.index = containerIndex;
        this.createContainer();
        this.createRingsContainer();
    }

    createContainer() {
        const containers = document.querySelector(`.containers`);

        this.container = document.createElement(`div`);
        this.container.className = `container`;
        this.container.id = `container${this.index}`;
        this.container.style.gridColumn = `${this.index + 1}`;
        this.container.setAttribute(`ondrop`, `drop(event)`)
        this.container.setAttribute(`ondragover`, `allowDrop(event)`);

        containers.appendChild(this.container);
    }

    createRingsContainer() {
        this.rings = document.createElement(`div`);
        this.rings.classList = `rings`;

        this.container.appendChild(this.rings);
    }
}


class Peg extends Container {
    constructor(pegIndex) {
        super(pegIndex);
        this.ringsOnPeg = [];
        this.createNewPegElement();
    }

    createNewPegElement() {
        this.element = document.createElement(`div`);
        this.element.classList = `peg`;
        this.element.id = `peg${this.index}`;

        this.container.prepend(this.element);
    }
}


class Ring {
    constructor(ringIndex) {
        this.index = ringIndex;
        this.createNewRingElement();
    }

    createNewRingElement() {
        const container = document.querySelector(`#container0 .rings`);

        this.element = document.createElement(`div`);
        this.element.classList = `ring`;
        this.element.id = `ring${this.index}`;
        this.element.style.width = `${200 - (25 * this.index)}px`;
        this.element.setAttribute(`draggable`, `true`);
        this.element.setAttribute(`ondragstart`, `drag(event)`);

        container.prepend(this.element);
    }
}


class ResetGame {
    constructor() {
        this.resetButtons = document.querySelectorAll(`.resetGame div`);
        this.resetButtons.forEach(button => button.addEventListener(`click`, this.storeRingsAndRestart));
    }

    storeRingsAndRestart() {
        this.numberOfRings = this.getAttribute(`data-rings`);
        localStorage.setItem(`rings`, this.numberOfRings);
        location.reload();
    }
}


class ResetScore {
    constructor() {
        this.resetScore = document.querySelector(`.resetScore button`);
        this.resetScore.addEventListener(`click`, this.clearScore);
    }

    clearScore() {
        localStorage.removeItem(`score`);
        score.innerHTML = 0;
    }
}


class Solve {
    constructor() {
        this.solveButton = document.querySelector(`#solveButton`);
        this.solveButton.addEventListener(`click`, this.solve.bind(this));
    }

    getTopRings(peg1, peg2) {
        this.ring1 = game.getTopRing(peg1);
        this.ring2 = game.getTopRing(peg2);
    }

    sleep(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
    }

    validateRing(ring) {
        game.selectedRing = ring;
        return game.selectedRing;
    }

    makeValidMove(peg1, peg2) {
        if (!game.isComplete()) {
            this.getTopRings(peg1, peg2);
            if (this.validateRing(this.ring1) && game.isPegLegalForRing(peg2)) {
                game.onPegClick(peg2);
            } else if(this.validateRing(this.ring2) && game.isPegLegalForRing(peg1)) {
                game.onPegClick(peg1);
            }
        }
    }

    solve() {
        this.pegA = game.listOfPegs[0].element;
        this.pegB = game.listOfPegs[1].element;
        this.pegC = game.listOfPegs[2].element;
          
        async function solveLoop() {
            if (!(game.numberOfRings % 2)) {
                this.makeValidMove.bind(this)(this.pegA, this.pegB);
                await this.sleep(500);
                this.makeValidMove.bind(this)(this.pegA, this.pegC);
                await this.sleep(500);
                this.makeValidMove.bind(this)(this.pegB, this.pegC);
                await this.sleep(500);
            } else {
                this.makeValidMove.bind(this)(this.pegA, this.pegC);
                await this.sleep(500);
                this.makeValidMove.bind(this)(this.pegA, this.pegB);
                await this.sleep(500);
                this.makeValidMove.bind(this)(this.pegB, this.pegC);
                await this.sleep(500);
            }
            if (!game.isComplete()) {
                this.solve();
            }
        }

        solveLoop.bind(this)();
    }
}


class Timer {
    constructor() {
        this.updateTimer = setInterval(this.setTime, 1000);
    }

    setTime() {
        seconds++;

        let minutes = Math.floor(seconds / 60);
        let secondsTemp = seconds % 60;
        timer.innerHTML = `${minutes}:${(secondsTemp + "").length < 2 ? `0` : ``}${secondsTemp}`
    }

    stopTime() {
        clearInterval(this.updateTimer);
    }
}


function allowDrop(event) {
    event.preventDefault();
}
  
function drag(event) {  //ring  
    game.onRingClick(event);
}
  
function drop(event) {  //peg or container
    event.preventDefault();
    game.onPegClick(event);
}


let game = new Game(parseInt(localStorage.getItem('rings') ? localStorage.getItem('rings') : 3));
localStorage.removeItem('rings');