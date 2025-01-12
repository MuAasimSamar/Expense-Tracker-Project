import { useState } from "react";
import Input from "./input";
import Select from "./Select";

export default function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const [errors, setErrors] = useState({});

  const validationconfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minlength: 2, message: "Title should be at least 2 characters long" },
    ],
    category: [{ required: true, message: "Please select a Category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { isNumber: true, message: "Amount must be a valid number." },
    ],
    // email: [
    //   { required: true, message: "Please enter email" },
    //   {
    //     pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     message: "Please enter a valid email",
    //   },
    // ],
  };

  const validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, val]) => {
      validationconfig[key].some((rule) => {
        if (rule.required && !val) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.minlength && val.length < rule.minlength) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(val)) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.isNumber && isNaN(Number(val))) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorData);
    return errorData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return; //here we read error length

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setEditingRowId("");
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      return;
    }

    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((prev) => {
      return { ...prev, [name]: value }; //square brackets are required to dynamically compute the property key based
    });
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        defaultOption="Select Category"
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
}
