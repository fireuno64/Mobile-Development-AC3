export default class Expense {
  constructor(description, amount) {
    // Generate a simple unique ID (e.g. timestamp + random number)
    this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    this.description = description;
    this.amount = amount;
  }
}
