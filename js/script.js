console.log(`JS working!`);

class Game {
    constructor(numberOfRings, numberOfPegs = 3){
        this.numberOfRings = numberOfRings;
    }
}

class Peg {
    constructor() {
        this.ringsOnPeg = [];
    }
}

class Ring {
    constructor(size) {
        this.size = size;
    }
}

new Game(3);