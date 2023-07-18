import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landpage from "./componets/Landpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landpage do="login" />}></Route>
          <Route path="/signup" element={<Landpage do="signup" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
