import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTransaction from "./Components/EditTransaction";
import NavBar from "./Components/NavBar";
import NewTransaction from "./Components/NewTransaction";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction-index" element={<TransactionIndex />} />
          <Route path="/new-transaction" element={<NewTransaction />} />
          <Route path="/edit-transaction" element={<EditTransaction />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App;
