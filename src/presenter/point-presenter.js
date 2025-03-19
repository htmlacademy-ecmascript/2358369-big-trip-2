import TripItemView from '../view/trip-item-view';
import TripEditView from '../view/trip-edit-view';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {
  #pointsListContainer = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #editComponent = null;
  #handleDataChange = null;


  constructor({ pointsListContainer, destinationsModel, offersModel, onDataChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;
    const destination = this.#destinationsModel.getDestinationById(point.destination);
    const offers = this.#offersModel.getOffersByType(point.type);

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#pointComponent = new TripItemView({
      point,
      offers,
      destinations: destination,
      onEditClick: this.#replacePointToForm,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editComponent = new TripEditView({
      point,
      currentDestination: destination,
      offers,
      destinations: this.#destinationsModel.destinations,
      onFormClose: this.#replaceFormToPoint,
      onFormSubmit: this.#replaceFormToPoint
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#pointsListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsListContainer.contains(prevEditComponent.element)) {
      replace(this.#pointComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  #replacePointToForm = () => {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeypress);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#onEscKeypress);
  };

  #onEscKeypress = (evt) => {
    if (evt.key === 'Escape') {
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
