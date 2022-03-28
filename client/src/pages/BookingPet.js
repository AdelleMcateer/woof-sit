import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllPets } from "../redux/actions/petsActions";
import moment from "moment";
import { bookPet } from "../redux/actions/petBookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
const { RangePicker } = DatePicker;
function BookingPet({ match }) {
  const { pets } = useSelector((state) => state.petsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [pet, setpet] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [food, setfood] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (pets.length == 0) {
      dispatch(getAllPets());
    } else {
      setpet(pets.find((o) => o._id == match.params.petid));
    }
  }, [pets]);

  useEffect(() => {
    setTotalAmount(totalHours * pet.rateOfferedPerHour);
    if (food) {
      setTotalAmount(totalAmount + 1 * totalHours);
    }
  }, [food, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function bookNow() {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user"))._id,
      pet: pet._id,
      totalHours,
      totalAmount,
      foodRequired : food,
      bookedTimeSlots : {
        from,
        to
      }
    };
    dispatch(bookPet(reqObj))
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      pet: pet._id,
      totalHours,
      totalAmount,
      foodRequired: food,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookPet(reqObj));
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
            src={pet.image}
            className="sitterimg2 bs1 w-70"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Pet Sitter Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{pet.name}</p>
            <p> County : {pet.county} </p>
            <p>Rate Per hour €{pet.rateOfferedPerHour} </p>
            <p>Dog Type : {pet.dogType}</p>
            <p>Age : {pet.age}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rate Per Hour : <b>{pet.rateOfferedPerHour}</b>
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

              <h3>Total Amount : {totalAmount}</h3>

              <button className="btn1" onClick={bookNow}>
                Book Now
              </button>
              <p>
                ** Payment to be handled offline between Owner and Sitter **
              </p>
            </div>
          )}
        </Col>

        {pet.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {pet.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingPet;
