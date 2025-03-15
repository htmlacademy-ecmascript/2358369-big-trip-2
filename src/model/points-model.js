import { POINT_COUNT } from '../consts';
import { getRandomPoints } from '../mock/points';

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoints);

  get points() {
    return this.#points;
  }
}

