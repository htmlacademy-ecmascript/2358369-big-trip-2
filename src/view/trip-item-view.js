import { createElement } from '../render';
import { humanizePointDate, humanizePointTime, getTimeDifference } from '../utils';

function createTripItemTemplate(point, offers, destination) {
  const { type, basePrice, dateFrom, dateTo, isFavorite} = point;
  const { name } = destination;

  const timeDifference = getTimeDifference(dateTo, dateFrom);

  const offersList = offers ? offers.offers : [];

  const createOffersTemplate = (offer) => offer.map(({title, price}) => `<li className="event__offer">
        <span className="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span className="event__offer-price">${price}</span>
      </li>`).join('');

  return ` <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${humanizePointDate(dateFrom)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${humanizePointTime(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${humanizePointTime(dateTo)}</time>
                  </p>
                  <p class="event__duration">${timeDifference}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOffersTemplate(offersList)}
                </ul>
               <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}


export default class TripItemView {

  constructor({ point, offers, destinations }) {
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createTripItemTemplate(this.point, this.offers, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

