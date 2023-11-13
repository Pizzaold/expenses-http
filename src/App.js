import React, { useEffect, useState } from 'react';
import './App.css';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSE = [
  {
    id: 'e1',
    date: new Date(2023, 0, 10),
    title: 'New book',
    amount: 30.99,
  },
  {
    id: 'e2',
    date: new Date(2022, 2, 15),
    title: 'New TV',
    amount: 100.99,
  },
  {
    id: 'e3',
    date: new Date(2023, 10, 2),
    title: 'New PC',
    
    amount: 2000,
  },
  {
    id: 'e4',
    date: new Date(2021, 5, 5),
    title: 'New Phone',
    amount: 500,
  },
]

const App = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const response = await fetch('http://localhost:3005/express')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error('Failed fetching data')
        }
      } catch (error) {
        setError({
          title: 'An error occured!',
          message: 'Failed fetching expenses data!'
        })
      }
      const response = await fetch('http://localhost:3005/express')
      const responseData = await response.json()
      setExpenses(responseData.expenses)
      setIsFetching(false)
    }
    getExpenses()
    console.log(expenses)
  }, [])

  const addExpenseHandler = async (expense) => {
    try {
      const response = await fetch('http://localhost:3005/add-expense', {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error('Failed adding expense')
      }
    } catch (error) {
      setError({
        title: 'An error occured!',
        message: 'Failed adding expense!'
      })
      setShowError(true)
    }
    console.log('In App.js')
    setExpenses((previousExpenses) => {
      return [expense, ...previousExpenses]
    })
  }

  console.log(expenses)

  return (
    <div className='App'>
      <NewExpense onAddExpense={addExpenseHandler}></NewExpense>
      <Expenses expenses={expenses} isLoading={isFetching}></Expenses>
    </div>
  );
}

export default App;
