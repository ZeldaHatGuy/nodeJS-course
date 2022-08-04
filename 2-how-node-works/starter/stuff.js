'use strict';
const C = require('./test-module-1.js')

 class person {
    constructor(name,height, weight) {
        this.height = height
        this.name = name
        this.weight = weight
    }

    getTargetWeight(targetWeight) {
        console.log(`${this.name} is ${this.weight - targetWeight} away from his goal`)
    }
}



class friend extends person {
    constructor(name, height, weight, age) {
        super(name, height, weight)
        this.age = age
    }
    speak() {
        console.log(`${this.name} also says hi`)
    }
}

let Greg =  new friend('Greg','6ft', '350', '39')
Greg.getTargetWeight(240)


console.log(Greg.height)
console.log(Greg.age)
Greg.speak();


const calc1 = new C();
console.log(calc1.add(2,5))

const calc2 = require('./test-module-2')
console.log(calc2.add(2,5))