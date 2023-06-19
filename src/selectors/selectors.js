export const selectVisibleHeroes = (state, filter) => {
  switch (filter) {
    case "all":
      return state.heroesReducer.heroes;
    case "fire":
      return state.heroesReducer.heroes.filter(
        (hero) => hero.element === "fire"
      );
    case "water":
      return state.heroesReducer.heroes.filter(
        (hero) => hero.element === "water"
      );
    case "wind":
      return state.heroesReducer.heroes.filter(
        (hero) => hero.element === "wind"
      );
    case "earth":
      return state.heroesReducer.heroes.filter(
        (hero) => hero.element === "earth"
      );

    default:
      return state.heroesReducer.heroes;
  }
};
