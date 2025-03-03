import { render } from './render';
import Filters from './view/filters-view';
import Presenter from './presenter/presenter';

const filtersComponent = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const presenter = new Presenter({mainContainer: mainContainer});

presenter.init();

render(new Filters(), filtersComponent);
