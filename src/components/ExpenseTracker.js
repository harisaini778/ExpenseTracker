import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack } from "react-bootstrap";

export const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editExpenseId, setEditExpenseId] = useState(null); // To track which expense is being edited

  useEffect(() => {
    // Fetch expenses from Firebase when the component mounts
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses.json');

      if (response.ok) {
        const data = await response.json();
        const expensesArray = [];

        for (const key in data) {
          expensesArray.push({ id: key, ...data[key] });
        }

        setExpenses(expensesArray);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    if (!moneySpent || !description || !category) {
      // Ensure all fields are filled out
      alert("Please fill out all fields.");
      return;
    }

    const newExpense = {
      moneySpent,
      description,
      category,
    };

    try {
      // Post new expense to Firebase
      const response = await fetch('https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        // Clear the input fields
        setMoneySpent("");
        setDescription("");
        setCategory("");

        // Fetch updated expenses from Firebase
        fetchExpenses();
      } else {
        console.error("Error adding expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEditClick = (expenseId) => {
    // Find the expense by ID
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);

    if (expenseToEdit) {
      // Set the expense details in the input fields for editing
      setMoneySpent(expenseToEdit.moneySpent);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);

      // Set the expense ID being edited
      setEditExpenseId(expenseId);
    }
  };

  const handleCancelEdit = () => {
    // Clear the input fields and reset edit state
    setMoneySpent("");
    setDescription("");
    setCategory("");
    setEditExpenseId(null);
  };

  const handleSaveEdit = async () => {
    if (!moneySpent || !description || !category) {
      // Ensure all fields are filled out
      alert("Please fill out all fields.");
      return;
    }

    const updatedExpense = {
      moneySpent,
      description,
      category,
    };

    try {
      // Make a PUT request to update the expense
      const response = await fetch(`https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses/${editExpenseId}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      });

      if (response.ok) {
        // Clear the input fields and reset edit state
        setMoneySpent("");
        setDescription("");
        setCategory("");
        setEditExpenseId(null);

        // Fetch updated expenses from Firebase
        fetchExpenses();
        console.log("Expense successfully updated.");
      } else {
        console.error("Error editing expense.");
      }
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      // Make a DELETE request to delete the expense
      const response = await fetch(`https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Fetch updated expenses from Firebase
        fetchExpenses();
        console.log("Expense successfully deleted.");
      } else {
        console.error("Error deleting expense.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
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
        {editExpenseId ? (
          <>
            <button onClick={handleSaveEdit} className="btn btn-primary">Save Edit</button>
            <button onClick={handleCancelEdit} className="btn btn-danger ml-2">Cancel Edit</button>
          </>
        ) : (
          <button onClick={handleAddExpense} className="btn btn-primary">Add Expense</button>
        )}
      </div>

      <div className="container mt-4">
        <h2>Expenses List</h2>
        {loading ? (
          <p>Loading expenses...</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                Money Spent: {expense.moneySpent}, Description: {expense.description}, Category: {expense.category}
                {editExpenseId === expense.id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(expense.id)}>Edit</button>
                    <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
