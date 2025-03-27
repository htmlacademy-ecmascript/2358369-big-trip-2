import TripListView from '../view/trip-list-view.js';
import SortingView from '../view/sorting-view.js';
import { render, RenderPosition} from '../framework/render.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import {updatePoint} from '../utils/common.js';
import {sortByDay, sortByTime, sortByPrice} from '../utils/sorting.js';
import {SortType} from '../const.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #listComponent = new TripListView();
  #sortComponent = null;
  #noPointsComponent = new NoPointsView();

  #eventsPoints = [];
  #offers = null;
  #destinations = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#eventsPoints = [...this.#eventsModel.points];
    this.#eventsPoints.sort(sortByDay);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventsPoints = updatePoint(this.#eventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#eventsPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#eventsPoints.sort(sortByPrice);
        break;
      default:
        this.#eventsPoints.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#sortComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, this.#offers, this.#destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#eventsPoints
      .forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    render(this.#listComponent, this.#eventsContainer);
    this.#renderPoints();

  }

  #renderBoard() {
    this.#offers = this.#eventsModel.offers;
    this.#destinations = this.#eventsModel.destinations;

    if (this.#eventsPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
