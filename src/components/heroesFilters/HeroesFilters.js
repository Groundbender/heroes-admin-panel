// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { useHttp } from "../../hooks/http.hook";
import {
  filtersFetched,
  filtersFetchingError,
  filtersFetching,
  activeFilterChanged,
} from "../../actions/index.js";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filtersReducer
  );
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return arr.map(({ value, className, label }) => {
      const btnClass = cn("btn", className, {
        active: value === activeFilter,
      });

      return (
        <button
          key={value}
          id={value}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(value))}
        >
          {label}
        </button>
      );
    });
  };

  const filterButtons = renderFilters(filters);
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {/* <button className="btn btn-outline-dark active">Все</button>
          <button className="btn btn-danger">Огонь</button>
          <button className="btn btn-primary">Вода</button>
          <button className="btn btn-success">Ветер</button>
          <button className="btn btn-secondary">Земля</button> */}
          {filterButtons}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;