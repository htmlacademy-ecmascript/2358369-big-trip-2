import {filter} from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([FilterType, filterTasks]) => ({
      type: FilterType,
      count: filterTasks(points).length,
    }),
  );
}

export {generateFilter};
