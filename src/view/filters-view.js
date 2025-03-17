import AbstractView from '../framework/view/abstract-view';

function createFilterItemTemplate(filter, isChecked) {
  const { type, count } = filter;
  return (
    `<div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${count === 0 ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-everything">${type}</label>
      </div>`
  );
}

function createFilterTemplate(filters) {
  return (
    ` <form class="trip-filters" action="#" method="get">
    ${
    filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('')
    }
      </form> `
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;

  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

}
