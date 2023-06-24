import { createReducer } from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroDeleted,
  heroCreated,
  heroesFetchingError,
} from "../actions";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

// createReducer( 2 способ ) (не работает с typescript)
const heroesReducer = createReducer(
  initialState,
  {
    [heroesFetching]: (state, action) => {
      state.heroesLoadingStatus = "loading";
    },
    [heroesFetched]: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    [heroesFetchingError]: (state, action) => {
      state.heroesLoadingStatus = "error";
    },
    [heroCreated]: (state, action) => {
      state.heroes.push(action.payload);
    },
    [heroDeleted]: (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
  },
  [],
  (state) => state
);

export default heroesReducer;

// createReducer (1 способ)
// const heroesReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(heroesFetching, (state, action) => {
//       state.heroesLoadingStatus = "loading";
//     })
//     .addCase(heroesFetched, (state, action) => {
//       state.heroesLoadingStatus = "idle";
//       state.heroes = action.payload;
//     })
//     .addCase(heroesFetchingError, (state, action) => {
//       state.heroesLoadingStatus = "error";
//     })
//     .addCase(heroDeleted, (state, action) => {
//       state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
//     })
//     .addCase(heroCreated, (state, action) => {
//       state.heroes.push(action.payload);
//     })
//     .addDefaultCase(() => {});
// });

// redux reducer
// const heroesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };
//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };
//     case "HEROES_FETCHING_ERROR":
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };
//     case "HERO_DELETED":
//       return {
//         ...state,
//         heroes: state.heroes.filter((hero) => hero.id !== action.payload),
//       };
//     case "HERO_CREATED":
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       };
//     default:
//       return state;
//   }
// };
