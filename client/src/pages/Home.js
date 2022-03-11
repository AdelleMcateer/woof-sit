import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

function Home() {
  return (
    <div className="">
      <p>Welcome to WoofSit</p>
      <p>Connect with Pet Sitters and Pet Owners in your are </p>
      <p>Signup as a Pet Sitter</p>
      <p>Signup as a Pet Owner</p>

      <Link to="/register">Click here to Register</Link>
      <div>
        <br />
        <p>Already have an account</p>
        <Link to="/login">Click here to Login</Link>
      </div>
      <div>
        <br />
        <p>Testimonials</p>
      </div>
    </div>
  );
}

export default Home;
