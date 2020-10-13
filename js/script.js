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

        new Reset();
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
        if (this.selectedRing && this.isPegLegalForRing(event.target)) {
            this.selectedPeg = event.target;
            this.moveRing();
            this.resetSelections();
            if (this.isComplete()) {
                this.timer.stopTime();
                this.destroyEventListeners();
                this.outputWinMessage();
                this.updateScore();
            }
        }
    }

    isPegLegalForRing(peg) {
        const currentTopRing = this.getTopRing(peg);
        return !currentTopRing || currentTopRing.style.width > this.selectedRing.style.width;
    }

    moveRing() {
        this.selectedPeg.parentElement.querySelector(`.rings`).prepend(this.selectedRing);
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
        const numberOfSecondsToSolve = minimumNumberOfMoves;                    //1 second per move
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
        const winnerMessage = document.querySelector(`.output p`);
        winnerMessage.innerHTML = message;
        window.setTimeout(() => alert(message), 250);
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

        container.prepend(this.element);
    }
}


class Reset {
    constructor() {
        this.reset = document.querySelector(`#resetGame`);
        this.reset.addEventListener(`click`, this.storeRingsAndRestart);
    }

    storeRingsAndRestart() {
        localStorage.setItem(`rings`, 3);
        location.reload();
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



new Game(parseInt(localStorage.getItem('rings') ? localStorage.getItem('rings') : 3));
localStorage.removeItem('rings');