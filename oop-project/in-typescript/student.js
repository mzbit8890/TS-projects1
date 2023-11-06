import Person from './person.js';
class Student extends Person {
    constructor() {
        super();
        this.name = "";
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
export default Student;
