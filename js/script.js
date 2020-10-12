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
            peg.element.addEventListener(`click`, (event) => this.onPegClick(event));
        });
        this.listOfPegs[0].ringsOnPeg.forEach(ring => {
            ring.element.addEventListener(`mouseover`, (event) => this.onRingEntry(event));
            ring.element.addEventListener(`mouseleave`, this.onRingDeparture);
            ring.element.addEventListener(`click`, (event) => this.onRingClick(event));
        });

        // console.log(this);
    }

    initializeArray(Object, quantity) {
        return Array.from(Array(quantity), (item, index) => item = new Object(index));
    }

    onPegClick(event) {
        this.selectedPeg = event.target;
        
        event.target.style.background = ``;
        this.selectedRing.style.background = ``;
    }

    onPegEntry(event) {
        if (this.selectedRing) {
            event.target.style.background = `green`;
        }
    }

    onPegDeparture() {
        // if (this.style.background !== `green`) {
        this.style.background = ``;
        // }
    }

    onRingClick(event) {
        if (this.isRingSelected(event)) {
            event.target.style.background = ``;
            this.selectedRing = ``;
        } else if (this.isTopRing(event)) {
            event.target.style.background = `green`;
            this.selectedRing = event.target;
        }
        console.log(this);
    }

    onRingEntry(event) {
        // console.log(event.target.closest(`.container`))
        // const ringOnTop = this.listOfPegs[0].getTopRing();
        if (!this.isRingSelected(event) && this.isTopRing(event)) {
            event.target.style.background = `yellow`;
        }
    }

    onRingDeparture() {
        if (this.style.background !== `green`) {
            this.style.background = ``;
        }
    }

    isTopRing(event) {
        return event.target.parentElement.querySelector(`.ring`) === event.target;
    }

    isRingSelected(event) {
        return event.target.style.background === `green`;
    }

    // moveRing() {
    //     this.selectedPeg.appendChild(this.selectedRing);
    // }

    // isComplete() {

    // }
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
        const rings = document.createElement(`div`);
        rings.classList = `rings`;

        this.container.appendChild(rings);
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

    // getTopRing() {
    //     return this.ringsOnPeg[this.ringsOnPeg.length - 1].element;
    // }

    // addRing(ring) {
    //     this.ringsOnPeg.push(ring);
    // }

    // removeRing() {
    //     this.ringsOnPeg.pop();
    // }
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