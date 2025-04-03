import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition, replace, remove } from '../framework/render';


export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #eventsModel = null;

  constructor({ tripInfoContainer, eventsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleUpdate);
  }

  init() {
    const currentInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(this.#eventsModel);

    if (currentInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, currentInfoComponent);
    remove(currentInfoComponent);
  }

  #handleUpdate = () => {
    this.init();
  };
}
