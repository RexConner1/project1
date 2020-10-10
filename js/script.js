console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3) {
        this.listOfRings = this.initializeArray(Ring, numberOfRings);
        this.listOfPegs = this.initializeArray(Peg, numberOfPegs);

        // this.listOfPegs.forEach(peg => this.createContainer(peg.index));

        this.listOfPegs[0].ringsOnPeg = this.listOfPegs;
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
        this.ringElement = this.createNewRingElement();
    }

    createNewRingElement() {
        const ring = document.createElement(`div`);
        ring.classList = `ring`;
        ring.id = `ring${this.ringIndex}`;
        ring.style.width = this.ringIndex * 25;
        ring.addEventListener(`click`, this.selectRing);

        // const container = document.querySelector(`.container1`);
        // container.appendChild(ring);
    }

    selectRing() {
        console.log(`Hi`);
    }
}

new Game(5);