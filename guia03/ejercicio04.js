class BankAccount{
  constructor(owner, bankBalance){
    this.owner = owner;
    this.bankBalance = bankBalance;

  }

  deposit(newBalance){
    this.bankBalance += newBalance;

    return `Ingresó la suma de $${newBalance} con éxito. | Saldo actual: $${this.bankBalance}.`;

  }

  takeOut(amount){
    this.bankBalance -= amount;
    
    return `Retiró la suma de $${amount} con éxito. | Saldo actual: $${this.bankBalance}.`;

  }

  getBalance(){
    return `¡Hola ${this.owner}! Su saldo actual en la cuenta es de: $${this.bankBalance}`;

  }

};

account1 = new BankAccount("Juan Cruz Tobares", 100000);
console.log(account1.deposit(20000));
console.log(account1.takeOut(20000));
account1.takeOut(20000);
console.log(account1.getBalance());