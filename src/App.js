import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Movie from "./Components/Movie";
import Search from "./Components/Search";
import AddNewMovie from "./Components/AddNewMovie";
import Genre from "./Components/Genre";
export const BackendConnectionURL = "https://movie-bot-06u4.onrender.com/";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/downloads" element={<Login />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/genre/:id" element={<Genre />} />
          <Route path="/search" element={<Search />} />
          <Route path="/new" element={<AddNewMovie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
