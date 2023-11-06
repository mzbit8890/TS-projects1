import inquirer from 'inquirer';
import chalk from 'chalk';
const todos = [];
// Function to display the list of todos
function displayTodos() {
    console.clear();
    console.log(chalk.bold.underline('Todo List'));
    if (todos.length === 0) {
        console.log(chalk.yellow('No todos found.'));
    }
    else {
        todos.forEach((todo, index) => {
            const status = todo.completed ? chalk.green('✔') : chalk.red('❌');
            console.log(`[${index + 1}] ${status} ${todo.task} (Priority: ${todo.priority}, Due Date: ${todo.dueDate})`);
        });
    }
    console.log('');
}
// Function to add a new todo
function addTodo() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'task',
            message: 'Enter a new task:',
            validate: (value) => value.trim() !== '' || 'Task cannot be empty.',
        },
        {
            type: 'list',
            name: 'priority',
            message: 'Select task priority:',
            choices: ['High', 'Medium', 'Low'],
        },
        {
            type: 'input',
            name: 'dueDate',
            message: 'Enter due date (optional, format: YYYY-MM-DD):',
            validate: (value) => {
                if (value.trim() === '') {
                    return true; // Optional date, no validation needed
                }
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(value)) {
                    return 'Invalid date format. Please use YYYY-MM-DD.';
                }
                return true;
            },
        },
    ])
        .then((answers) => {
        const newTodo = {
            task: answers.task,
            completed: false,
            priority: answers.priority,
            dueDate: answers.dueDate || 'N/A',
        };
        todos.push(newTodo);
        displayTodos();
        promptUser();
    });
}
// Function to mark a todo as completed
function completeTodo() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'index',
            message: 'Enter the index of the task to complete:',
            validate: (value) => !isNaN(parseInt(value)) || 'Please enter a valid index.',
        },
    ])
        .then((answers) => {
        const index = parseInt(answers.index) - 1;
        if (index >= 0 && index < todos.length) {
            todos[index].completed = true;
        }
        else {
            console.log(chalk.red('Invalid todo index.'));
        }
        displayTodos();
        promptUser();
    });
}
// Function to delete a todo
function deleteTodo() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'index',
            message: 'Enter the index of the task to delete:',
            validate: (value) => !isNaN(parseInt(value)) || 'Please enter a valid index.',
        },
    ])
        .then((answers) => {
        const index = parseInt(answers.index) - 1;
        if (index >= 0 && index < todos.length) {
            todos.splice(index, 1);
        }
        else {
            console.log(chalk.red('Invalid todo index.'));
        }
        displayTodos();
        promptUser();
    });
}
// Function to prompt the user for actions
function promptUser() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Todo', 'Complete Todo', 'Delete Todo', 'Quit'],
        },
    ])
        .then((answers) => {
        switch (answers.action) {
            case 'Add Todo':
                addTodo();
                break;
            case 'Complete Todo':
                completeTodo();
                break;
            case 'Delete Todo':
                deleteTodo();
                break;
            case 'Quit':
                console.log(chalk.yellow('Goodbye! Thanks For Using This App.'));
                break;
        }
    });
}
// Start the application
displayTodos();
promptUser();
