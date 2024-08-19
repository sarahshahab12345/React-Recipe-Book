import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Favorites from "./Components/Favorites";
import Search from "./Components/Search";

function App() {
  return (
    <>
      <Search />
   <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
