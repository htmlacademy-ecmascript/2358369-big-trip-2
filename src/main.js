import { render } from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import NewPointBtnView from './view/new-point-btn-view.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const headerContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  eventsModel,
});

const eventsPresenter = new EventsPresenter({
  eventsContainer: tripEventsContainer,
  eventsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: headerContainer,
  eventsModel
});

const newPointBtnComponent = new NewPointBtnView({
  onClick: handleNewPointBtnClick
});

function handleNewPointFormClose() {
  newPointBtnComponent.element.disabled = false;
}

function handleNewPointBtnClick() {
  eventsPresenter.createPoint();
  newPointBtnComponent.element.disabled = true;
}


filterPresenter.init();
eventsPresenter.init();
tripInfoPresenter.init();
eventsModel.init()
  .finally(() => {
    render(newPointBtnComponent, headerContainer);
  });
