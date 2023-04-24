import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { v4 as uuid } from "uuid";
const API = process.env.REACT_APP_API_URL;

export default function EditTransaction() {
  const navigate = useNavigate();
  let { id } = useParams();
  
  const [transaction, setTransaction] = useState({
    id: "",
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
    deposit: false,
  });

  // const id = uuid();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${id}`)
      .then((response) => {
        setTransaction(response.data);
      })
  }, [id]);

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, deposit: !transaction.deposit });
  };

  const editTransaction = (changeTransaction) => {
    axios
      .post(`${API}/transactions`, changeTransaction)
      .then(() => {
        navigate('/transactions');
      }).catch((c) => console.error("catch", c))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    transaction.id = id;
    editTransaction(transaction)
  };

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="item_name"
          value={transaction.item_name}
          required
          type="text"
          placeholder="Name of item"
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="type"
          required
          placeholder="$"
          value={transaction.amount}
          onChange={handleTextChange}
        />
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="type"
          required
          placeholder="DD-MM-YYYY"
          value={transaction.date}
          onChange={handleTextChange}
        />
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          required
          placeholder="supermarket, bus, ..."
          value={transaction.from}
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          required
          placeholder="expenses, tranportation, ..."
          value={transaction.category}
          onChange={handleTextChange}
        />
        <label htmlFor="deposit">Deposit:</label>
        <input
          id="deposit"
          type="checkbox"
          name="deposit"
          onChange={handleCheckboxChange}
          checked={transaction.deposit}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}