import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
    });

    const handleTextChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };

    const handleNumberChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };

    const handleSelectChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };

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
            <label htmlFor="date">Date:</label>
            <input
              className="form-control"
              id="date"
              value={transaction.date}
              type="text"
              onChange={handleTextChange}
              placeholder="date"
              required
            />
            <br />
            <label htmlFor="item_name" className="form-label">Name:</label>
            <input
              className="form-control"
              id="itemName"
              type="text"
              value={transaction.itemName}
              onChange={handleTextChange}
              placeholder="Name"
              required
            />
            <br />
            <label className="form-label" htmlFor="amount">
              Amount:
            </label>
            <input
              className="form-control"
              id="amount"
              type="number"
              value={transaction.amount}
              onChange={handleNumberChange}
              required
            />
            <br />
            <label htmlFor="form-label">Category:</label>
            <select
              className="form-select"
              id="category"
              type="text"
              checked={transaction.category}
              onChange={handleSelectChange}
            >
              <option value="income">Income</option>
              <option value="gift">Gift</option>
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="medical">Medical</option>
              <option value="bill">Bill</option>
              <option value="groceries">Groceries</option>
              <option value="transportation-related">Transportation-related</option>
            </select>
            <br />

                <input type="submit" />
            </form>
            <Link to={`/Transactions/${id}`}>
                <button>Nevermind!</button>
            </Link>
        </div>
    );
}