import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingSitter from "./pages/BookingSitter";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={(Home, ProtectedRoute)} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path="/bookingsitter"
          exact
          component={(BookingSitter, ProtectedRoute)}
        />
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default App;
