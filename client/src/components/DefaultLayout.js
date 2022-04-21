import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = (
    <Menu style={{ width: 160 }} mode="inline">
      <Menu.Item>
        <UserOutlined style={{ color: "orangered" }}></UserOutlined>
        <a href="/profile">Edit Profile</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/sitterhome">Book a Pet Sitter</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/pethome">Book a Pet</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userpetbookings">Pet Bookings</a>
      </Menu.Item>

      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li style={{ color: "orangered" }}>Logout</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link to="/sitterhome" style={{ color: "orangered" }}>
                    WoofSit
                  </Link>
                </b>
              </h1>

              <Dropdown overlay={menu} placement="bottomCenter">
                <MenuUnfoldOutlined
                  style={{ color: "orangered" }}
                  mode="inline"
                >
                  {user.username}
                </MenuUnfoldOutlined>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr />
        <p>Designed and Developed By</p>

        <p>Adelle McAteer</p>
      </div>
    </div>
  );
}

export default DefaultLayout;
