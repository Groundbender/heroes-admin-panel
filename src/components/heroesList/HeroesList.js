import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHeroAction,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { selectVisibleHeroes } from "../../selectors/selectors";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./HeroesList.scss";
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroesLoadingStatus } = useSelector((state) => state.heroesReducer);

  const activeFilter = useSelector(
    (state) => state.filtersReducer.activeFilter
  );

  const heroes = useSelector((state) =>
    selectVisibleHeroes(state, activeFilter)
  );

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());

    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const deleteHero = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(deleteHeroAction(id)))
        .catch((err) => console.log(err));
    },
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition timeout={500} key={id} classNames="hero">
          <HeroesListItem deleteHero={() => deleteHero(id)} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(heroes);

  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
