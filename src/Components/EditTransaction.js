import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function EditTransaction() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [transaction, editTransaction] = useState({
    id: "",
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
    deposit: false,
  });

  function handleTextChange (event) {
    editTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

 function handleNumberChange (event) {
    editTransaction({ ...transaction, [event.target.id]: Number (event.target.value)});
  };

  const handleCheckboxChange = () => {
    editTransaction({ ...transaction, deposit: !transaction.deposit });
  };

  // const handleSelectChange = (event) => {
  //   setTransaction({ ...transaction, [event.target.id]: event.target.value });
  // };

  function handleSubmit (event) {
    event.preventDefault();
    updateTransaction(transaction);
  };

  useEffect(() => {
    axios
      .get(`${API}/transactions/${id}`)
      .then((response) => {
        editTransaction(response.data.transactions);
      })
      .catch((e) => console.error("catch", e))
  }, [id]);

  function updateTransaction () {
    axios
      .put(`${API}/transactions/${id}`, transaction)
      .then(() => {
        navigate(`/transactions/${id}`)
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="editTransaction">
      <form className="edit" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="item_name"
          value={editTransaction.item_name}
          required
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="text"
          required
          value={editTransaction.amount}
          onChange={handleNumberChange}
        />
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="text"
          required
          value={editTransaction.date}
          onChange={handleTextChange}
        />
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          required
          value={editTransaction.from}
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          required
          value={editTransaction.category}
          onChange={handleTextChange}
        />
        <label htmlFor="deposit">Deposit:</label>
        <input
          id="deposit"
          type="checkbox"
          name="deposit"
          onChange={handleCheckboxChange}
          checked={editTransaction.deposit}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}