import React, { useState, useEffect } from "react";
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllSitters } from "../redux/actions/sittersActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function AdminHome() {
  const { sitters } = useSelector((state) => state.sittersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalSitters, setTotalSitters] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSitters());
  }, []);

  useEffect(() => {
    setTotalSitters(sitters);
  }, [sitters]);

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalSitters.map((sitter) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="sitter p-2 bs1">
                <img src={sitter.image} className="sitterimg" />

                <div className="sitter-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{sitter.name}</p>
                    <p> Rate Per Hour {sitter.ratePerHour} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editsitter/${sitter._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
