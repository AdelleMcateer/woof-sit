import { message } from "antd";
import axios from "axios";

export const getAllPets = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/pets/getallpets");
    dispatch({ type: "GET_ALL_PETS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addpet = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/pets/addpet", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("New pet added successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editPet = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/pets/editpet", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Pet details updated successfully");
    setTimeout(() => {
      //window.location.href = "/";
      //window.location.reload();
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deletePet = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/pets/deletepet", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Pet details deleted successfully");
    setTimeout(() => {
      //window.location.reload();
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
