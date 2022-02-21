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
        <ProtectedRoute path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/booking/:sitterid" exact component={BookingSitter} />
        <Route path="/userbookings" exact component={UserBookings} />
        <Route path="/addsitter" exact component={AddSitter} />
        <Route path="/editsitter/:sitterid" exact component={EditSitter} />
        <Route path="/admin" exact component={AdminHome} />
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
