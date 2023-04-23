import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function EditTransaction() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [editTransaction, setEditTransaction] = useState({
    id: "",
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
    deposit: false,
  });

  const handleTextChange = (event) => {
    setEditTransaction({ ...editTransaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setEditTransaction({ ...editTransaction, deposit: !editTransaction.deposit });
  };
  // const handleNumberChange = (event) => {
  //   setTransaction({ ...transaction, [event.target.id]: event.target.value });
  // };

  // const handleSelectChange = (event) => {
  //   setTransaction({ ...transaction, [event.target.id]: event.target.value });
  // };

  useEffect(() => {
    axios
      .get(`${API}/Transactions/${id}`)
      .then((response) => {
        setEditTransaction(response.data)
      })
      .catch((e) => console.error(e))
  }, [id]);

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${id}`, editTransaction)
      .then((response) => {
        setEditTransaction(response.data);
        navigate(`/transactions/${id}`)
      }
      )
      .catch((e) => console.error(e));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction(editTransaction);
  };

  return (
    <div className="edit">
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
          onChange={handleTextChange}
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