export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};

export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const deleteHeroAction = (id) => {
  return {
    type: "DELETE_HERO",
    payload: id,
  };
};

export const addHeroAction = (hero) => {
  return {
    type: "ADD_HERO",
    payload: hero,
  };
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const activeFilterChanged = (active) => {
  return {
    type: "ACTIVE_FILTER_CHANGED",
    payload: active,
  };
};
// export const activeFilterChanged = (active) => (dispatch) => {
//   setTimeout(() => {
//     dispatch({
//       type: "ACTIVE_FILTER_CHANGED",
//       payload: active,
//     });
//   }, 1000);
// };
