import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #isDataLoaded = false;

  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get isDataLoaded() {
    return this.#isDataLoaded;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
      this._notify(UpdateType.ERROR);
      this.#isDataLoaded = false;
      return;
    }

    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers.map(this.#adaptToClient);
    } catch(err) {
      this.#offers = [];
      this._notify(UpdateType.ERROR);
      this.#isDataLoaded = false;
      return;
    }

    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
      this.#isDataLoaded = false;
      return;
    }

    this.#isDataLoaded = true;
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Cant\'t update point');
    }
  }

  async addPoint(updateType, update) {

    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Cant\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cant\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Cant\'t delete point');
    }
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
