import React from "react";
import { Row, Col, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Spinner from "../components/Spinner";
// ..
AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(userRegister(values));
    console.log(values);
  }

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex aligh-items-center">
        <Col lg={16} style={{ positon: "relative" }}>
          <img
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://cdn.pixabay.com/photo/2019/04/10/23/51/dog-4118585_960_720.jpg"
          ></img>
          <h1 className="login-logo">WoofSit</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <Radio.Group>
              <Radio value={1}>Pet Owner</Radio>
              <Radio value={2}>Pet Sitter</Radio>
            </Radio.Group>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confrim Password"
              rules={[{ required: true }]}
            >
              <Input></Input>
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>

            <br />

            <Link to="/login">Click here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
