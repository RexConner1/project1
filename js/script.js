console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3) {
        this.listOfRings = this.initializeArray(Ring, numberOfRings);
        this.listOfPegs = this.initializeArray(Peg, numberOfRings);
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
    }

    movePeg() {
        
    }
}

class Peg {
    constructor(pegIndex) {
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
    constructor(units) {
        this.size = units * 25;
    }

    createNewRing() {
        const ring = document.createElement(`div`);
        ring.classList = `ring`;
        // ring.id = `ring${}`;
        ring.addEventListener(`click`, this.selectRing);
    }

    selectRing() {
        console.log(`Hi`);
    }
}

new Game(5);