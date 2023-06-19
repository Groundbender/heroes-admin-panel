const initialState = {
  heroes: [
    {
      id: "0",
      name: "Герой какой-то",
      description: "Что что что ",
      element: "fire",
    },
    {
      id: "1",
      name: "Герой какой-то",
      description: "Что что что ",
      element: "water",
    },
    {
      id: "2",
      name: "Герой какой-то",
      description: "Что что что ",
      element: "earth",
    },
  ],
  heroesLoadingStatus: "idle",
  filters: [],
};

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "DELETE_HERO":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };
    case "ADD_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    default:
      return state;
  }
};

export default heroesReducer;