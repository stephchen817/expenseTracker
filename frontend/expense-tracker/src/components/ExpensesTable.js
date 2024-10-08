import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function ExpensesTable() {
    const [expenses, setExpenses] = useState([]);
    const [sum, setSum] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [showNewRow, setShowNewRow] = useState(false);
    const [newExpense, setNewExpense] = useState({
        category: '',
        amount: '',
        account: '',
        description: ''
    });
    const [selectedIds, setSelectedIds] = useState([]);
    const [editExpenseId, setEditExpenseId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExpense({
            ...newExpense,
            [name]: value
        });
    };

    const handleCheckboxChange = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const addRow = () => {
        setShowNewRow(true);
    };

    const cancelRow = () => {
        setNewExpense({ category: '', amount: '', account: '', description: '' });
        setShowNewRow(false);
    };

    const editRow = (expense) => {
        setEditExpenseId(expense.expenseId);

        setNewExpense({
            category: expense.category,
            amount: String(expense.amount).replace('₱',''),
            account: expense.account,
            description: expense.description
        });
    };

    const accountTypeOptions = [
        'Cash',
        'Credit Card',
        'Debit Card',
        'E-Wallet'
    ];

    const categoryOptions = [
        'Food',
        'Bills',
        'Transportation',
        'Shopping',
        'Health',
        'Others'
    ];


    const fetchAllRecords = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/fetchAllRecords');
            const data = JSON.parse(response.data.data);
            setExpenses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllRecords();
    }, []);

    const createRecord = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/createRecord', newExpense);
            alert('Record saved successfully!');
            setData([...data, newExpense]);
            setNewExpense({ category: '', amount: '', account: '', description: '' });
            setShowNewRow(false);

            // Automatically refreshes the table when a new record is added
            fetchAllRecords();
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save record!')
        }
    };

    const deleteRecord = async (id) => {
        try {
            const url = `http://127.0.0.1:5000/deleteRecord/${id}`;
            const response = await axios.delete(url);
            setExpenses(expenses.filter(expense => expense.expenseId !== id));
            console.log('Response:', response.data);
            alert('Record successfully deleted!');

            // Automatically refreshes the table when a new record is deleted
            fetchAllRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
            alert('Failed to delete record!');
        }
    };

    const editRecord = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/editRecord/${editExpenseId}`, newExpense);
            alert('Record successfully updated!');
            fetchAllRecords();
            setEditExpenseId(null);
            setNewExpense({ category: '', amount: '', account: '', description: '' });
            setSelectedIds([]);
        } catch (error) {
            console.error('Error updating record:', error);
            alert('Failed to update record!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    return (
        <div className="expensesTableContainer">
            <Container class>
                <Container className="addButtonContainer">
                    <Button
                        onClick={addRow}
                        variant="primary"
                        id="addButton"
                    >
                        + Add New Expenses
                    </Button>
                </Container>
                <Container>
                    <Table id="expensesTable" className="expensesTable" size="sm" hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Account</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map(expense => (
                                    <tr key={expense.expenseId}>
                                        <td>
                                            <Form.Check
                                                checked={selectedIds.includes(expense.expenseId)}
                                                onChange={() => handleCheckboxChange(expense.expenseId)}
                                            />
                                        </td>
                                        {editExpenseId === expense.expenseId ? (
                                            <>
                                                <td>
                                                    <Form.Select name="category" value={newExpense.category} onChange={handleInputChange} required>
                                                        <option value="">Select a category...</option>
                                                        {categoryOptions.map((option, index) => (
                                                            <option key={index} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <InputGroup className="mb-3" required>
                                                        <InputGroup.Text>₱</InputGroup.Text>
                                                        <Form.Control
                                                            name="amount"
                                                            value={newExpense.amount}
                                                            onChange={handleInputChange}
                                                        />
                                                    </InputGroup>
                                                </td>
                                                <td>
                                                    <Form.Select name="account" value={newExpense.account} onChange={handleInputChange}>
                                                        <option value="">Select account type...</option>
                                                        {accountTypeOptions.map((option, index) => (
                                                            <option key={index} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        name="description"
                                                        value={newExpense.description}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Button
                                                        id="saveButton"
                                                        variant="success"
                                                        className="primaryButton"
                                                        onClick={editRecord}
                                                    >
                                                        <i class="bi bi-floppy-fill" />
                                                        Save
                                                    </Button>
                                                    <Button
                                                        id="cancelButton"
                                                        className="dangerButton"
                                                        variant="danger"
                                                        onClick={() => setEditExpenseId(null)}
                                                    >
                                                        <i class="bi bi-x-circle-fill" />
                                                        Cancel
                                                    </Button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{expense.category}</td>
                                                <td>{expense.amount}</td>
                                                <td>{expense.account}</td>
                                                <td>{expense.description}</td>
                                                <td>
                                                    <Button
                                                        className="primaryButton"
                                                        id="#editButton"
                                                        variant="primary"
                                                        onClick={() => editRow(expense)}
                                                    >
                                                        <i class="bi bi-pencil-fill" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="dangerButton"
                                                        id="#deleteButton"
                                                        variant="danger"
                                                        onClick={() => deleteRecord(expense.expenseId)}
                                                    >
                                                        <i class="bi bi-trash-fill" />
                                                        Delete
                                                    </Button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5"> No recorded expenses. Click "Add Expense" to record your expenses. </td>
                                </tr>
                            )}
                            {
                                showNewRow && (
                                    <tr>
                                        <td>
                                            <Form.Check disabled />
                                        </td>
                                        <td>
                                            <Form.Select name="category" value={newExpense.category} onChange={handleInputChange}>
                                                <option value="">Select a category...</option>
                                                {categoryOptions.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>₱</InputGroup.Text>
                                                <Form.Control name="amount" onChange={handleInputChange} placeholder='xxx.xx' />
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <Form.Select name="account" value={newExpense.accountType} onChange={handleInputChange}>
                                                <option value="">Select account type...</option>
                                                {accountTypeOptions.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <InputGroup>
                                                <Form.Control name="description" onChange={handleInputChange} placeholder='Enter description...' />
                                            </InputGroup>
                                        </td>
                                        <td>
                                                <Button 
                                                    className="primaryButton"
                                                    id="saveButton"
                                                    onClick={createRecord}
                                                >
                                                    <i class="bi bi-floppy-fill" /> Save
                                                </Button>
                                                <Button 
                                                    className="dangerButton"
                                                    id="cancelButton"
                                                    variant="danger"
                                                    onClick={cancelRow}
                                                >
                                                    <i class="bi bi-x-circle-fill" /> Cancel
                                                </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </div>
    );
};

export default ExpensesTable;

