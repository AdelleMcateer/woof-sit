import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingSitter from './pages/BookingSitter';
import 'antd/dist/antd.css';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/Login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/bookingsitter' exact component={BookingSitter} />
      
      </BrowserRouter>

    </div>
  );
}

export default App;
