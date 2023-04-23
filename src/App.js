import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTransaction from "./Components/EditTransaction";
import NavBar from "./Components/NavBar";
import NewTransaction from "./Components/NewTransaction";
import Home from "./Components/Home";
import Error from "./Components/Error";
import TransactionIndex from "./Components/TransactionIndex";
import Transactions from "./Components/Transactions";

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transaction/:id" element={<TransactionIndex />} />
          <Route path="/transaction/new" element={<NewTransaction />} />
          <Route path="/transaction/edit/:id" element={<EditTransaction />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}