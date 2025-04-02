import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeWord } from '../utils/common.js';
import { humanizeDateTime } from '../utils/date.js';
import { EVENT_TYPES, BLANK_POINT } from '../const.js';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import he from 'he';


function createOffersEditTemplate(checkedOffers, offersType, allOffers) {
  const selectedTypeOffersList = allOffers.find((offer) => offer.type === offersType).offers;

  const offersElements = selectedTypeOffersList.map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
        id="${offer.id}"
        type="checkbox"
        name="offers" value="${offer.id}" ${checkedOffers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');

  return (`<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersElements}
    </div>
  </section>`);
}

function createPicturesTemplate(destinationInfo) {
  const picturesList = destinationInfo ? destinationInfo.pictures : [];

  return (picturesList.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(''));
}

function createOptionsListTemplate(destinationInfo) {
  return (destinationInfo.map((destination) => `<option value="${destination.name}"></option>`).join(''));
}

function createEventTypesTemplate(chosenType) {
  return (EVENT_TYPES.map((type) => `
  <div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"${type === chosenType ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeWord(type)}</label>
  </div>
  `).join(''));
}

function createEditNewPointTemplate(point, offers, destinations, newPoint) {


  const { dateTo, dateFrom, type, offers: pointOffers, destination: pointDestination, basePrice, isDeleting, isDisabled, isSaving } = point;

  const selectedDestination = destinations ? destinations.find((x) => x.id === pointDestination) : [];

  const editOffersTemplate = createOffersEditTemplate(pointOffers, type, offers);
  const picturesTemplate = createPicturesTemplate(selectedDestination);

  const destinationName = selectedDestination ? selectedDestination.name : '';

  const humanizedTimeFrom = humanizeDateTime(dateFrom);
  const humanizedTimeTo = humanizeDateTime(dateTo);

  const optionsListTemplate = createOptionsListTemplate(destinations);

  const eventTypesTemplate = createEventTypesTemplate(type);

  const datesNotSelected = (dateFrom === null) || (dateTo === null);

  return (`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypesTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} value="${he.encode(destinationName)}" data-destination-name="${destinationName}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${optionsListTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" ${isDisabled ? 'disabled' : ''} value="${he.encode(humanizedTimeFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" ${isDisabled ? 'disabled' : ''} value="${he.encode(humanizedTimeTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" ${isDisabled ? 'disabled' : ''} value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${datesNotSelected || isDisabled ? 'disabled' : ''} >${isSaving ? 'saving...' : 'save'}</button>
                  <button class="event__reset-btn" type="reset">${(newPoint ? 'Cancel' : null) || (isDeleting ? 'deleting...' : 'delete')}</button>
                  ${!newPoint ? `<button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>` : ''}
                </header>
                <section class="event__details">
                ${offers.find((offer) => offer.type === type).offers.length ? editOffersTemplate : ''}
                ${selectedDestination?.description.length || selectedDestination?.pictures.length ? `
                                    <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${selectedDestination.description}</p>
                    ${selectedDestination?.pictures.length ? `                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${picturesTemplate}
                      </div>
                    </div>` : ''}
                  </section>
                  ` : ''}
                </section>
              </form>
            </li>
`);
}

export default class TripEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  #newPoint = null;


  constructor({ onFormSubmit, onFormClose, onDeleteClick, point = BLANK_POINT, offers, destinations, newPoint }) {
    super();
    this._setState(TripEditView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;

    this.#newPoint = newPoint;
    this._restoreHandlers();
  }

  get template() {
    return createEditNewPointTemplate(this._state, this.#offers, this.#destinations, this.#newPoint);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      TripEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    if (!this.#newPoint) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#formCloseHandler);
    }

    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#eventTypeToogleHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationToogleHandler);
    this.element.querySelector('.event__details')
      .addEventListener('change', this.#eventOffersSelectHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#eventDeleteClickHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);

    this.#setDatepickers();
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: parseInt(evt.target.value, 10),
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(TripEditView.parseStateToPoint(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #eventTypeToogleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #eventDestinationToogleHandler = (evt) => {
    evt.preventDefault();
    const newDestination = this.#destinations.find((x) => x.name === evt.target.value);
    if (newDestination === undefined) {
      const inputElement = this.element.querySelector('.event__input--destination');
      inputElement.value = inputElement.dataset.destinationName;
      return;
    }
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #eventOffersSelectHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(this.element.querySelector('form'));
    this._setState({
      offers: formData.getAll('offers')
    });
  };

  #eventDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(TripEditView.parseStateToPoint(this._state));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', userDate);
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate', userDate);
  };

  #setDatepickers() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        minDate: this._state.dateFrom
      }
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };


    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

}

