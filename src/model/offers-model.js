import { mockOffers } from '../mock/offers';

export default class OffersModel {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.offers.find((obj) => obj.type === type);
  }

  getOfferById(id) {
    return this.offers.find((obj) => obj.id === id);
  }
}
