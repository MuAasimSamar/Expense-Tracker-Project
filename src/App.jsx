import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseData from "./components/ExpenseData";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage('expense',{
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage('expenses',ExpenseData);
  const [editingRowId, setEditingRowId]= useLocalStorage('editingRowId', '');
  

  return (
    <>
      <main>
        <h1>Track Your Expense <span style={{color: 'red'}}>(You can right-click to edit or delete a row in the table)</span></h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          />
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            setExpense={setExpense}
            setEditingRowId={setEditingRowId}
          />
        </div>
      </main>
    </>
  );
}

export default App;
