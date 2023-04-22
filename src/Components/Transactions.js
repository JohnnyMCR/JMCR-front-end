import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios
            .get(`${API}/transactions`)
            .then((response) => {
                console.log(response.data);
                setTransactions(response.data);
            })
    }, []);

    let total = transactions.reduce((a, transaction) => {
        if (transaction.deposit) {
            return (a + Number(transaction.amount))
        } else {
            return (a - Number(transaction.amount))
        }
    }, 0)


    return (
        <div>
            <header className="total">
                <h3>Expense Total: <span style={{ color: total > 0 ? "green" : "red" }}>${total}</span></h3>
            </header>
            {transactions.map((transaction) => {
                return (
                    <div key={transaction.id} className="transactions">
                        <span>{transaction.date}</span>
                        <Link to={`/transaction/${transactions.indexOf(transaction)}`}>
                            <h3>{transaction.item_name}</h3>
                        </Link>
                        <span style={{ color: transaction.deposit ? "green" : "red" }} className="money">{!transaction.deposit ? "-" : ""}{transaction.amount}</span>
                    </div>
                )
            })}
        </div>
    )
};