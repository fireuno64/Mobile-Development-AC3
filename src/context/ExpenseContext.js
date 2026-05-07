import React, { createContext, useState } from 'react';
import Expense from '../models/Expense';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (description, amount) => {
    const newExpense = new Expense(description, parseFloat(amount));
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const getTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, getTotal }}>
      {children}
    </ExpenseContext.Provider>
  );
};
