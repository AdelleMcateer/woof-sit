import React, { useState, useEffect } from "react";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllPets } from "../redux/actions/petsActions";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";

const { RangePicker } = DatePicker;
function PetHome() {
  const { pets } = useSelector((state) => state.petsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalPets, setTotalPets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPets());
  }, []);

  useEffect(() => {
    setTotalPets(pets);
  }, [pets]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var pet of pets) {
      if (pet.bookedTimeSlots.length == 0) {
        temp.push(pet);
      } else {
        for (var booking of pet.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(pet);
          }
        }
      }
    }
    setTotalPets(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <Row>
            {" "}
            <div className="d-flex justify-content-between align items-center">
              <h3 className="mt-1 mr-2">Book a Pet to Sit</h3>
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
      {totalPets.map((pet) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="sitter p-2 bs1">
                <img src={pet.image} className="sitterimg" />

                <div className="sitter-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{pet.name}</p>
                    <p>{pet.location}</p>
                    <p> Rate Per Hour €{pet.rateOfferedPerHour} </p>
                  </div>

                  <div>
                    <button className="btn1 mr-2">
                      <Link to={`/bookingpet/${pet._id}`}>Book Now</Link>
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

export default PetHome;
