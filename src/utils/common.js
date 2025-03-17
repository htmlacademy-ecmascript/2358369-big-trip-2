function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export { getRandomArrayElement, capitalizeWord };
