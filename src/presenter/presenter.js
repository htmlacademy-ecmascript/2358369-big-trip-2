import TripList from '../view/trip-list-view';
import TripItem from '../view/trip-item-view';
import Sorting from '../view/sorting-view';
import EditForm from '../view/trip-edit-view';

import { render } from '../render';


export default class Presenter {
  tripListComponent = new TripList();
  sortingComponent = new Sorting();
  editFormComponent = new EditForm();

  constructor({mainContainer}) {
    this.mainContainer = mainContainer;
  }

  init() {
    render(this.sortingComponent, this.mainContainer);
    render(this.tripListComponent, this.mainContainer);
    render(this.editFormComponent, this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripItem(), this.tripListComponent.getElement());
    }
  }
}
