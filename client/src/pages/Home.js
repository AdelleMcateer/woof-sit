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
          <h1 className="login-logo">WoofSit</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5">
            <h1>Welcome to WoofSit</h1>
            <Form.Item label="Find Sitters and Owners in your area!"
            ></Form.Item>
            <Form.Item label="For the safety of our pets and owners please register to access!
            "></Form.Item>
            <Form.Item label="Please email a copy of your idenitfication to woofsit@gmail.com. 
            Unverified users will be removed after 7 days."></Form.Item>
            <Link to="/register">Click here to register</Link>
            <hr />
            <div>
              <br />
              <h1>Testimonials</h1>
             
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
