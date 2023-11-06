import Person from './person.js';

class Student extends Person {
  private name: string;

  constructor() {
    super();
    this.name = "";
  }

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}

export default Student;
