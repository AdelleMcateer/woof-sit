const initialData = {
  pets: [],
};

export const petsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_PETS": {
      return {
        ...state,
        pets: action.payload,
      };
    }

    default:
      return state;
  }
};
