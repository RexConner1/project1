console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3) {
        this.listOfPegs = this.initializeArray(Peg, numberOfPegs);
        // this.listOfPegs.forEach(peg => this.createContainer(peg.index));

        this.listOfRings = this.initializeArray(Ring, numberOfRings);
        
        this.listOfPegs[0].ringsOnPeg = this.listOfRings;
        console.log(this.listOfPegs);
        console.log(this.listOfRings);
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
    }

    createContainer(index) {
        const containers = document.querySelector(`.containers`);

        const container = document.createElement(`div`);
        container.className = `container`;
        container.id = `container${index}`;

        containers.appendChild(container);
    }

    movePeg() {
        
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

        containers.appendChild(container);
    }

    createNewPegElement() {
        const container = document.querySelector(`#container${this.index}`);

        const peg = document.createElement(`div`);
        peg.classList = `peg`;
        peg.id = `peg${this.index}`;
        peg.style.height = `400px`;
        peg.style.width = `25px`;
        peg.style.margin = `0 auto`;
        peg.style.background = `black`;
        peg.addEventListener(`click`, this.selectRing);

        container.appendChild(peg);
    }

    createRingsContainer() {
        const container = document.querySelector(`#container${this.index}`);

        const rings = document.createElement(`div`);
        rings.classList = `rings`;

        container.appendChild(rings);
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
        ring.style.width = (5 - this.index) * 25;
        ring.addEventListener(`click`, this.selectRing);

        container.prepend(ring);
    }

    selectRing() {
        console.log(`Hi`);
    }
}

new Game(3);