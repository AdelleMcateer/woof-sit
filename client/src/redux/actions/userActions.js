import axios from "axios";
import { message } from "antd";

export const userLogin = (reqOb) => async (dispatch) => {
  dispatch({ type: "LOADING, payload:true" });

  try {
    const response = await axios.post("/api/users/login", reqOb);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login successful");
    dispatch({ type: "LOADING, payload:false" });
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING, payload:false" });
  }
};

export const userRegister = (reqOb) => async (dispatch) => {
  dispatch({ type: "LOADING, payload:true" });

  try {
    const response = await axios.post("/api/users/register", reqOb);
    message.success("Registration successful");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING, payload:false" });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING, payload:false" });
  }
};
