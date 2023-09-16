// import React, { useState, useEffect } from "react";
// import Container from 'react-bootstrap/Container';
// // import Nav from 'react-bootstrap/Nav';
// // import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// // import { Stack } from "react-bootstrap"

// export const ExpenseTracker = () => {
//   const [moneySpent, setMoneySpent] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editExpenseId, setEditExpenseId] = useState(null); // To track which expense is being edited

//   useEffect(() => {
//     // Fetch expenses from Firebase when the component mounts
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const response = await fetch('https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses.json');

//       if (response.ok) {
//         const data = await response.json();
//         const expensesArray = [];

//         for (const key in data) {
//           expensesArray.push({ id: key, ...data[key] });
//         }

//         setExpenses(expensesArray);
//       }
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddExpense = async () => {
//     if (!moneySpent || !description || !category) {
//       // Ensure all fields are filled out
//       alert("Please fill out all fields.");
//       return;
//     }

//     const newExpense = {
//       moneySpent,
//       description,
//       category,
//     };

//     try {
//       // Post new expense to Firebase
//       const response = await fetch('https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses.json', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newExpense),
//       });

//       if (response.ok) {
//         // Clear the input fields
//         setMoneySpent("");
//         setDescription("");
//         setCategory("");

//         // Fetch updated expenses from Firebase
//         fetchExpenses();
//       } else {
//         console.error("Error adding expense.");
//       }
//     } catch (error) {
//       console.error("Error adding expense:", error);
//     }
//   };

//   const handleEditClick = (expenseId) => {
//     // Find the expense by ID
//     const expenseToEdit = expenses.find((expense) => expense.id === expenseId);

//     if (expenseToEdit) {
//       // Set the expense details in the input fields for editing
//       setMoneySpent(expenseToEdit.moneySpent);
//       setDescription(expenseToEdit.description);
//       setCategory(expenseToEdit.category);

//       // Set the expense ID being edited
//       setEditExpenseId(expenseId);
//     }
//   };

//   const handleCancelEdit = () => {
//     // Clear the input fields and reset edit state
//     setMoneySpent("");
//     setDescription("");
//     setCategory("");
//     setEditExpenseId(null);
//   };

//   const handleSaveEdit = async () => {
//     if (!moneySpent || !description || !category) {
//       // Ensure all fields are filled out
//       alert("Please fill out all fields.");
//       return;
//     }

//     const updatedExpense = {
//       moneySpent,
//       description,
//       category,
//     };

//     try {
//       // Make a PUT request to update the expense
//       const response = await fetch(`https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses/${editExpenseId}.json`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedExpense),
//       });

//       if (response.ok) {
//         // Clear the input fields and reset edit state
//         setMoneySpent("");
//         setDescription("");
//         setCategory("");
//         setEditExpenseId(null);

//         // Fetch updated expenses from Firebase
//         fetchExpenses();
//         console.log("Expense successfully updated.");
//       } else {
//         console.error("Error editing expense.");
//       }
//     } catch (error) {
//       console.error("Error editing expense:", error);
//     }
//   };

//   const handleDeleteExpense = async (expenseId) => {
//     try {
//       // Make a DELETE request to delete the expense
//       const response = await fetch(`https://expensetracker-4ddaf-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         // Fetch updated expenses from Firebase
//         fetchExpenses();
//         console.log("Expense successfully deleted.");
//       } else {
//         console.error("Error deleting expense.");
//       }
//     } catch (error) {
//       console.error("Error deleting expense:", error);
//     }
//   };

//   // Apply inline CSS to prevent horizontal scrolling
//   const bodyStyle = {
//     overflowX: 'hidden',
//   };

//   return (
//     <div style={bodyStyle}>
//       <Container className="mt-4">
//         <Card>
//           <Card.Header 
//                 style={{
//         backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
//               fontWeight: "bolder",
//        color:"white"
//       }}
//           >
//             <h2>Add Daily Expense</h2>
//           </Card.Header>
//           <Card.Body>
//             <Form>
//               <Form.Group controlId="moneySpent">
//                 <Form.Label>Money Spent</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={moneySpent}
//                   onChange={(e) => setMoneySpent(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="description">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="category">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   <option value="">Select a category</option>
//                   <option value="Food">Food</option>
//                   <option value="Petrol">Petrol</option>
//                   <option value="Salary">Salary</option>
//                   {/* Add more categories as needed */}
//                 </Form.Select>
//               </Form.Group>
//               {editExpenseId ? (
//                 <>
//                   <Button variant="primary" onClick={handleSaveEdit}>Save Edit</Button>
//                   <Button variant="danger" onClick={handleCancelEdit} className="ms-2">Cancel Edit</Button>
//                 </>
//               ) : (
//                 <Button variant="primary" onClick={handleAddExpense}>Add Expense</Button>
//               )}
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       <Container className="mt-4">
//         <Card>
//           <Card.Header
//                    style={{
//         backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
//               fontWeight: "bolder",
//        color:"white"
//       }}>
//             <h2>Expenses List</h2>
//           </Card.Header>
//           <Card.Body>
//             {loading ? (
//               <p>Loading expenses...</p>
//             ) : (
//               <div className="table-responsive">
//                 <ListGroup>
//                   {expenses.map((expense) => (
//                     <ListGroup.Item key={expense.id} className="d-flex justify-content-between">
//                       <div>
//                         Money Spent: {expense.moneySpent}, Description: {expense.description}, Category: {expense.category}
//                       </div>
//                       {editExpenseId === expense.id ? (
//                         <>
//                           <Button variant="primary" onClick={handleSaveEdit} className="me-2">Save</Button>
//                           <Button variant="danger" onClick={handleCancelEdit}>Cancel</Button>
//                         </>
//                       ) : (
//                         <>
//                           <Button variant="primary" onClick={() => handleEditClick(expense.id)} className="me-2">Edit</Button>
//                           <Button variant="danger" onClick={() => handleDeleteExpense(expense.id)}>Delete</Button>
//                         </>
//                       )}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </div>
//             )}
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

export const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState(""); // User's photo URL
  
  const darkMode = useSelector((state) => state.theme.darkMode);
  const userName = localStorage.getItem("userFullName");

  useEffect(() => {
    fetchExpenses();
    // Fetch monthly salary, premium status, and user photo URL here (from local storage or API)
    const storedMonthlySalary =
      parseFloat(localStorage.getItem("monthlySalary")) || 0;
    const storedIsPremium =
      localStorage.getItem("isPremium") === "true" || false;
    const storedUserPhotoUrl = localStorage.getItem("userPhotoUrl") || "";
    setMonthlySalary(storedMonthlySalary);
    setIsPremium(storedIsPremium);
    setUserPhotoUrl(storedUserPhotoUrl);
  }, []);

  useEffect(() => {
    // Calculate balance based on expenses and salary
    const totalExpenses = expenses.reduce(
      (total, expense) => total + parseFloat(expense.moneySpent),
      0
    );

    // Calculate balance including the monthly salary
    const balanceWithSalary = monthlySalary - totalExpenses;

    // Check if the user needs to be upgraded to premium
    if (balanceWithSalary < 0 && !isPremium && Math.abs(balanceWithSalary) > 10000) {
      alert(
        "Your expenses have exceeded Rs. 10,000. Please upgrade to premium."
      );
      // Implement logic to handle the premium upgrade here
      // You can set setIsPremium(true) and update it in local storage
    }

    setBalance(balanceWithSalary);
  }, [expenses, monthlySalary, isPremium]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `https://expensetracker-4ddaf-default-rtdb.firebaseio.com/${userName}.json`
      );

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
      alert("Please fill out all fields.");
      return;
    }

    const newExpense = {
      moneySpent,
      description,
      category,
    };

    try {
      const response = await fetch(
        `https://expensetracker-4ddaf-default-rtdb.firebaseio.com/${userName}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );

      if (response.ok) {
        setMoneySpent("");
        setDescription("");
        setCategory("");
        fetchExpenses();
      } else {
        console.error("Error adding expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEditClick = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);

    if (expenseToEdit) {
      setMoneySpent(expenseToEdit.moneySpent);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
      setEditExpenseId(expenseId);
    }
  };

  const handleCancelEdit = () => {
    setMoneySpent("");
    setDescription("");
    setCategory("");
    setEditExpenseId(null);
  };

  const handleSaveEdit = async () => {
    if (!moneySpent || !description || !category) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedExpense = {
      moneySpent,
      description,
      category,
    };

    try {
      const response = await fetch(
        `https://expensetracker-4ddaf-default-rtdb.firebaseio.com/${userName}/${editExpenseId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (response.ok) {
        setMoneySpent("");
        setDescription("");
        setCategory("");
        setEditExpenseId(null);
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
      const response = await fetch(
        `https://expensetracker-4ddaf-default-rtdb.firebaseio.com/${userName}/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchExpenses();
        console.log("Expense successfully deleted.");
      } else {
        console.error("Error deleting expense.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const categories = [
    "Food",
    "Petrol",
    "Salary",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Shopping",
    "Health",
    "Education",
    "Travel",
  ];

   const generateCSV = () => {
    const csvData = [];
    csvData.push("Money Spent,Description,Category");
    
    expenses.forEach((expense) => {
      const row = `${expense.moneySpent},${expense.description},${expense.category}`;
      csvData.push(row);
    });

    return csvData.join("\n");
  };

    const downloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Container className="mt-4">
        <Card>
          <Card.Header className="text-white text-center"
           style={{
                backgroundImage: darkMode
                  ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
                  : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                textAlign: "center",
              }}>
            <div className="d-flex align-items-center justify-content-center">
              {userPhotoUrl && (
                <img
                  src={userPhotoUrl}
                  alt="User"
                  className="user-photo"
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                />
              )}
              <h2 style={{
                fontSize: "1.5rem", fontWeight: "bold",
                color: darkMode ? "black" : "white",margin:"10px"}}>
                Add Daily Expense
              </h2>
            </div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="moneySpent">
                <Form.Label className="fw-bold">Money Spent</Form.Label>
                <Form.Control
                  type="text"
                  value={moneySpent}
                  onChange={(e) => setMoneySpent(e.target.value)}
                  placeholder="Enter amount spent"
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="monthlySalary">
                <Form.Label className="fw-bold">Monthly Salary</Form.Label>
                <Form.Control
                  type="number"
                  value={monthlySalary}
                  onChange={(e) =>
                    setMonthlySalary(parseFloat(e.target.value))
                  }
                  placeholder="Enter monthly salary"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddExpense} className="m-4"
              style={{ backgroundImage: darkMode
            ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
                  : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", color: darkMode ? "black" : "white",
                fontWeight: "bolder"}}>
                Add Expense
              </Button>
            </Form>
          </Card.Body>
        </Card>
             <Button
          variant="success"
          onClick={downloadCSV}
          className="m-4"
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
              : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
            color: darkMode ? "black" : "white",
            fontWeight: "bolder",
          }}
        >
          Download File
        </Button>
      </Container>

      <Container className="mt-4">
        <Card>
          <Card.Header className="text-white text-center"
       style={{ backgroundImage: darkMode
            ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
                  : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                fontWeight: "bolder"}}>
            <div className="d-flex align-items-center justify-content-center">
              {userPhotoUrl && (
                <img
                  src={userPhotoUrl}
                  alt="User"
                  className="user-photo"
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                />
              )}
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: darkMode ? "black" : "white",margin:"10px" }}>
                Expenses List
              </h2>
            </div>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <p>Loading expenses...</p>
            ) : (
              <div className="table-responsive">
                <ListGroup className="expense-list">
                  {expenses.map((expense) => (
                    <ListGroup.Item
                      key={expense.id}
                      className="d-flex justify-content-between align-items-center expense-item"
                    >
                      <div className="expense-details">
                        <div className="expense-info" style={{textAlign:"start"}}>
                          <span className="expense-label"
                          style={{textAlign:"start",fontWeight:"bold"}}>Money Spent : </span>{" "}
                          <span style={{fontWeight : "bolder",color:"grey"}}>Rs </span>{expense.moneySpent}
                        </div>
                        <div className="expense-info" style={{textAlign:"start"}}>
                          <span className="expense-label"
                          style={{textAlign:"start",fontWeight:"bold"}}>Description :</span>{" "}
                          {expense.description}
                        </div>
                        <div className="expense-info" style={{textAlign:"start"}}>
                          <span className="expense-label"
                          style={{textAlign:"start",fontWeight:"bold"}}>Category :</span>{" "}
                          {expense.category}
                        </div>
                      </div>
                      {editExpenseId === expense.id ? (
                        <div className="expense-actions">
                          <Button variant="primary" onClick={handleSaveEdit}>
                            Save
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleCancelEdit}
                            className="ms-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="expense-actions">
                          <Button
                            variant="primary"
                            onClick={() => handleEditClick(expense.id)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-4">
        <Card>
          <Card.Header className="text-white text-center"
       style={{
                backgroundImage: darkMode
                  ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
                  : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                textAlign: "center",
              }}>
            <div className="d-flex align-items-center justify-content-center"
           >
              <h2 style={{
                fontSize: "1.5rem", fontWeight: "bold", margin: "10px",
              color : darkMode ? "black" : "white"}}>
                Balance
              </h2>
            </div>
          </Card.Header>
          <Card.Body>
            <h5
            style={{color:"black",fontWeight:"bolder"}}>Your monthly balance :<span style={{color:"grey"}}> Rs. {balance}</span></h5>
            {balance < 0 && !isPremium && (
              <Button
                style={{
                  backgroundImage: "linear-gradient(to right, #f9d423 0%, #ff4e50 100%)", color: "black",
                fontWeight:"bolder"}}
                onClick={() => alert("Please upgrade to premium.")}
              >
                Upgrade to Premium
              </Button>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
