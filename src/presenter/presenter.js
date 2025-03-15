import TripListView from '../view/trip-list-view';
import TripItemView from '../view/trip-item-view';
import SortingView from '../view/sorting-view';
import TripEditView from '../view/trip-edit-view';

import { render, replace } from '../framework/render';


export default class Presenter {
  #tripListComponent = new TripListView();
  #sortingComponent = new SortingView();
  #mainContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];
  #offers = [];
  #destinations = [];

  constructor({mainContainer, pointsModel, offersModel, destinationsModel}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];
    render(this.#sortingComponent, this.#mainContainer);
    render(this.#tripListComponent, this.#mainContainer);

    for (let i = 0; i < 7; i++) {
      this.#renderTripItem(this.#points[i]);
    }
  }

  #renderTripItem(point) {
    const destination = this.#destinationsModel.getDestinationById(point.destination);
    const offers = this.#offersModel.getOffersByType(point.type);

    const pointComponent = new TripItemView({
      point,
      offers,
      destinations: destination,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', onEscKeypress);
      }
    });

    const editComponent = new TripEditView({
      point,
      currentDestination: destination,
      offers,
      destinations: this.#destinations,
      onFormClose: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeypress);
      },
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeypress);
      }
    });

    function replacePointToForm() {
      replace(editComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editComponent);
    }

    function onEscKeypress(evt) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeypress);
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}
