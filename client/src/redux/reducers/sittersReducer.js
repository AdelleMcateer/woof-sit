const initialData = {
  sitters: [],
};

export const sittersReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_SITTERS": {
      return {
        ...state,
        sitters: action.payload,
      };
    }

    default:
      return state;
  }
};
