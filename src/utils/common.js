function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updatePoint(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, updatePoint, capitalizeWord};
