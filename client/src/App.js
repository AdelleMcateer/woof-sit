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
import SitterHome from "./pages/SitterHome";
import PetHome from "./pages/PetHome";
import Profile from "./pages/Profile";
import BookingPet from "./pages/BookingPet";
import UserPetBookings from "./pages/UserPetBookings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Home} />

        <Route path="/sitterhome" exact component={SitterHome} />
        <Route path="/pethome" exact component={PetHome} />

        <Route path="/booking/:sitterid" exact component={BookingSitter} />
        <Route path="/bookingpet/:petid" exact component={BookingPet} />
        
        
        <Route path="/userbookings" exact component={UserBookings} />
        <Route path="/userpetbookings" exact component={UserPetBookings} />
        
        <Route path="/addsitter" exact component={AddSitter} />
        <Route path="/editsitter/:sitterid" exact component={EditSitter} />
        <Route path="/admin" exact component={AdminHome} />
        <Route path="/profile" exact component={Profile} />
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
