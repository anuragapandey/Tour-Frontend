const DELHI_ORIGIN = "Delhi";
const DISCOUNT_RATE = 0.1;

const destinationPricing = {
  "ladakh": { distanceKm: 1020, flight: 14000, train: 0, bus: 4200, stay: 3800, carDays: 6, sightseeing: 2600 },
  "taj-mahal": { distanceKm: 235, flight: 0, train: 900, bus: 800, stay: 2600, carDays: 2, sightseeing: 1300 },
  "kerala": { distanceKm: 2650, flight: 12500, train: 4300, bus: 0, stay: 3400, carDays: 5, sightseeing: 2200 },
  "khajuraho": { distanceKm: 650, flight: 9500, train: 2400, bus: 2200, stay: 2800, carDays: 2, sightseeing: 1500 },
  "varanasi": { distanceKm: 820, flight: 8000, train: 2500, bus: 2200, stay: 2700, carDays: 3, sightseeing: 1500 },
  "rajasthan": { distanceKm: 520, flight: 6500, train: 2100, bus: 1700, stay: 3300, carDays: 6, sightseeing: 2100 },
  "darjeeling": { distanceKm: 1490, flight: 10500, train: 3300, bus: 0, stay: 3100, carDays: 3, sightseeing: 1900 },
  "goa": { distanceKm: 1880, flight: 9500, train: 3600, bus: 0, stay: 3600, carDays: 4, sightseeing: 2000 },
  "manali": { distanceKm: 540, flight: 0, train: 0, bus: 2400, stay: 3000, carDays: 4, sightseeing: 1700 },
  "nainital": { distanceKm: 320, flight: 0, train: 1300, bus: 1200, stay: 2900, carDays: 3, sightseeing: 1600 },
  "kashmir": { distanceKm: 860, flight: 11000, train: 2600, bus: 3200, stay: 3600, carDays: 5, sightseeing: 2400 },
  "sikkim": { distanceKm: 1520, flight: 11500, train: 3400, bus: 0, stay: 3200, carDays: 5, sightseeing: 2300 },
  "andaman": { distanceKm: 2480, flight: 17000, train: 0, bus: 0, stay: 3900, carDays: 4, sightseeing: 2600 },
  "amritsar": { distanceKm: 450, flight: 6500, train: 1900, bus: 1600, stay: 2800, carDays: 2, sightseeing: 1400 },
  "meghalaya": { distanceKm: 1960, flight: 13500, train: 3800, bus: 0, stay: 3300, carDays: 5, sightseeing: 2500 },
  "hampi": { distanceKm: 1850, flight: 11000, train: 3600, bus: 0, stay: 3000, carDays: 3, sightseeing: 1800 },
  "ooty": { distanceKm: 2380, flight: 12000, train: 3900, bus: 0, stay: 3200, carDays: 3, sightseeing: 1900 },
  "gujarat": { distanceKm: 960, flight: 8000, train: 2900, bus: 2600, stay: 3100, carDays: 5, sightseeing: 1900 },
  "munnar": { distanceKm: 2650, flight: 12500, train: 4300, bus: 0, stay: 3200, carDays: 3, sightseeing: 1900 },
  "kodaikanal": { distanceKm: 2530, flight: 12500, train: 4200, bus: 0, stay: 3100, carDays: 3, sightseeing: 1800 },
  "wayanad": { distanceKm: 2420, flight: 12000, train: 4000, bus: 0, stay: 3200, carDays: 3, sightseeing: 1800 },
  "coorg": { distanceKm: 2250, flight: 11500, train: 3900, bus: 0, stay: 3300, carDays: 3, sightseeing: 1900 },
  "mysore": { distanceKm: 2200, flight: 11000, train: 3600, bus: 0, stay: 3000, carDays: 2, sightseeing: 1600 },
  "pondicherry": { distanceKm: 2360, flight: 11000, train: 3800, bus: 0, stay: 3100, carDays: 3, sightseeing: 1700 },
  "rameswaram": { distanceKm: 2720, flight: 13000, train: 4300, bus: 0, stay: 2900, carDays: 2, sightseeing: 1600 },
  "kanyakumari": { distanceKm: 2850, flight: 13500, train: 4500, bus: 0, stay: 2900, carDays: 2, sightseeing: 1600 },
  "gokarna": { distanceKm: 1980, flight: 10500, train: 3600, bus: 0, stay: 3100, carDays: 3, sightseeing: 1700 },
  "chikmagalur": { distanceKm: 2210, flight: 11500, train: 3800, bus: 0, stay: 3200, carDays: 3, sightseeing: 1800 },
};

const transportLabels = {
  flight: "Airline",
  train: "Train",
  bus: "Bus",
  car: "Private Car",
};

const mealRates = {
  none: 0,
  breakfast: 300,
  breakfastDinner: 750,
  allMeals: 1150,
};

export const groupSizeOptions = [2, 5, 7, 11, 17, 36, 50];
export const transportOptions = ["flight", "train", "bus", "car"];
export const mealOptions = [
  { value: "none", label: "No Meals" },
  { value: "breakfast", label: "Breakfast" },
  { value: "breakfastDinner", label: "Breakfast + Dinner" },
  { value: "allMeals", label: "Breakfast + Lunch + Dinner" },
];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount || 0));

export const getDurationDays = (duration = "") => {
  const match = duration.match(/(\d+)\s*Days/i);
  return match ? Number(match[1]) : 3;
};

const getCarCostPerPerson = (pricing, travellers) => {
  const vehicleCount = Math.max(1, Math.ceil(travellers / 6));
  const kmRate = travellers >= 36 ? 44 : travellers >= 17 ? 30 : travellers >= 7 ? 22 : 16;
  const roundTripKm = pricing.distanceKm * 2;
  const driverAllowance = pricing.carDays * 500 * vehicleCount;
  return Math.round((roundTripKm * kmRate + driverAllowance) / travellers);
};

export const getAvailableTransports = (destination) => {
  const pricing = destinationPricing[destination.id] || destinationPricing["taj-mahal"];
  return transportOptions.filter((option) => option === "car" || pricing[option] > 0);
};

export const getPackageQuote = (
  destination,
  { travellers = 2, transport = "flight", mealPlan = "breakfastDinner", days } = {}
) => {
  const pricing = destinationPricing[destination.id] || destinationPricing["taj-mahal"];
  const tripDays = Number(days) || getDurationDays(destination.duration);
  const group = Number(travellers) || 2;
  const selectedTransport = transport === "car" ? getCarCostPerPerson(pricing, group) : pricing[transport] || getCarCostPerPerson(pricing, group);
  const hotelMultiplier = group >= 36 ? 0.82 : group >= 17 ? 0.88 : group >= 7 ? 0.93 : 1;
  const stayCost = pricing.stay * tripDays * hotelMultiplier;
  const meals = mealRates[mealPlan] * tripDays;
  const subtotalPerPerson = selectedTransport + stayCost + meals + pricing.sightseeing * tripDays;
  const totalBeforeDiscount = Math.round(subtotalPerPerson * group);
  const discount = Math.round(totalBeforeDiscount * DISCOUNT_RATE);
  const total = totalBeforeDiscount - discount;

  return {
    origin: DELHI_ORIGIN,
    travellers: group,
    transport,
    transportLabel: transportLabels[transport] || transport,
    days: tripDays,
    mealPlan,
    totalBeforeDiscount,
    discount,
    total,
    perPerson: Math.round(total / group),
    advance: Math.max(500, Math.round(total * 0.15)),
    distanceKm: pricing.distanceKm,
  };
};

export const buildPaymentDescription = (destination, quote) =>
  `${destination.label} booking from ${quote.origin}: ${quote.travellers} travellers, ${quote.days} days, ${quote.transportLabel}, ${quote.mealPlan}. 10% offer applied.`;
