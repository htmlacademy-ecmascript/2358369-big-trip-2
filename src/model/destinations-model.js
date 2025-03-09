import { mockDestinations } from '../mock/destinations';

export default class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((obj) => obj.id === id);
  }
}
