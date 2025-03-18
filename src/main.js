import { generateFilter } from './mock/filter';
import Presenter from './presenter/presenter';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import PointsModel from './model/points-model';
import FiltersView from './view/filters-view';
import { render } from './framework/render';


// const filtersComponent = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filters = generateFilter(pointsModel.points);

const presenter = new Presenter({
  mainContainer: mainContainer,
  headerContainer: headerContainer,
  pointsModel,
  offersModel,
  destinationsModel
});

presenter.init();

render(new FiltersView({
  filters,
  onClick: () => {

  }
}), headerContainer);
