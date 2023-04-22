import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;


export default function TransactionIndex() {

    const [transaction, settransaction] = useState({});

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`${API}/transactions/${id}`)
          .then((response) => {
            console.log(response.data);
            settransaction(response.data);
          })
      }, [id]);

    const handleDelete = () => {
        axios
        .delete(`${API}/transactions/${id}`)
        .then(() => {
            navigate(`/transactions`);
          })
        .catch((e) => console.error(e))
       };

    return (
        <div>
            <aside className="stuff">
            <span><b>Category:</b> {transaction.category}</span>
            <span>{transaction.date}</span>
            <span>{transaction.item_name}</span>
            <span>{transaction.amount}</span>
            <span> {transaction.from}</span>
            <section>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/edit/${id}`}>
                <button>Edit</button>
            </Link>
            <Link to={`/transactions`}>
                <button>Go Back</button>
            </Link>
            </section>
            </aside>
        </div>
    )
};