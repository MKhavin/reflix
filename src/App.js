import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import UserLogin from "./components/UserLogin";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element=<UserLogin /> />
        <Route element=<NavBar />>
          <Route path="/user/:userId" element={null} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
