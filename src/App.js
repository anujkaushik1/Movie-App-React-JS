import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Favourites from "./Components/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Movies/>}/>
        <Route path='/favourites' element={<Favourites/>} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
