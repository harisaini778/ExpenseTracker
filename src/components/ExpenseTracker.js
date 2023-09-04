import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import { Stack } from "react-bootstrap"

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

  // Apply inline CSS to prevent horizontal scrolling
  const bodyStyle = {
    overflowX: 'hidden',
  };

  return (
    <div style={bodyStyle}>
      {/* <Navbar expand="lg" bg="primary" variant="dark">
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
      </Navbar> */}

      <Container className="mt-4">
        <Card>
          <Card.Header className="bg-primary text-white">
            <h2>Add Daily Expense</h2>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="moneySpent">
                <Form.Label>Money Spent</Form.Label>
                <Form.Control
                  type="text"
                  value={moneySpent}
                  onChange={(e) => setMoneySpent(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                  {/* Add more categories as needed */}
                </Form.Select>
              </Form.Group>
              {editExpenseId ? (
                <>
                  <Button variant="primary" onClick={handleSaveEdit}>Save Edit</Button>
                  <Button variant="danger" onClick={handleCancelEdit} className="ms-2">Cancel Edit</Button>
                </>
              ) : (
                <Button variant="primary" onClick={handleAddExpense}>Add Expense</Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-4">
        <Card>
          <Card.Header className="bg-primary text-white">
            <h2>Expenses List</h2>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p>Loading expenses...</p>
            ) : (
              <div className="table-responsive">
                <ListGroup>
                  {expenses.map((expense) => (
                    <ListGroup.Item key={expense.id} className="d-flex justify-content-between">
                      <div>
                        Money Spent: {expense.moneySpent}, Description: {expense.description}, Category: {expense.category}
                      </div>
                      {editExpenseId === expense.id ? (
                        <>
                          <Button variant="primary" onClick={handleSaveEdit} className="me-2">Save</Button>
                          <Button variant="danger" onClick={handleCancelEdit}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="primary" onClick={() => handleEditClick(expense.id)} className="me-2">Edit</Button>
                          <Button variant="danger" onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
                        </>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
