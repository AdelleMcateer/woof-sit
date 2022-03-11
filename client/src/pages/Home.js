import React, { useState, useEffect } from "react";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllSitters } from "../redux/actions/sittersActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";

const { RangePicker } = DatePicker;
function Home() {
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

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var sitter of sitters) {
      if (sitter.bookedTimeSlots.length == 0) {
        temp.push(sitter);
      } else {
        for (var booking of sitter.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(sitter);
          }
        }
      }
    }
    setTotalSitters(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <Row>
            {" "}
            <div className="d-flex justify-content-between align items-center">
              <h3 className="mt-1 mr-2">Book a Pet Sitter</h3>
            </div>
          </Row>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>

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
                    <p> Rent Per Hour {sitter.ratePerHour} /-</p>
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
