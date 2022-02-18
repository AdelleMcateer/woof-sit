import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllSitters } from "../redux/actions/sittersActions";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

function BookingSitter({ match }) {
  const { sitters } = useSelector((state) => state.sittersReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [sitter, setsitter] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (sitters.length == 0) {
      dispatch(getAllSitters());
    } else {
      setsitter(sitters.find((o) => o._id == match.params.sitterid));
    }
  }, [sitters]);

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
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingSitter;
