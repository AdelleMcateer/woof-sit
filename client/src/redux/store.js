import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertsReducer } from "./reducers/alertsReducer";
import { sittersReducer } from "./reducers/sittersReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { petBookingsReducer } from "./reducers/petBookingsReducer";
import { petsReducer } from "./reducers/petsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  sittersReducer,
  alertsReducer,
  bookingsReducer,
  petsReducer,
  petBookingsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
