import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import NewPointBtnView from './view/new-point-btn-view.js';
import { render } from './framework/render.js';

const headerContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
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

render(newPointBtnComponent, headerContainer);

filterPresenter.init();
eventsPresenter.init();

