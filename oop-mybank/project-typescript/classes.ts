import chalk from 'chalk'; 
class BankAccount {
  accountBalance: number = 0; 

  debit(amount: number): string {
    let statement: string = chalk.red("Sorry, you have insufficient balance!"); 

    if (amount > 0) {
      statement = chalk.red("The amount you entered is wrong!"); 

      if (this.accountBalance >= amount) {
        this.accountBalance -= amount;
        statement = chalk.green("Transaction successful! New account balance is " + this.accountBalance); 
      } else {
        statement = chalk.red("You don't have enough money to do this transaction"); 
      }
    }
    return statement;
  }

  credit(amount: number): string {
    let statement: string = chalk.red("Transaction failed!"); 
    if (amount > 0) {
      this.accountBalance += amount;
      statement = chalk.green("Your account has been credited successfully!"); 
    }
    return statement;
  }
}

class Customer {
  constructor(
    public FirstName: string,
    public LastName: string,
    public Gender: string,
    public Age: number,
    public MobileNumber: string,
    public bankAccount: BankAccount,
    public pin: string 
  ) {}

  customerInfo(): string {
    return `Name: ${this.FirstName} ${this.LastName}
Age: ${this.Age}
Gender: ${this.Gender}
Mobile: ${this.MobileNumber}
Account Balance: ${chalk.blue(this.bankAccount.accountBalance)}`; 
  }
}



export { BankAccount, Customer };
