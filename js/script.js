console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3){
        this.numberOfRings = numberOfRings;
        this.listOfPegs = Array.from(Array(numberOfPegs));
        this.listOfPegs = this.listOfPegs.map(peg => peg = new Peg());
    }
}

class Peg {
    constructor() {
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
    constructor(size) {
        this.size = size;
    }
}

new Game(3);