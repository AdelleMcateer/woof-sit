import { message } from "antd";
import axios from "axios";

export const bookPet = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/petbookings/bookpet", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Your pet booked successfully");
    setTimeout(() => {
      window.location.href = "/userpetbookings";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try again later");
  }
};

export const getAllPetBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/petbookings/getallpetbookings");
    dispatch({ type: "GET_ALL_PET_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
