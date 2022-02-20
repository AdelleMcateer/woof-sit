import { message } from "antd";
import axios from "axios";

export const bookSitter = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/bookings/booksitter");
    dispatch({ type: "LOADING", payload: false });
    message.success("Your sitter booked successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try again later");
  }
};
