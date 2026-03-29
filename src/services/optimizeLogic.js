export const optimizeGrid = (chargers) => {
  const LIMIT = 100;

  // Calculate total power
  const total = chargers.reduce(
    (sum, c) => sum + c.currentPowerKW,
    0
  );

  // If already safe → do nothing
  if (total <= LIMIT) return null;

  const excess = total - LIMIT;

  // Find highest-load charger
  let maxCharger = chargers[0];

  for (let charger of chargers) {
    if (charger.currentPowerKW > maxCharger.currentPowerKW) {
      maxCharger = charger;
    }
  }

  // Prevent negative power
  const newPower = Math.max(
    maxCharger.currentPowerKW - excess,
    0
  );

  return {
    id: maxCharger.id,
    newPower,
  };
};