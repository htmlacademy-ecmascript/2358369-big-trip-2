import TripListView from '../view/trip-list-view';
import TripItemView from '../view/trip-item-view';
import SortingView from '../view/sorting-view';
import TripEditView from '../view/trip-edit-view';
import EmptyListView from '../view/empty-list-view';
import { render, replace } from '../framework/render';


export default class Presenter {
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

    // render(new FiltersView(this.#handleFilterChange.bind(this)), this.#headerContainer);
    render(this.#sortingComponent, this.#mainContainer);
    this.#renderPointsList();
    this.#renderPoints(this.#points);
  }

  #clearBoard() {
    this.#tripListComponent.element.innerHTML = '';
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderPointsList() {
    render(this.#tripListComponent, this.#mainContainer);
  }

  // #handleFilterChange(evt) {
  //   this.#currentFilter = evt.target.value;
  //   this.#clearBoard();

  //   const filteredPoints = filter[this.#currentFilter](this.#pointsModel.points);
  //   this.#renderPoints(filteredPoints);
  // }

  #renderPoint(point) {
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
      if (evt.key === 'Escape') {
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeypress);
      }
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}
