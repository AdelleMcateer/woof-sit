import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingSitter from "./pages/BookingSitter";
import UserBookings from "./pages/UserBookings";
import "antd/dist/antd.css";
import AddSitter from "./pages/AddSitter";
import AdminHome from "./pages/AdminHome";
import EditSitter from "./pages/EditSitter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <BrowserRouter>
          <Route path="/" exact component={Home} />

          <ProtectedRoute
            path="/booking/:sitterid"
            exact
            component={BookingSitter}
          />
          <ProtectedRoute path="/userbookings" exact component={UserBookings} />
          <ProtectedRoute path="/addsitter" exact component={AddSitter} />
          <ProtectedRoute
            path="/editsitter/:sitterid"
            exact
            component={EditSitter}
          />
          <ProtectedRoute path="/admin" exact component={AdminHome} />
        </BrowserRouter>{" "}
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
