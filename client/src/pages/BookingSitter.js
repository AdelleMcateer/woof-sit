import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllSitters } from "../redux/actions/sittersActions";
import { bookSitter } from "../redux/actions/bookingActions";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const { RangePicker } = DatePicker;

function BookingSitter({ match }) {
  const { sitters } = useSelector((state) => state.sittersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [sitter, setsitter] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState();
  const [food, setfood] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (sitters.length == 0) {
      dispatch(getAllSitters());
    } else {
      setsitter(sitters.find((o) => o._id == match.params.sitterid));
    }
  }, [sitters]);

  useEffect(() => {
    setTotalAmount(totalHours * sitter.ratePerHour);
    if (food) {
      setTotalAmount(totalAmount + 1 * totalHours);
    }
  }, [food, totalHours]);

  //Passing times to array
  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      sitter: sitter._id,
      totalHours,
      totalAmount,
      foodRequired: food,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookSitter(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={sitter.image}
            className="sitterimg2 bs1 w-70"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Sitter Details
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>Name : {sitter.name}</p>
            <p>Rate Per hour € {sitter.ratePerHour} </p>
            <p>Dog Type : {sitter.dogType}</p>
            <p>Experience Level : {sitter.experienceLevel}</p>
          </div>

          <Divider type="horizontal" dashed>
            Choose Time Slot
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM-DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <div>
            <p>
              Total Hours : <b>{totalHours}</b>{" "}
            </p>
            <p>
              Rate Per Hour : <b>{sitter.ratePerHour}</b>{" "}
            </p>
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setfood(true);
                } else {
                  setfood(false);
                }
              }}
            >
              Food Required
            </Checkbox>
            <h3>
              Total Amount : <b>{totalAmount}</b>
            </h3>
            <button className="btn1" onClick={bookNow}>
              Book Now
            </button>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingSitter;
