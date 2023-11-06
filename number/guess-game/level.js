import inquirer from 'inquirer';
import chalk from 'chalk';
// Generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Define difficulty levels
const difficultyLevels = [
    { name: 'Easy', min: 1, max: 50, maxAttempts: 7 },
    { name: 'Medium', min: 1, max: 100, maxAttempts: 5 },
    { name: 'Hard', min: 1, max: 200, maxAttempts: 3 },
];
// Initialize game variables
let targetNumber;
let attempts = 0;
let selectedDifficulty; // Stores the selected difficulty
// Initialize chalk styles
const styles = {
    success: chalk.green.bold,
    error: chalk.red.bold,
    info: chalk.blue.bold,
};
// Start a new game
function startGame() {
    inquirer
        .prompt({
        type: 'list',
        name: 'difficulty',
        message: 'Choose a difficulty level:',
        choices: difficultyLevels.map((level) => level.name),
    })
        .then((answers) => {
        selectedDifficulty = difficultyLevels.find((level) => level.name === answers.difficulty);
        targetNumber = getRandomNumber(selectedDifficulty.min, selectedDifficulty.max);
        attempts = 0;
        console.log(styles.info(`Guess a number between ${selectedDifficulty.min} and ${selectedDifficulty.max}`));
        askForGuess();
    });
}
// Ask the user for their guess using inquirer
function askForGuess() {
    inquirer
        .prompt({
        type: 'number',
        name: 'guess',
        message: 'Enter your guess:',
        validate: (input) => {
            const guess = parseInt(input);
            if (isNaN(guess) || guess < selectedDifficulty.min || guess > selectedDifficulty.max) {
                return `Please enter a valid number within the range ${selectedDifficulty.min} - ${selectedDifficulty.max}`;
            }
            return true;
        },
    })
        .then((answers) => {
        const guess = answers.guess;
        attempts++;
        checkGuess(guess);
    })
        .catch((error) => {
        console.error(styles.error(`Error: ${error.message}`));
        askForGuess(); // Prompt the user again if there's an error
    });
}
// Check the user's guess
function checkGuess(guess) {
    if (guess === targetNumber) {
        console.log(styles.success(`Congratulations! You guessed the correct number in ${attempts} attempts.`));
        playAgain();
    }
    else if (attempts >= selectedDifficulty.maxAttempts) {
        console.log(styles.error(`Sorry, you've reached the maximum number of attempts. The correct number was ${targetNumber}.`));
        playAgain();
    }
    else {
        const message = guess < targetNumber ? 'Too low. Try again.' : 'Too high. Try again.';
        console.log(styles.error(message));
        askForGuess();
    }
}
// Ask if the user wants to play again
function playAgain() {
    inquirer
        .prompt({
        type: 'confirm',
        name: 'playAgain',
        message: 'Do you want to play again?',
    })
        .then((answers) => {
        if (answers.playAgain) {
            startGame();
        }
        else {
            console.log(styles.info('Thank you for playing!'));
            process.exit(0);
        }
    });
}
// Start the game when the script runs
startGame();
