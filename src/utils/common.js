function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updatePoint(points, update) {
  console.log('Обновление списка:', points);
  console.log('Изменяемая точка:', update);
  return points.map((point) => point.id === update.id ? update : point);
}

export { getRandomArrayElement, capitalizeWord, updatePoint };
