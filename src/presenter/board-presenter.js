import TripListView from '../view/trip-list-view';
import SortingView from '../view/sorting-view';
import EmptyListView from '../view/empty-list-view';
import { render } from '../framework/render';
import PointPresenter from './point-presenter';
import { updatePoint } from '../utils/common';

export default class BoardPresenter {
  #tripListComponent = new TripListView();
  #sortingComponent = new SortingView();
  #mainContainer = null;
  #headerContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];
  #offers = [];
  #destinations = [];
  #pointPresenters = new Map();

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

    if (this.#points.length === 0) {
      render(new EmptyListView(), this.#mainContainer);
      return;
    }

    render(this.#sortingComponent, this.#mainContainer);
    this.#renderPointsList();
  }


  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPointsList() {
    render(this.#tripListComponent, this.#mainContainer);
    this.#renderPoints(this.#points);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
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
