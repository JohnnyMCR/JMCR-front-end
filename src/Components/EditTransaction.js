import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function EditTransaction() {
    const navigate = useNavigate();
    let { index } = useParams();

    const [Transaction, setTransaction] = useState({
        name: "",
        url: "",
        category: "",
        description: "",
        isFavorite: false,
    });

    const handleTextChange = (event) => {
        setTransaction({ ...Transaction, [event.target.id]: event.target.value });
    };

    const handleCheckboxChange = () => {
        setTransaction({ ...Transaction, isFavorite: !Transaction.isFavorite });
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
            .put(`${API}/Transactions/${index}`, Transaction)
            .then((response) => {
                setTransaction(response.data);
                navigate(`/Transactions/${index}`)
            }
            )
            .catch((e) => console.warn("warn", e));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateTransaction();
    };

    return (
        <div className="Edit">
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
            <Link to={`/Transactions/${index}`}>
                <button>Nevermind!</button>
            </Link>
        </div>
    );
}

export default EditTransaction;