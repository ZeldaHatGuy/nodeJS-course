class person {
  constructor(height, job, age, hairColor, pets) {
    this.height = height;
    this.job = job;
    this.age = age;
    this.hairColor = hairColor;
    this.pets = pets;
  }

  yearsTilNinety() {
    return 90 - this.age;
    //     this.age = 90 - this.age;
    //     return this;
    //   }
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  killPet(pet) {
    const index = this.pets.indexOf(pet);
    if (index === -1) return;
    this.pets.splice(index, 1);
    console.log(`oh my God! the ${pet} is dead`);
  }
}

// class friend extends person {
//   constructor(height, job, age, hairColor, pets) {
//     super(height, job, age);
//     this.hairColor = hairColor;
//     this.pets = pets;
//   }
// }
const me = new person('6ft', 'Engineer', 40, 'black', ['dog', 'cat']);

console.log(me);

me.addPet('chicken');
console.log(me);
me.killPet('dog');
console.log(me);

// console.log(me.age);
// console.log(me.yearsTilNinety());

// const chris = new person

// const greg = {
//   height: '6ft',
//   age: 40,
//   job: 'Engineer',
//   yearsTilNinety: function () {
//     return 90 - this.age;
//   },
// };
