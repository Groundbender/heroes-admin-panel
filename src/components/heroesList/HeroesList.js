import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchHeroes, deleteHeroAction } from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./HeroesList.scss";

const HeroesList = () => {
  //   const { activeFilter, heroes } = useSelector((state) => ({
  //     activeFilter: state.filtersReducer.activeFilter,
  //     heroes: state.heroesReducer.heroes,
  //   }));

  //   const filteredHeroes = useSelector((state) => {
  //     if (state.filtersReducer.activeFilter === "all") {
  //       return state.heroesReducer.heroes;
  //     }

  //     return state.heroesReducer.heroes.filter(
  //       (item) => item.element === state.filtersReducer.activeFilter
  //     );
  //   });
  const filteredHeroesSelector = createSelector(
    (state) => state.filtersReducer.activeFilter,
    (state) => state.heroesReducer.heroes,
    (filter, heroes) => {
      if (filter === "all") {
        return heroes;
      }

      return heroes.filter((item) => item.element === filter);
    }
  );

  const filteredHeroes = useSelector(filteredHeroesSelector);
  const { heroesLoadingStatus } = useSelector((state) => state.heroesReducer);

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes(request));

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

  const elements = renderHeroesList(filteredHeroes);

  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
