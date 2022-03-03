import axios from 'axios';


export const getAllPets=() => async dispatch=>{

    dispatch({ type: "LOADING", payload: true });

    
  try {
    const response = await axios.get("/api/pets/getallpets");
    dispatch({ type: "GET_ALL_PETS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
  }
};


}