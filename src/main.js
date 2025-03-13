import { render } from './render';
import Filters from './view/filters-view';
import Presenter from './presenter/presenter';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import PointsModel from './model/points-model';


const filtersComponent = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const presenter = new Presenter({
  mainContainer: mainContainer,
  pointsModel,
  offersModel,
  destinationsModel
});

presenter.init();

render(new Filters(), filtersComponent);
