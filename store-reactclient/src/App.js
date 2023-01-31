import "./App.css";
import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Games from "./components/games/Games";

function App() {
  return (
    <div className="App">
      <Header />
      <Games />
      <Footer />
    </div>
  );
}

export default App;
