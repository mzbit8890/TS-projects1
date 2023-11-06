import chalk from "chalk";
export class Student {
    getCourses() {
        return this.courses;
    }
    constructor(name) {
        this.id = this.generateStudentID();
        this.name = name;
        this.courses = [];
        this.balance = 0;
    }
    generateStudentID() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance += amount;
        console.log(`Paid $${amount} tuition fees. New balance: $${this.balance}`);
    }
    showStatus() {
        console.log(chalk.blue(`Student ID: ${this.id}`));
        console.log(chalk.blue(`Student Name: ${this.name}`));
        console.log('Courses Enrolled:');
        if (this.courses.length === 0) {
            console.log('   No courses enrolled');
        }
        else {
            this.courses.forEach((course, index) => {
                console.log(`   ${index + 1}. ${course.getName()} (${course.getCode()})`);
            });
        }
        console.log(chalk.blue(`Balance: $${this.balance}`));
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
}
export class Course {
    constructor(name, code, cost) {
        this.name = name;
        this.code = code;
        this.cost = cost;
    }
    getName() {
        return this.name;
    }
    getCode() {
        return this.code;
    }
    getCost() {
        return this.cost;
    }
}
