import TripListView from '../view/trip-list-view';
import TripItemView from '../view/trip-item-view';
import SortingView from '../view/sorting-view';
import TripEditView from '../view/trip-edit-view';

import { render } from '../render';


export default class Presenter {
  tripListComponent = new TripListView();
  sortingComponent = new SortingView();

  constructor({mainContainer, pointsModel, offersModel, destinationsModel}) {
    this.mainContainer = mainContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.offersModel.getOffers()];
    this.destinations = [...this.destinationsModel.getDestinations()];
    render(this.sortingComponent, this.mainContainer);
    // console.log(this.destinationsModel.getDestinationById(this.points[0].destination));
    render(this.tripListComponent, this.mainContainer);
    render(new TripEditView({
      point: this.points[0],
      currentDestination: this.destinationsModel.getDestinationById(this.points[0].destination),
      offers: this.offersModel.getOffersByType(this.points[0].type),
      destinations: this.destinations
    }), this.tripListComponent.getElement());

    for (let i = 1; i < 4; i++) {
      const destinationId = this.destinationsModel.getDestinationById(this.points[i].destination);
      const offersType = this.offersModel.getOffersByType(this.points[i].type);
      render(new TripItemView({
        point: this.points[i],
        offers: offersType,
        destinations: destinationId
      }), this.tripListComponent.getElement());
    }
  }
}
