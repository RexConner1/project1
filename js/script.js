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
            peg.element.addEventListener(`mouseleave`, this.onPegDeparture);
            peg.element.addEventListener(`click`, (event) => this.selectPeg(event));
        });
        this.listOfPegs[0].ringsOnPeg.forEach(ring => {
            ring.element.addEventListener(`mouseover`, (event) => this.onRingEntry(event));
            ring.element.addEventListener(`mouseleave`, this.onRingDeparture);
            ring.element.addEventListener(`click`, (event) => this.selectRing(event));
        });

        // console.log(this.listOfPegs);
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
    }

    selectPeg(event) {
        event.target.style.background = ``;
        this.selectedPeg = event.target;
        console.log(this);
    }

    onPegEntry() {
        if(this.selectedRing) {
            event.target.style.background = `green`;
        }
    }

    onPegDeparture() {
        // if (this.style.background !== `green`) {
        this.style.background = ``;
        // }
    }

    selectRing(event) {
        if(event.target.style.background === `green`) {
            event.target.style.background = ``;
            this.selectedRing = ``;
        } else {
            event.target.style.background = `green`;
            this.selectedRing = event.target;
        }
        console.log(this);
    }

    onRingEntry(event) {
        const ringOnTop = this.listOfPegs[0].getTopRing().element;
        if (event.target.style.background !== `green` && ringOnTop === event.target) {
            event.target.style.background = `yellow`;
        }
    }

    onRingDeparture() {
        if (this.style.background !== `green`) {
            this.style.background = ``;
        }
    }

    moveRing() {
        
    }

    isComplete() {

    }
}

class Peg {
    constructor(pegIndex) {
        this.index = pegIndex;
        this.ringsOnPeg = [];
        this.createContainer();
        this.createNewPegElement();
        this.createRingsContainer();
    }

    createContainer() {
        const containers = document.querySelector(`.containers`);

        const container = document.createElement(`div`);
        container.className = `container`;
        container.id = `container${this.index}`;
        container.style.gridColumn = `${this.index + 1}`;

        containers.appendChild(container);
    }

    createNewPegElement() {
        const container = document.querySelector(`#container${this.index}`);

        this.element = document.createElement(`div`);
        this.element.classList = `peg`;
        this.element.id = `peg${this.index}`;

        container.appendChild(this.element);
    }

    createRingsContainer() {
        const container = document.querySelector(`#container${this.index}`);

        const rings = document.createElement(`div`);
        rings.classList = `rings`;

        container.appendChild(rings);
    }

    getTopRing() {
        return this.ringsOnPeg[this.ringsOnPeg.length - 1];
    }

    addRing(ring) {
        this.ringsOnPeg.push(ring);
    }

    removeRing() {
        this.ringsOnPeg.pop();
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

new Game(3);