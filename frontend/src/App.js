import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landpage from "./componets/Landpage";
import Home from "./componets/Home";
import UserState from "./context/UserState";

function App() {
  return (
    <>
    <UserState>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landpage do="login" />}></Route>
          <Route path="/signup" element={<Landpage do="signup" />}></Route>
          <Route path="/home" element={<Home />}></Route>

        </Routes>
      </BrowserRouter>
      </UserState>
    </>
  );
}

export default App;
