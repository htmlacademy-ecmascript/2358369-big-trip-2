import AbstractView from '../framework/view/abstract-view';

function createNewPointBtnTemplate() {
  return '<button class="trip-main__event-add-btn  buba btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewPointBtnView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointBtnTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
