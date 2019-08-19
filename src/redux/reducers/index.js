import { combineReducers } from "redux";

import router from './router';
import users from "./users";

// main reducers
const appReducer = combineReducers({
  router,
  users,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
