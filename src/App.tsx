import React from "react";
import "./App.css";
import FlavanoidsStatistics from "./components/FlavanoidsStatistics/FlavanoidsStatistics";
import GammaStatistics from "./components/GammaStatistics/GammaStatistics";

function App() {
  return (
    <div className="App">
      <h1>Wine Statistics</h1>
      <FlavanoidsStatistics className="statistics-table" />
      <GammaStatistics className="statistics-table" />
    </div>
  );
}

export default App;
