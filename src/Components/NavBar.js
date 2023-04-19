import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/bookmarks">Transaction</Link>
      </h1>
      <button>
        <Link to="/bookmarks/new">New Transaction</Link>
      </button>
    </nav>
  );
}