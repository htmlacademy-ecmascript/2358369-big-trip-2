import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../framework/render';


export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #eventsModel = null;

  constructor({ tripInfoContainer, eventsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripInfoComponent = new TripInfoView(this.#eventsModel);

    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }
}
