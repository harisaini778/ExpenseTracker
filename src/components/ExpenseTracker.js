import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack } from "react-bootstrap";

export const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    if (!moneySpent || !description || !category) {
      // Ensure all fields are filled out
      alert("Please fill out all fields.");
      return;
    }

    // Create a new expense object
    const newExpense = {
      moneySpent,
      description,
      category,
    };

    // Add the new expense to the expenses array
    setExpenses([...expenses, newExpense]);

    // Clear the input fields
    setMoneySpent("");
    setDescription("");
    setCategory("");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Stack direction="horizontal">
                <div>Track your daily expenses</div>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <h2>Add Daily Expense</h2>
        <div className="mb-3">
          <label htmlFor="moneySpent" className="form-label">Money Spent</label>
          <input
            type="text"
            className="form-control"
            id="moneySpent"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button onClick={handleAddExpense} className="btn btn-primary">Add Expense</button>
      </div>

      <div className="container mt-4">
        <h2>Expenses List</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              Money Spent: {expense.moneySpent}, Description: {expense.description}, Category: {expense.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
