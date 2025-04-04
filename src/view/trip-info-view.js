import AbstractView from '../framework/view/abstract-view';
import { sortByDay } from '../utils/sorting';
import dayjs from 'dayjs';

const createTripInfoTemplate = ({ points, offers, destinations }) => {
  if (!points.length) {
    return '<section class="trip-main__trip-info trip-info"></section>';
  }

  const sortedPoints = [...points].sort(sortByDay);
  const getDestName = (id) => destinations.find((d) => d.id === id)?.name;

  const uniqDests = sortedPoints.filter((p, i, arr) =>
    i === 0 || p.destination !== arr[i - 1].destination);
  const destNames = uniqDests.map((p) => getDestName(p.destination));

  const [first, last] = [sortedPoints[0], sortedPoints[sortedPoints.length - 1]];
  const dates = [dayjs(first?.dateFrom).format('D MMM'), dayjs(last?.dateTo).format('D MMM')];

  const baseTotal = sortedPoints.reduce((sum, p) => sum + p.basePrice, 0);
  const offersTotal = sortedPoints.reduce((sum, p) => {
    const typeOffers = offers.find((o) => o.type === p.type)?.offers || [];
    return sum + p.offers.reduce((acc, id) =>
      acc + (typeOffers.find((o) => o.id === id)?.price || 0), 0);
  }, 0);

  const middlePoint = destNames.length === 3 ? `&mdash; ${destNames[1]}` : '';
  const connector = destNames.length > 3 ? '&mdash; ...' : '';
  const lastDest = destNames.length > 1 ? `&mdash; ${destNames[destNames.length - 1]}` : '';

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destNames[0]} ${middlePoint} ${connector} ${lastDest}</h1>
        <p class="trip-info__dates">${dates[0]}&nbsp;&mdash;&nbsp;${dates[1]}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${baseTotal + offersTotal}</span>
      </p>
    </section>`;
};

export default class TripInfoView extends AbstractView {
  #model = null;

  constructor(model) {
    super();
    this.#model = model;
  }

  get template() {
    return createTripInfoTemplate(this.#model);
  }
}
