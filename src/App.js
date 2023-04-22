import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTransaction from "./Components/EditTransaction";
import NavBar from "./Components/NavBar";
import NewTransaction from "./Components/NewTransaction";
import Home from "./Components/Home";
import Error from "./Components/Error";
// import { useState, useEffect } from "react";
// const axios from "axios";

const API = process.env.REACT_APP_API_URL


export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction-index" element={<TransactionIndex />} /> */}
          <Route path="/new-transaction" element={<NewTransaction />} />
          <Route path="/edit-transaction" element={<EditTransaction />} />
          <Route path='*' element={<Error />} />

        </Routes>
      </Router>
    </div>
  )
}