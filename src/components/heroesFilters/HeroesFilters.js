import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { activeFilterChanged } from "./heroesFiltersSLice";
import { fetchFilters } from "../../actions/";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { filters, filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));

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
        <div className="btn-group">{filterButtons}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
