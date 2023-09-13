class BankAccount {
  constructor(accountHolderName, accountType, balance) {
    this.accountHolderName = accountHolderName;
    this.accountType = accountType;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    return this.balance;
  }

  checkBalance() {
    return this.balance;
  }

  transfer(amount, recipientName, recipientAccountType) {
    if (amount <= 0 || isNaN(amount)) {
      throw new Error("Invalid transfer amount");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient funds for transfer");
    }

    // Implement recipient validation logic here
    // You might want to check if the recipient exists in your bank system.

    // Assuming recipient validation is successful, proceed with the transfer.
    this.balance -= amount;
    return this.balance;
  }
}

// Create a new bank account
const myAccount = new BankAccount("John Doe", "Savings", 1000);

function performAction() {
  const action = document.getElementById("action").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const recipientName = document.getElementById("recipientName").value;
  const recipientAccountType = document.getElementById("recipientAccountType").value;
  const resultDiv = document.getElementById("result");

  try {
    switch (action) {
      case "deposit":
        if (isNaN(amount) || amount <= 0) {
          throw new Error("Invalid input for deposit");
        }
        const newBalanceAfterDeposit = myAccount.deposit(amount);
        resultDiv.innerHTML = `Deposited ${amount}. New balance: ${newBalanceAfterDeposit}`;
        break;

      case "withdraw":
        if (isNaN(amount) || amount <= 0) {
          throw new Error("Invalid input for withdrawal");
        }
        const newBalanceAfterWithdrawal = myAccount.withdraw(amount);
        resultDiv.innerHTML = `Withdrew ${amount}. New balance: ${newBalanceAfterWithdrawal}`;
        break;

      case "balance":
        const currentBalance = myAccount.checkBalance();
        resultDiv.innerHTML = `Current balance: ${currentBalance}`;
        break;

      case "transfer":
        if (isNaN(amount) || amount <= 0 || !recipientName || !recipientAccountType) {
          throw new Error("Invalid transfer input");
        }
        const newBalanceAfterTransfer = myAccount.transfer(amount, recipientName, recipientAccountType);
        resultDiv.innerHTML = `Transferred ${amount} to ${recipientName}'s ${recipientAccountType} account. New balance: ${newBalanceAfterTransfer}`;
        break;

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  } finally {
    console.log("Action performed");
  }
}
