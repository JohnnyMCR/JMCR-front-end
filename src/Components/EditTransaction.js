import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

export default function EditTransaction() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [transaction, setTransaction] = useState({
    id: "",
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: "",
    deposit: false,
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, deposit: !transaction.deposit });
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
        setTransaction(response.data)
      })
      .catch((e) => console.error(e))
  }, [id]);

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${id}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${id}`)
      }
      )
      .catch((e) => console.error(e));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction(EditTransaction);
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          id="item_name"
          value={transaction.item_name}
          required
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          
        />
        <label htmlFor="Amount">Amount:</label>
        <input
          id="amount"
          type="text"
          required
          value={transaction.amount}
          onChange={handleTextChange}
        />
        <label htmlFor="Date">Date:</label>
        <input
          id="date"
          type="text"
          required
          value={transaction.date}
          onChange={handleTextChange}
        />
         <label htmlFor="From">From:</label>
        <input
          id="from"
          type="text"
          required
          value={transaction.from}
          onChange={handleTextChange}
        />
         <label htmlFor="Category">Category:</label>
        <input
          id="category"
          type="text"
          required
          value={transaction.category}
          onChange={handleTextChange}
        />
        <label htmlFor="Deposit">Deposit:</label>
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