import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function EditTransaction() {
    const navigate = useNavigate();
    let { index } = useParams();

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
            .get(`${API}/Transactions/${index}`)
            .then((response) => {
                setTransaction(response.data)
            })
            .catch((e) => console.error(e))
    }, [index]);

    const updateTransaction = () => {
        axios
            .put(`${API}/transactions/${index}`, transaction)
            .then((response) => {
                setTransaction(response.data);
                navigate(`/transactions/${index}`)
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
                    className="form-edit"
                    id="date"
                    value={transaction.date}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="date"
                    required
                />
                <label htmlFor="url">URL:</label>
                <input
                    id="url"
                    type="text"
                    pattern="http[s]*://.+"
                    required
                    value={transaction.url}
                    placeholder="http://"
                    onChange={handleTextChange}
                />
                <label htmlFor="category">Category:</label>
                <input
                    id="category"
                    type="text"
                    name="category"
                    value={transaction.category}
                    placeholder="educational, inspirational, ..."
                    onChange={handleTextChange}
                />
                <label htmlFor="isFavorite">Favorite:</label>
                <input
                    id="isFavorite"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={transaction.isFavorite}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={transaction.description}
                    onChange={handleTextChange}
                    placeholder="Describe why you Transactioned this site"
                />
                <br />

                <input type="submit" />
            </form>
            <Link to={`/Transactions/${index}`}>
                <button>Nevermind!</button>
            </Link>
        </div>
    );
}

export default EditTransaction;