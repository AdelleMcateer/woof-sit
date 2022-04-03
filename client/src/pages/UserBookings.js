import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import moment from "moment";
import Spinner from "../components/Spinner";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={18} sm={24}>
          {bookings
            .filter((o) => o.user == user._id)
            .map((booking) => {
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{booking.sitter.name}</b>
                    </p>
                    <p>
                      Total Hours :<b> {booking.totalHours}</b>
                    </p>
                    <p>
                      Rate Per Hour :<b> {booking.sitter.ratePerHour}</b>
                    </p>
                    <p>
                      Total Amount :<b> {booking.totalAmount}</b>
                    </p>
                  </Col>
                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id :<b> {booking.transactionId}</b>
                    </p>
                    <p>
                      From :<b> {booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To :<b> {booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Booking Date :
                      <b> {moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>
                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.sitter.image}
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

export default UserBookings;
