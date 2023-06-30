import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./HeroesList.scss";

const HeroesList = () => {
  const {
    data: heroes = [],
    isFetching, // последующие запросы
    isLoading, // первый запрос
    isSuccess, // успех
    isError, // ошибка
    error,
  } = useGetHeroesQuery();

  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();

    if (activeFilter === "all") {
      return filteredHeroes;
    }

    return filteredHeroes.filter((item) => item.element === activeFilter);
  }, [heroes, activeFilter]);

  const onDelete = useCallback((id) => {
    deleteHero(id);

    //   request(`http://localhost:3001/heroes/${id}`, "DELETE")
    //     .then(dispatch(heroDeleted(id)))
    //     .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
          <HeroesListItem deleteHero={() => onDelete(id)} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return (
    <TransitionGroup component="ul">{elements && elements}</TransitionGroup>
  );
};

export default HeroesList;
