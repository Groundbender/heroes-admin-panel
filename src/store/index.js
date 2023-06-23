import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import heroesReducer from "../reducers/heroes";
import filtersReducer from "../reducers/filters";

//store в ф-ии - store = {dispatch, getState}
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const myLogger = (store) => (next) => (action) => {
  console.log("dispatched an action", action.type);
  next(action);
  console.log("updated state is", store.getState());
};

// const middleware = [];

// if (process.env.NODE_ENV === "development") {
//   middleware.push(myLogger, stringMiddleware);
// }

// ф-ия для передачи строк в dispatch

const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);
    // записываем стандартный dispatch который принимает только объект
    const oldDispatch = store.dispatch;
    // меняем dispatch если строка помещаем в объект и возвращаем
    store.dispatch = (action) => {
      if (typeof action === "string") {
        return oldDispatch({
          type: action,
        });
      }
      //если не строка то возвращаем стандартный dispatch
      return oldDispatch(action);
    };
    return store;
  };
const rootReducer = combineReducers({
  heroesReducer,
  filtersReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  // compose(
  //   enhancer,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
