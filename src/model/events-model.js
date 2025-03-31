import {getRandomPoint} from '../mock/points.js';
import {getMockDestinationsList} from '../mock/destinations.js';
import {getMockOffersList} from '../mock/offers.js';
import Observable from '../framework/observable.js';


const POINTS_COUNT = 3;

export default class EventsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #destinations = getMockDestinationsList();
  #offers = getMockOffersList();

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant\'t delete unexisting point');
    }

    this.#points = [
      ...this.points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
