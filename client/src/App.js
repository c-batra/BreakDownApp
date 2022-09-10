import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import Profile from "./Profile";
import LogInPage from "./LogInPage";
import Homepage from "./Homepage";
import { Provider } from "react-redux";
import "./App.css";
import store from "./store";

const App = () => {
  // fetch("localhost:8000/api/inventory");

  return (
    <div>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        Splitter
      </span>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogInPage />}></Route>
          <Route exact path="/home" element={<Homepage />}></Route>
          <Route exact path="/create-group" element={<CreateGroup />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
