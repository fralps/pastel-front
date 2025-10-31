// Centralized configuration for sleep types
const SLEEP_TYPE_CONFIG = {
  dream: {
    label: "dashboard.sleepType.dream",
    color: "primary",
    icon: "star",
  },
  lucid: {
    label: "dashboard.sleepType.lucid",
    color: "purple",
    icon: "sparkles",
  },
  nightmare: {
    label: "dashboard.sleepType.nightmare",
    color: "red",
    icon: "moon",
  },
  erotic: {
    label: "dashboard.sleepType.erotic",
    color: "pink",
    icon: "heart",
  },
  sleep_paralysis: {
    label: "dashboard.sleepType.sleep_paralysis",
    color: "yellow",
    icon: "angry",
  },
  sleep_talking: {
    label: "dashboard.sleepType.sleep_talking",
    color: "green",
    icon: "speech",
  },
  sleep_walking: {
    label: "dashboard.sleepType.sleep_walking",
    color: "cyan",
    icon: "footprints",
  },
  sleep_apnea: {
    label: "dashboard.sleepType.sleep_apnea",
    color: "blue",
    icon: "wind",
  },
  other: {
    label: "dashboard.sleepType.other",
    color: "primary",
    icon: "star",
  },
} as const;

type SleepType = keyof typeof SLEEP_TYPE_CONFIG;

// Automatically generate options from config
export const sleepTypeOptions = Object.entries(SLEEP_TYPE_CONFIG).map(
  ([value, config]) => ({
    label: config.label,
    value,
  }),
);

// Helper to get config with fallback to default
const getSleepConfig = (type: string | null) =>
  SLEEP_TYPE_CONFIG[type as SleepType] ?? SLEEP_TYPE_CONFIG.dream;

// Simplified functions
export const sleepTypeColor = (type: string | null): string => {
  const color = getSleepConfig(type).color;
  return `bg-${color}-100 text-${color}-700 dark:bg-${color}-900/30 dark:text-${color}-400`;
};

export const sleepTypeIcon = (type: string | null): string =>
  getSleepConfig(type).icon;

export const sleepTypeTextColor = (type: string | null): string => {
  const color = getSleepConfig(type).color;
  return `text-${color}-700 dark:text-${color}-400`;
};
