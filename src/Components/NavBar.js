import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <nav><u>Budgeting App</u></nav>

      <h1>
        <Link to="/">Home</Link>
      </h1>
      <h1>
        <Link to="/transactions">Transactions</Link>
      </h1>
      <button>
        <Link to="/transaction/new">New Transaction</Link>
      </button>
    </nav>
  );
}