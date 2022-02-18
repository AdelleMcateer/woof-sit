import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllSitters } from "../redux/actions/sittersActions";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  const { sitters } = useSelector((state) => state.sittersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSitters());
  }, []);

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {sitters.map((sitter) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="sitter p-2 bs1">
                <img src={sitter.image} className="sitterimg" />

                <div className="sitter-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{sitter.name}</p>
                    <p> Rate Per Hour {sitter.ratePerHour} /-</p>
                  </div>

                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/booking/${sitter._id}`}>Book Now</Link>
                    </button>
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

export default Home;
