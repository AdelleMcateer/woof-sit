import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllPetBookings } from "../redux/actions/petBookingActions";
import { Col, Row } from "antd";
import moment from "moment";
import Spinner from "../components/Spinner";

function UserPetBookings() {
  const dispatch = useDispatch();
  const { petbookings } = useSelector((state) => state.petBookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllPetBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Pet Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={18} sm={24}>
          {petbookings
            .filter((o) => o.user == user._id)
            .map((petbooking) => {
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{petbooking.pet.name}</b>
                    </p>
                    <p>
                      Total Hours :<b> {petbooking.totalHours}</b>
                    </p>
                    <p>
                      Rate Offered Per Hour :<b> {petbooking.pet.rateOfferedPerHour}</b>
                    </p>
                    <p>
                      Total Amount :<b> {petbooking.totalAmount}</b>
                    </p>
                  </Col>
                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id :<b> {petbooking.transactionId}</b>
                    </p>
                    <p>
                      From :<b> {petbooking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To :<b> {petbooking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Booking Date :
                      <b>
                        {" "}
                        {moment(petbooking.createdAt).format("MMM DD yyyy")}
                      </b>
                    </p>
                  </Col>
                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={petbooking.pet.image}
                      height="140px"
                      className="p-2"
                    />
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserPetBookings;
