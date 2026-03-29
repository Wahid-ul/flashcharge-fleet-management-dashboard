import { optimizeGrid } from '../services/optimizeLogic';

describe('optimizeGrid', () => {
  test('returns null when total power is under 100kW', () => {
    const chargers = [
      { id: '1', currentPowerKW: 30 },
      { id: '2', currentPowerKW: 40 },
      { id: '3', currentPowerKW: 20 },
    ];
    expect(optimizeGrid(chargers)).toBeNull();
  });

  test('returns null when total power equals 100kW', () => {
    const chargers = [
      { id: '1', currentPowerKW: 50 },
      { id: '2', currentPowerKW: 50 },
    ];
    expect(optimizeGrid(chargers)).toBeNull();
  });

  test('reduces the highest power charger by excess when over 100kW', () => {
    const chargers = [
      { id: '1', currentPowerKW: 60 },
      { id: '2', currentPowerKW: 50 },
    ];
    // Total 110, excess 10, max is 60, newPower 50
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '1', newPower: 50 });
  });

  test('does not reduce power below 0', () => {
    const chargers = [
      { id: '1', currentPowerKW: 20 },
      { id: '2', currentPowerKW: 90 },
    ];
    // Total 110, excess 10, max 90, 90-10=80 >0
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '2', newPower: 80 });
  });

  test('sets power to 0 if reduction would go below 0', () => {
    const chargers = [
      { id: '1', currentPowerKW: 10 },
      { id: '2', currentPowerKW: 95 },
    ];
    // Total 105, excess 5, max 95, 95-5=90 >0
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '2', newPower: 90 });
  });

  test('handles case where max charger power equals excess', () => {
    const chargers = [
      { id: '1', currentPowerKW: 50 },
      { id: '2', currentPowerKW: 51 },
    ];
    // Total 101, excess 1, max 51, 51-1=50
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '2', newPower: 50 });
  });

  test('selects the first charger if multiple have the same max power', () => {
    const chargers = [
      { id: '1', currentPowerKW: 60 },
      { id: '2', currentPowerKW: 60 },
      { id: '3', currentPowerKW: 30 },
    ];
    // Total 150, excess 50, max 60, 60-50=10
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '1', newPower: 10 });
  });

  test('handles single charger over limit', () => {
    const chargers = [
      { id: '1', currentPowerKW: 120 },
    ];
    // Total 120, excess 20, max 120, 120-20=100
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '1', newPower: 100 });
  });

  test('handles chargers with zero power', () => {
    const chargers = [
      { id: '1', currentPowerKW: 0 },
      { id: '2', currentPowerKW: 110 },
    ];
    // Total 110, excess 10, max 110, 110-10=100
    const result = optimizeGrid(chargers);
    expect(result).toEqual({ id: '2', newPower: 100 });
  });
});