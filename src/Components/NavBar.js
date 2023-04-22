import { Link } from "react-router-dom";

export default function NavBar({ total }) {
  return (
    <nav>
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <h1>
        <Link to="/transactions">Transactions</Link>
      </h1>
      <button>
        NewTransaction
        {/* <Link to="new-transaction">New Transaction</Link> */}
      </button>
    </nav>
  );
}