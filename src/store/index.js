import { configureStore } from "@reduxjs/toolkit";
// import heroesReducer from "../reducers/heroes";
// import filtersReducer from "../reducers/filters";
import filters from "../components/heroesFilters/heroesFiltersSLice";
import { apiSlice } from "../api/apiSlice";

//store в ф-ии - store = {dispatch, getState}
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    filters,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devtools: process.env.NODE_ENV !== "production",
});

export default store;
