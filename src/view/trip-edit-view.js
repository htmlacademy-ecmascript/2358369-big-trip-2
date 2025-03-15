import AbstractView from '../framework/view/abstract-view';
// import { createElement } from '../render';
import { humanizeDateTime, capitalizeWord } from '../utils';
import { EVENT_TYPES } from '../consts';


function createEditFormTemplate(point, currentDestination, offers, destination) {
  const { id, type, basePrice, dateFrom, dateTo} = point;

  const createDestinationTemplate = () => destination.map((el) => `<option value="${el.name}"></option>`).join('');

  const createOfferTemplate = () =>
    (offers?.offers?.length ? offers.offers.map((offer) => {
      const isChecked = point.offers.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.title}-${offer.id}"
                       type="checkbox" name="event-offer-${offer.id}" ${isChecked}>
                <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </label>
              </div>`;
    }).join('') : '');

  const createTypesTemplate = () => EVENT_TYPES.map((el) => {
    const isChecked = el === type ? 'checked' : '';
    return `<div class="event__type-item">
          <input id="event-type-${el}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${el}" ${isChecked}>
          <label class="event__type-label event__type-label--${el}" for="event-type-${el}-${id}">${capitalizeWord(el)}</label>
      </div>`;
  }).join('');

  const createImageTemplate = () => currentDestination.pictures.map((el) => `<img class="event__photo" src="${el.src}" alt="${el.description}">`).join('');

  return (
    `<li class="trip-events__item">
     <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypesTemplate()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${createDestinationTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${humanizeDateTime(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${humanizeDateTime(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${createOfferTemplate()}
                    </div>
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${currentDestination.description}</p>
                     <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createImageTemplate()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
              </li>`
  );
}

export default class TripEditView extends AbstractView {

  #point = null;
  #currentDestination = null;
  #offers = null;
  #checkedOffers = null;
  #destinations = null;

  #handleFormClose = null;
  #handleFormSubmit = null;


  constructor({point, currentDestination, offers, checkedOffers, destinations, onFormClose, onFormSubmit}) {
    super();
    this.#point = point;
    this.#currentDestination = currentDestination;
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#destinations = destinations;
    this.#handleFormClose = onFormClose;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormHandler);

  }

  get template() {
    return createEditFormTemplate(this.#point, this.#currentDestination, this.#offers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };
}

