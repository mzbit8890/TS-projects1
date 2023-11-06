import chalk from 'chalk';
class BankAccount {
    constructor() {
        this.accountBalance = 0;
    }
    debit(amount) {
        let statement = chalk.red("Sorry, you have insufficient balance!");
        if (amount > 0) {
            statement = chalk.red("The amount you entered is wrong!");
            if (this.accountBalance >= amount) {
                this.accountBalance -= amount;
                statement = chalk.green("Transaction successful! New account balance is " + this.accountBalance);
            }
            else {
                statement = chalk.red("You don't have enough money to do this transaction");
            }
        }
        return statement;
    }
    credit(amount) {
        let statement = chalk.red("Transaction failed!");
        if (amount > 0) {
            this.accountBalance += amount;
            statement = chalk.green("Your account has been credited successfully!");
        }
        return statement;
    }
}
class Customer {
    constructor(FirstName, LastName, Gender, Age, MobileNumber, bankAccount, pin) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.bankAccount = bankAccount;
        this.pin = pin;
    }
    customerInfo() {
        return `Name: ${this.FirstName} ${this.LastName}
Age: ${this.Age}
Gender: ${this.Gender}
Mobile: ${this.MobileNumber}
Account Balance: ${chalk.blue(this.bankAccount.accountBalance)}`;
    }
}
export { BankAccount, Customer };
