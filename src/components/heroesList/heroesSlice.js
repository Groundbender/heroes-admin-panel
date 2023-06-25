import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

// ф-ия вернет 3 сущности: имя среза, объект с actions, reducer\
// принимает name (state.heroes), inititalState, actions
const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} = actions;
