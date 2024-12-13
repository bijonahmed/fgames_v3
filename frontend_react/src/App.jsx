// src/App.js
import React from "react";
import { Link } from "react-router-dom";
import AppRouter from "./rotuer";
import FullScreenDarkMode from "./components/FullScreenDarkMode";


function App() {

  return (
    <div>
        <FullScreenDarkMode />
        <AppRouter />
    </div>
  );
}

export default App;
