export type ErrorCodeEntry = {
  brand: string;
  brandSlug: string;
  code: string;
  codeSlug: string;
  appliance: "Dishwasher" | "Washer" | "Dryer" | "Oven" | "Refrigerator";
  title: string;
  meaning: string;
  commonCauses: string[];
  fixSteps: string[];
  costRange: string;
  relatedPostSlug?: string;
};

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const raw: Omit<ErrorCodeEntry, "brandSlug" | "codeSlug">[] = [
  {
    brand: "Bosch",
    code: "E15",
    appliance: "Dishwasher",
    title: "Bosch Dishwasher E15 — Leak Protection Triggered",
    meaning:
      "Water has collected in the base pan and the AquaStop leak-protection float has shut the dishwasher down to prevent flooding.",
    commonCauses: [
      "Slow leak from the water inlet valve or hose",
      "Cracked sump or door seal",
      "Recently spilled water under the unit",
      "Faulty float switch",
    ],
    fixSteps: [
      "Turn off power and water supply",
      "Tip the dishwasher backward to drain the base pan and dry it thoroughly",
      "Inspect inlet hose, valve, and sump for active leaks",
      "Restore power and run a short cycle to confirm the code is cleared",
    ],
    costRange: "$0 DIY · $150–$400 pro",
    relatedPostSlug: "bosch-dishwasher-e15-error-code",
  },
  {
    brand: "LG",
    code: "OE",
    appliance: "Washer",
    title: "LG Washer OE — Drain Error",
    meaning:
      "The washer could not drain within the expected time window. Water is still in the drum after the drain step.",
    commonCauses: [
      "Clogged drain pump filter or pump impeller",
      "Kinked, blocked, or improperly installed drain hose",
      "Failed drain pump motor",
      "Clogged household standpipe",
    ],
    fixSteps: [
      "Power off and unplug the washer",
      "Open the lower access panel and clean the drain pump filter",
      "Straighten the drain hose; verify it is no higher than 96 inches",
      "If the pump hums but does not move water, replace the drain pump",
    ],
    costRange: "$0 DIY · $150–$350 pro",
    relatedPostSlug: "lg-washer-oe-error-code",
  },
  {
    brand: "Samsung",
    code: "4C",
    appliance: "Washer",
    title: "Samsung Washer 4C / 4E — Water Supply Error",
    meaning:
      "The washer is not receiving water within the expected time. Older models display this as 4E.",
    commonCauses: [
      "Water supply valves at the wall are turned off",
      "Kinked or pinched water inlet hose",
      "Clogged inlet screen filters",
      "Faulty water inlet valve",
    ],
    fixSteps: [
      "Verify both hot and cold supply valves are fully open",
      "Disconnect inlet hoses and clean the mesh screens",
      "Check for kinks or low water pressure",
      "If clear and pressure is good, replace the inlet valve",
    ],
    costRange: "$0 DIY · $150–$300 pro",
    relatedPostSlug: "samsung-washer-4c-error-code",
  },
  {
    brand: "Whirlpool",
    code: "F2 E2",
    appliance: "Dishwasher",
    title: "Whirlpool Dishwasher F2 E2 — Stuck Button / Keypad Fault",
    meaning:
      "The control panel detects a button stuck closed, or the touchpad/control-board pair is failing.",
    commonCauses: [
      "Moisture or debris on the keypad",
      "Failed touchpad ribbon cable",
      "Failed main control board",
    ],
    fixSteps: [
      "Disconnect power for 5 minutes to reset",
      "Inspect and dry the keypad area",
      "If the code returns, replace the touchpad/control assembly",
    ],
    costRange: "$0 DIY · $200–$500 pro",
    relatedPostSlug: "whirlpool-dishwasher-f2-e2-error-code",
  },
  {
    brand: "GE",
    code: "F3",
    appliance: "Oven",
    title: "GE Oven F3 — Open Oven Temperature Sensor",
    meaning:
      "The oven control reads the temperature sensor (RTD probe) as open. The oven will not heat to protect itself.",
    commonCauses: [
      "Failed temperature sensor (most common)",
      "Damaged sensor wiring or connector",
      "Failed electronic oven control (ERC)",
    ],
    fixSteps: [
      "Turn off the circuit breaker",
      "Pull the oven out and unplug the sensor at the rear",
      "Test sensor resistance — should be ~1080Ω at room temperature",
      "Replace the sensor if out of spec; if good, replace the ERC",
    ],
    costRange: "$30 DIY part · $200–$450 pro",
    relatedPostSlug: "ge-oven-f3-error-code",
  },
];

export const ERROR_CODES: ErrorCodeEntry[] = raw.map((e) => ({
  ...e,
  brandSlug: slug(e.brand),
  codeSlug: slug(e.code),
}));

export function findErrorCode(brandSlug: string, codeSlug: string): ErrorCodeEntry | undefined {
  return ERROR_CODES.find((e) => e.brandSlug === brandSlug && e.codeSlug === codeSlug);
}

export function getAllBrands(): string[] {
  return [...new Set(ERROR_CODES.map((e) => e.brand))].sort();
}
