// Static pricing matrix derived from the cost-guide articles. All values are
// US national averages for 2026 (parts + labor).

export type Symptom = {
  id: string;
  label: string;
  low: number;
  high: number;
};

export type ApplianceData = {
  id: string;
  label: string;
  brands: string[];
  symptoms: Symptom[];
  guideSlug: string;
};

export const APPLIANCES: ApplianceData[] = [
  {
    id: "refrigerator",
    label: "Refrigerator",
    brands: ["Whirlpool", "GE", "LG", "Samsung", "Frigidaire", "KitchenAid", "Sub-Zero", "Other"],
    guideSlug: "refrigerator-repair-cost-guide",
    symptoms: [
      { id: "not-cooling", label: "Not cooling / warm inside", low: 200, high: 600 },
      { id: "compressor", label: "Compressor failure", low: 500, high: 1200 },
      { id: "ice-maker", label: "Ice maker broken", low: 300, high: 500 },
      { id: "leaking", label: "Leaking water", low: 150, high: 400 },
      { id: "noisy", label: "Loud / noisy", low: 200, high: 450 },
      { id: "control-board", label: "Main control board", low: 300, high: 600 },
      { id: "door-seal", label: "Door gasket / seal", low: 100, high: 300 },
    ],
  },
  {
    id: "washer",
    label: "Washing Machine",
    brands: ["Whirlpool", "LG", "Samsung", "Maytag", "GE", "Speed Queen", "Other"],
    guideSlug: "washing-machine-repair-cost-guide",
    symptoms: [
      { id: "wont-drain", label: "Won't drain or pump", low: 150, high: 350 },
      { id: "wont-spin", label: "Won't spin", low: 200, high: 500 },
      { id: "leaking", label: "Leaking water", low: 150, high: 400 },
      { id: "bearings", label: "Tub bearings", low: 400, high: 700 },
      { id: "motor", label: "Drive motor", low: 350, high: 650 },
      { id: "control-board", label: "Control board", low: 250, high: 500 },
      { id: "error-code", label: "Error code on display", low: 150, high: 400 },
    ],
  },
  {
    id: "dryer",
    label: "Dryer",
    brands: ["Whirlpool", "LG", "Samsung", "GE", "Maytag", "Electrolux", "Other"],
    guideSlug: "dryer-repair-cost-guide",
    symptoms: [
      { id: "no-heat", label: "No heat / cold air only", low: 150, high: 400 },
      { id: "wont-start", label: "Won't start / no power", low: 150, high: 300 },
      { id: "noisy", label: "Loud noise / squealing", low: 200, high: 400 },
      { id: "long-dry", label: "Takes too long to dry", low: 150, high: 350 },
      { id: "thermostat", label: "Thermostat / thermal fuse", low: 100, high: 250 },
      { id: "control-board", label: "Control board", low: 250, high: 500 },
    ],
  },
  {
    id: "dishwasher",
    label: "Dishwasher",
    brands: ["Bosch", "Whirlpool", "KitchenAid", "GE", "Samsung", "LG", "Miele", "Other"],
    guideSlug: "dishwasher-repair-cost-guide",
    symptoms: [
      { id: "wont-drain", label: "Won't drain", low: 150, high: 350 },
      { id: "leaking", label: "Leaking", low: 150, high: 400 },
      { id: "not-cleaning", label: "Not cleaning dishes", low: 150, high: 350 },
      { id: "wont-start", label: "Won't start", low: 150, high: 300 },
      { id: "pump-motor", label: "Pump / motor", low: 300, high: 600 },
      { id: "control-board", label: "Control board", low: 250, high: 500 },
      { id: "error-code", label: "Error code on display", low: 150, high: 400 },
    ],
  },
  {
    id: "oven",
    label: "Oven / Stove",
    brands: ["GE", "Whirlpool", "Samsung", "LG", "Frigidaire", "Bosch", "KitchenAid", "Other"],
    guideSlug: "oven-stove-repair-cost-guide",
    symptoms: [
      { id: "no-heat", label: "Oven won't heat", low: 200, high: 450 },
      { id: "uneven-heat", label: "Heats unevenly", low: 200, high: 400 },
      { id: "burner-out", label: "Burner / element out", low: 100, high: 300 },
      { id: "igniter", label: "Igniter (gas)", low: 200, high: 400 },
      { id: "control-board", label: "Control board", low: 300, high: 600 },
      { id: "door-hinge", label: "Door / hinge / seal", low: 150, high: 350 },
    ],
  },
];

export const REGIONS: { id: string; label: string; multiplier: number }[] = [
  { id: "northeast", label: "Northeast (NY, NJ, MA, PA…)", multiplier: 1.15 },
  { id: "west", label: "West Coast (CA, OR, WA…)", multiplier: 1.2 },
  { id: "midwest", label: "Midwest (IL, OH, MI…)", multiplier: 0.95 },
  { id: "south", label: "South (TX, FL, GA, NC…)", multiplier: 0.95 },
  { id: "mountain", label: "Mountain (CO, UT, AZ…)", multiplier: 1.05 },
  { id: "rural", label: "Rural / small town", multiplier: 0.9 },
];

export type Estimate = {
  low: number;
  avg: number;
  high: number;
  national: { low: number; avg: number; high: number };
};

export function estimateRepair(symptom: Symptom, regionMultiplier: number): Estimate {
  const low = Math.round(symptom.low * regionMultiplier);
  const high = Math.round(symptom.high * regionMultiplier);
  return {
    low,
    avg: Math.round((low + high) / 2),
    high,
    national: {
      low: symptom.low,
      avg: Math.round((symptom.low + symptom.high) / 2),
      high: symptom.high,
    },
  };
}
