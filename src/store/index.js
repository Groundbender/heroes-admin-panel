import { createStore, combineReducers } from "redux";
import heroesReducer from "../reducers/heroes";
import filtersReducer from "../reducers/filters";
const rootReducer = combineReducers({
  heroesReducer,
  filtersReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
