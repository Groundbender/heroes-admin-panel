// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useSelector, useDispatch } from "react-redux";
import { addHeroAction } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const HeroesAddForm = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filtersLoadingStatus, filters } = useSelector(
    (state) => state.filtersReducer
  );

  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    description: "",
    element: "",
  });

  const addHero = (e) => {
    e.preventDefault();
    const newHero = {
      id: uuidv4(),
      name: formValue.name,
      description: formValue.description,
      element: formValue.element,
    };
    request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHero))
      .then(dispatch(addHeroAction(newHero)))
      .catch((err) => console.error(err))
      .finally(
        setFormValue({
          id: "",
          name: "",
          description: "",
          element: "",
        })
      );
  };

  const renderOptions = () => {
    if (filtersLoadingStatus === "loading") {
      return <option>Данные загружаются</option>;
    } else if (filtersLoadingStatus === "error") {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map((filter) => {
        return (
          <option value={filter.value} key={filter.value}>
            {filter.label !== "Все" ? filter.label : "Я владею элементом..."}
          </option>
        );
      });
    }
  };
  const options = renderOptions();
  return (
    <form onSubmit={addHero} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          value={formValue.name}
          onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          value={formValue.description}
          onChange={(e) =>
            setFormValue({ ...formValue, description: e.target.value })
          }
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          value={formValue.element}
          onChange={(e) =>
            setFormValue({ ...formValue, element: e.target.value })
          }
          required
          className="form-select"
          id="element"
          name="element"
        >
          {options}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
