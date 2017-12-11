
class Person {
  constructor(name,age,address) {
    this.name = name;
    this.age = age;
    this.address  = address;

  }
  sayMyName() {
    console.log("My name is " + this.name);
  }
}

let subesh = new Person('subesh',11,'samakhushi');
