import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Todos from "./components/Todos";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <main className="app">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
