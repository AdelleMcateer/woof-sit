import { message } from "antd";
import axios from "axios";

export const getAllSitters = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/sitters/getallsitters");
    dispatch({ type: "GET_ALL_SITTERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
