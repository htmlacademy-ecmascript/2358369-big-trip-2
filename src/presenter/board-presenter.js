import TripListView from '../view/trip-list-view';
import SortingView from '../view/sorting-view';
import EmptyListView from '../view/empty-list-view';
import { render } from '../framework/render';
import PointPresenter from './point-presenter';
import { updatePoint } from '../utils/common';
import { SortType } from '../consts';
import { sortByDay, sortByPrice, sortByTime } from '../utils/sorting';

export default class BoardPresenter {
  #tripListComponent = new TripListView();
  #sortingComponent = null;
  #mainContainer = null;
  #headerContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];
  #offers = [];
  #destinations = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor({ mainContainer, headerContainer, pointsModel, offersModel, destinationsModel }) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#sourcedPoints = [...this.#pointsModel.points];

    if (this.#points.length === 0) {
      render(new EmptyListView(), this.#mainContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPoints(this.#points);
  };

  #renderSort() {
    this.#sortingComponent = new SortingView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortingComponent, this.#mainContainer);
  }

  #sortPoints(sortType) {
    this.#clearPointsList();
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList() {
    render(this.#tripListComponent, this.#mainContainer);
    this.#sortPoints(this.#currentSortType);
    this.#renderPoints(this.#points);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#sourcedPoints = updatePoint(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#tripListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

}
