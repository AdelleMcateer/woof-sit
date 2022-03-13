import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

function Home() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.alertsReducer);

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex aligh-items-center">
        <Col lg={16} style={{ positon: "relative" }}>
          <img
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://cdn.pixabay.com/photo/2019/04/10/23/51/dog-4118585_960_720.jpg"
          ></img> 
          <h1 className="login-logo">Welcome to WoofSit</h1>
          <h2>Connect with Pet Sitters and Pet Owners in your area </h2>
          
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
        </Col>
      
      </Row>
    </div>
  );
}


export default Home;
