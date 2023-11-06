var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import chalk from 'chalk';
class Quiz {
    constructor() {
        this.questions = [];
        this.userAnswers = [];
        this.totalQuestions = 0;
        // Add your questions here
        this.questions.push(new Question("What is the capital of France?", ["Paris", "London", "Berlin"], 0), new Question("Which planet is closest to the sun?", ["Venus", "Mars", "Mercury"], 2), new Question("What is the largest mammal?", ["Elephant", "Giraffe", "Blue Whale"], 2), new CodeQuestion("What is the result of 3 + 7?", ["10", "12", "8"], 0), new Question("Who painted the Mona Lisa?", ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"], 0), new CodeQuestion("What is the output of 'console.log('Hello, World!');' in JavaScript?", ["Hello, World!", "World, Hello!", "Error"], 0));
        // Set the total number of questions
        this.totalQuestions = this.questions.length;
    }
    startQuiz() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chalk.bold("Welcome to the Quiz!\n"));
            for (let i = 0; i < this.questions.length; i++) {
                yield this.delay(500);
                console.log(chalk.blue(`\nQuestion ${i + 1}: ${this.questions[i].text}`));
                const question = this.questions[i];
                let answer = "";
                if (question instanceof CodeQuestion) {
                    answer = yield this.getUserCodeAnswer(question.text);
                }
                else {
                    answer = yield this.getUserChoice(question.choices);
                }
                this.userAnswers.push(answer.toString());
                if ((i + 1) % 3 === 0 && i !== this.questions.length - 1) {
                    console.log(chalk.bold("Exiting after 3 questions...\n"));
                    yield this.delay(500);
                    const exitPrompt = yield inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'exit',
                            message: 'Do you want to continue with the quiz?',
                            default: true,
                        },
                    ]);
                    if (!exitPrompt.exit) {
                        break;
                    }
                }
            }
            if (this.userAnswers.length < this.totalQuestions) {
                console.log(chalk.bold("Exiting the quiz...\n"));
            }
            this.showResults();
        });
    }
    getUserChoice(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = {
                type: 'list',
                name: 'answer',
                message: 'Select your answer:',
                choices: options,
            };
            const response = yield inquirer.prompt([question]);
            const answer = options.indexOf(response.answer);
            return answer;
        });
    }
    getUserCodeAnswer(questionText) {
        return __awaiter(this, void 0, void 0, function* () {
            const codeQuestion = {
                type: 'input',
                name: 'answer',
                message: questionText,
            };
            const response = yield inquirer.prompt([codeQuestion]);
            return response.answer.trim();
        });
    }
    delay(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => setTimeout(resolve, ms));
        });
    }
    showResults() {
        console.log(chalk.bold("Quiz Results:\n"));
        let correctAnswers = 0;
        for (let i = 0; i < this.userAnswers.length; i++) {
            const correctAnswer = this.questions[i].correctOption;
            console.log(chalk.blue(`Question ${i + 1}: ${this.questions[i].text}`));
            if (this.questions[i] instanceof CodeQuestion) {
                console.log(chalk.yellow(`Your answer: ${this.userAnswers[i]}`));
                console.log(chalk.green(`Correct answer: ${this.questions[i].choices[correctAnswer]}`));
                if (this.userAnswers[i] === this.questions[i].choices[correctAnswer]) {
                    console.log(chalk.green("Correct!\n"));
                    correctAnswers++;
                }
                else {
                    console.log(chalk.red("Incorrect!\n"));
                }
            }
            else {
                console.log(chalk.yellow(`Your answer: ${this.questions[i].choices[this.userAnswers[i]]}`)); // Use type assertion
                console.log(chalk.green(`Correct answer: ${this.questions[i].choices[correctAnswer]}`));
                if (parseInt(this.userAnswers[i].toString(), 10) === correctAnswer) {
                    console.log(chalk.green("Correct!\n"));
                    correctAnswers++;
                }
                else {
                    console.log(chalk.red("Incorrect!\n"));
                }
            }
        }
        if (this.userAnswers.length < this.totalQuestions) {
            console.log(chalk.bold(`You got ${correctAnswers} out of ${this.userAnswers.length} questions correct.`));
        }
        else {
            console.log(chalk.bold(`You got ${correctAnswers} out of ${this.totalQuestions} questions correct.`));
        }
    }
}
class Question {
    constructor(text, choices, correctOption) {
        this.text = text;
        this.choices = choices;
        this.correctOption = correctOption;
    }
}
class CodeQuestion extends Question {
    constructor(text, choices, correctOption) {
        super(text, choices, correctOption);
    }
}
const quiz = new Quiz();
quiz.startQuiz();
