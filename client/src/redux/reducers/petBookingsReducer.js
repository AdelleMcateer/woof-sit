
const initialData = {
  petbookings: [],
};

export const petBookingsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_PET_BOOKINGS": {
      return {
        ...state,
        petbookings: action.payload,
      };
    }

    default:
      return state;
  }
};
