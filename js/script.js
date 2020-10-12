console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3) {
        this.listOfPegs = this.initializeArray(Peg, numberOfPegs);
        this.listOfPegs[0].ringsOnPeg = this.initializeArray(Ring, numberOfRings);
        this.numberOfRings = numberOfRings;
        this.selectedRing;
        this.selectedPeg;

        this.listOfPegs.forEach(peg => {
            peg.element.addEventListener(`mouseover`, (event) => this.onPegEntry(event));
            peg.element.addEventListener(`mouseleave`, (event) => this.onPegDeparture(event));
            peg.element.addEventListener(`click`, (event) => this.onPegClick(event));
        });
        this.listOfPegs[0].ringsOnPeg.forEach(ring => {
            ring.element.addEventListener(`mouseover`, (event) => this.onRingEntry(event));
            ring.element.addEventListener(`mouseleave`, (event) => this.onRingDeparture(event));
            ring.element.addEventListener(`click`, (event) => this.onRingClick(event));
        });
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
    }

    onPegClick(event) {
        if (this.isThisPegsTopRingBiggerThanMovingOne(event.target)) {
            this.selectedPeg = event.target;
            this.moveRing();
            this.resetSelections();
            if (this.isComplete()) {
                console.log(`Congratulations. You've won!`);
            }
        }
    }

    isThisPegsTopRingBiggerThanMovingOne(peg) {
        const currentTopRing = this.getTopRing(peg);
        return !currentTopRing || currentTopRing.style.width > this.selectedRing.style.width;
    }

    resetSelections() {
        this.selectedRing.style.background = ``;
        this.selectedPeg.style.background = ``;

        this.selectedRing = ``;
        this.selectedRing = ``;
    }

    onPegEntry(event) {
        if (this.selectedRing) {
            event.target.style.background = `green`;
        }
    }

    onPegDeparture(event) {
        event.target.style.background = ``;
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

    isTopRing(ring) {
        return this.getTopRing(ring) === ring;
    }

    getTopRing(peg) {
        const topRing = peg.parentElement.querySelector(`.ring`);
        return topRing ? topRing : false;
    }

    isARingSelected(ring) {
        return ring.style.background === `green`;
    }

    moveRing() {
        this.selectedPeg.parentElement.querySelector(`.rings`).prepend(this.selectedRing);
    }

    isComplete() {
        let isWon = false;
        this.listOfPegs.slice(1).forEach(peg => {
            isWon = isWon || peg.rings.querySelectorAll(`.ring`).length === this.numberOfRings;
        });
        return isWon;
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


let seconds = 0;
setInterval(setTime, 1000);

function setTime() {
    seconds++;
    document.querySelector(`.timer p`).innerHTML = convert(seconds);
}

function convert(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${(seconds + "").length < 2 ? `0` : ``}${seconds}`
}


new Game(3);