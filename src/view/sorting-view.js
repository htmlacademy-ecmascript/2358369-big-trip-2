import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortingTemplate(currentSortType) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DAY ? 'checked' : ''} data-sort-type="${SortType.DAY}">
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.TIME ? 'checked' : ''} data-sort-type="${SortType.TIME}">
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.PRICE ? 'checked' : ''} data-sort-type="${SortType.PRICE}">
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`);
}

export default class SortingView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;
    this.#handleSortTypeChange(sortType);
  };
}
