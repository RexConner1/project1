console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3) {
        this.listOfPegs = this.initializeArray(Peg, numberOfPegs);
        this.listOfRings = this.initializeArray(Ring, numberOfRings);
        
        this.listOfPegs[0].ringsOnPeg = this.listOfRings;

        // console.log(this.listOfPegs);
        // console.log(this.listOfRings);
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
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

        const peg = document.createElement(`div`);
        peg.classList = `peg`;
        peg.id = `peg${this.index}`;
        peg.addEventListener(`mouseover`, this.hoverPeg);
        peg.addEventListener(`mouseleave`, this.deselectPeg);
        peg.addEventListener(`click`, this.selectPeg);

        container.appendChild(peg);
    }

    createRingsContainer() {
        const container = document.querySelector(`#container${this.index}`);

        const rings = document.createElement(`div`);
        rings.classList = `rings`;

        container.appendChild(rings);
    }

    selectPeg() {
        // this.removeEventListener(`mouseover`, this.hoverPeg);
        // this.removeEventListener(`mouseleave`, this.deselectPeg);
        // this.style.background = `green`;
    }

    hoverPeg() {
        this.style.background = `yellow`;
    }

    deselectPeg() {
        this.style.background = ``;
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

        const ring = document.createElement(`div`);
        ring.classList = `ring`;
        ring.id = `ring${this.index}`;
        ring.style.width = `${200 - (25 * this.index)}px`;
        ring.addEventListener(`mouseover`, this.hoverRing);
        ring.addEventListener(`mouseleave`, this.deselectRing);
        ring.addEventListener(`click`, this.selectRing);

        container.prepend(ring);
    }

    selectRing() {
        this.removeEventListener(`mouseover`, this.hoverRing);
        this.removeEventListener(`mouseleave`, this.deselectRing);
        this.style.background = `green`;
    }

    hoverRing() {
        this.style.background = `yellow`;
    }

    deselectRing() {
        this.style.background = ``;
    }
}

new Game(3);