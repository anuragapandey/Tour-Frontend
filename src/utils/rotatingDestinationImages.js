const STORAGE_KEY = "seven-hills-destination-image-cycle";
let cachedCycle = null;

const readCycleState = () => {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeCycleState = (state) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore private-mode or storage quota failures; the first image remains a safe fallback.
  }
};

export const createDestinationImageCycle = (destinations) => {
  if (cachedCycle) return cachedCycle;

  const storedState = readCycleState();
  const nextState = {};
  const imageIndexes = {};

  destinations.forEach((destination) => {
    const imageCount = destination.images?.length || 0;
    if (!imageCount) {
      imageIndexes[destination.id] = 0;
      return;
    }

    const currentIndex = Number.isInteger(storedState[destination.id])
      ? storedState[destination.id] % imageCount
      : 0;

    imageIndexes[destination.id] = currentIndex;
    nextState[destination.id] = (currentIndex + 1) % imageCount;
  });

  writeCycleState(nextState);
  cachedCycle = imageIndexes;
  return imageIndexes;
};

export const getDestinationCycleImage = (destination, imageIndexes) => {
  if (!destination?.images?.length) return "";

  const imageIndex = imageIndexes?.[destination.id] || 0;
  return destination.images[imageIndex] || destination.images[0];
};
