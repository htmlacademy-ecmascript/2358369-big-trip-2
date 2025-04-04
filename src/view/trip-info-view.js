import AbstractView from '../framework/view/abstract-view';
import { sortByDay } from '../utils/sorting';
import dayjs from 'dayjs';


function createTripInfoTemplate(eventsModel) {

  const allOffers = eventsModel.offers;

  const sortedPoints = eventsModel.points.sort(sortByDay);
  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  const getDestinationName = (destination) => eventsModel.destinations.find((x) => x.id === destination)?.name;


  const basePriceTotal = sortedPoints.reduce((acc, el) => acc + el.basePrice, 0);
  const offersTotal = sortedPoints.reduce((sum, point) => {
    const pointOffers = allOffers.find((o) => o.type === point.type)?.offers || [];
    return sum + point.offers.reduce((acc, id) =>
      acc + (pointOffers.find((o) => o.id === id)?.price || 0), 0
    );
  }, 0);


  const tripTotal = basePriceTotal + offersTotal;


  const pointNames = sortedPoints.map((el) => getDestinationName(el.destination));

  const firstPointName = pointNames[0];
  const firstPointDate = dayjs(firstPoint?.dateFrom).format('D MMM');
  const middleTripPart = pointNames.length === 3 ? `&mdash; ${pointNames[1]}` : '';
  const lastPointName = pointNames.length > 1 ? `&mdash; ${pointNames[pointNames.length - 1]}` : '';
  const lastPointDate = dayjs(lastPoint?.dateTo).format('D MMM');
  const connector = pointNames.length > 3 ? '&mdash; ...' : '';

  if (eventsModel.points.length === 0) {
    return `  <section class="trip-main__trip-info  trip-info">
          </section>`;
  }

  return(
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstPointName} ${middleTripPart} ${connector} ${lastPointName}</h1>

              <p class="trip-info__dates">${firstPointDate}&nbsp;&mdash;&nbsp;${lastPointDate}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripTotal}</span>
            </p>
    </section>`
  );
}


export default class TripInfoView extends AbstractView {
  #eventsModel = null;

  constructor(eventsModel) {
    super();

    this.#eventsModel = eventsModel;
  }

  get template() {
    return createTripInfoTemplate(this.#eventsModel);
  }
}
