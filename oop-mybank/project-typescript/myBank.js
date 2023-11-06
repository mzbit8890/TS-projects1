import chalk from 'chalk';
import { BankAccount, Customer } from './classes.js';
import inquirer from 'inquirer';
(async () => {
    const customers = [];
    console.log(chalk.green('Welcome to MyBank!'));
    const questions = [
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter your first name:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'First name cannot be empty';
                }
                if (!/^[a-zA-Z]+$/.test(input)) {
                    return 'First name must contain only letters';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter your last name:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Last name cannot be empty';
                }
                if (!/^[a-zA-Z]+$/.test(input)) {
                    return 'Last name must contain only letters';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'gender',
            message: 'Enter your gender:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Gender cannot be empty';
                }
                if (!/^[a-zA-Z]+$/.test(input)) {
                    return 'Gender must contain only letters';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Age cannot be empty';
                }
                const age = parseInt(input);
                return !isNaN(age) && age >= 18 ? true : 'Age must be a number and at least 18';
            },
        },
        {
            type: 'input',
            name: 'mobileNumber',
            message: 'Enter your mobile number:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Mobile number cannot be empty';
                }
                const mobileNO = parseInt(input);
                return !isNaN(mobileNO) ? true : 'Mobile number must be a number';
            },
        },
        {
            type: 'input',
            name: 'pin',
            message: 'Create a PIN for your account:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'PIN cannot be empty';
                }
                return input.length === 4 && /^\d+$/.test(input) ? true : 'PIN must be 4 digits';
            },
        },
    ];
    const answers = await inquirer.prompt(questions);
    const bankAccount = new BankAccount();
    const customer = new Customer(answers.firstName, answers.lastName, answers.gender, parseInt(answers.age), answers.mobileNumber, bankAccount, answers.pin);
    customers.push(customer);
    console.log(customer.customerInfo());
    let exit = false;
    let performedOperation = false;
    while (!exit) {
        const operationChoice = await inquirer.prompt({
            type: 'list',
            name: 'operation',
            message: 'Select an operation:',
            choices: ['Credit', 'Debit', 'View Balance', 'Customer Information', 'Exit'],
        });
        switch (operationChoice.operation) {
            case 'Credit':
                const creditAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the credit amount:',
                    validate: (input) => {
                        const amount = parseFloat(input);
                        return !isNaN(amount) && amount > 0 ? true : 'Invalid amount. Please enter a valid positive number for the credit.';
                    },
                });
                const creditAmountValue = parseFloat(creditAmount.amount);
                const creditResult = customer.bankAccount.credit(creditAmountValue);
                console.log(creditResult);
                performedOperation = true;
                break;
            case 'Debit':
                const debitAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the debit amount:',
                    validate: (input) => {
                        const amount = parseFloat(input);
                        return !isNaN(amount) && amount > 0 ? true : 'Invalid amount. Please enter a valid positive number for the debit.';
                    },
                });
                const debitAmountValue = parseFloat(debitAmount.amount);
                const debitResult = customer.bankAccount.debit(debitAmountValue);
                console.log(debitResult);
                performedOperation = true;
                break;
            case 'View Balance':
                console.log(chalk.blue(`Account Balance: ${customer.bankAccount.accountBalance}`));
                performedOperation = true;
                break;
            case 'Customer Information':
                console.log(customer.customerInfo());
                performedOperation = true;
                break;
            case 'Exit':
                exit = true;
                break;
        }
    }
})();
