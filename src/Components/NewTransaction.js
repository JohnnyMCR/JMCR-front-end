import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function NewTransaction() {
  const navigate = useNavigate();
  const [Transaction, setTransaction] = useState({
    name: "",
    url: "",
    category: "",
    isFavorite: false,
    description: "",
  });

  const handleTextChange = (event) => {
    setTransaction({ ...Transaction, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setTransaction({ ...Transaction, isFavorite: !Transaction.isFavorite });
  };

  const addTransaction = (newTransaction) => {
    axios
      .post(`${API}/Transactions`, newTransaction)
      .then(() => {
        navigate('/Transactions');
      }).catch((c) => console.error("catch", c))
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction()
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={Transaction.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={Transaction.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={Transaction.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={Transaction.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={Transaction.description}
          onChange={handleTextChange}
          placeholder="Describe why you Transactioned this site"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewTransaction;