import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;

export default function Transaction() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      axios
        .get(`${API}/transactions`)
        .then((response) => {
          console.log(response.data);
          setTransactions(response.data);
        })
    }, []);

    let total = transactions.reduce((a, statement) => {
    
        if(statement.deposit){
            return (a + Number(statement.amount))
        } else {
            return (a - Number(statement.amount))
        }
    },0)


    return (
        <div>
            <header className="total">
                <h3>Bank Account Total: <span style={{color: total > 0 ? "green" : "red"}}>${total}</span></h3>
            </header>
            {transactions.map((statement) => {
                return (
                    <div key={statement.id} className="transactions">
                        <span>{statement.date}</span>
                        <Link to={`/transactions/${transactions.indexOf(statement)}`}>
                        <h3>{statement.item_name}</h3>
                        </Link>
                        <span style={{color: statement.deposit ? "green" : "red"}} className="money">{!statement.deposit ? "-": ""}{statement.amount}</span>
                    </div>
                )
            })}
        </div>
    )
};