export const sleepTypeOptions = [
  { label: "dashboard.sleepType.dream", value: "dream" },
  { label: "dashboard.sleepType.lucid", value: "lucid" },
  { label: "dashboard.sleepType.nightmare", value: "nightmare" },
  { label: "dashboard.sleepType.erotic", value: "erotic" },
  { label: "dashboard.sleepType.sleep_paralysis", value: "sleep_paralysis" },
  { label: "dashboard.sleepType.sleep_talking", value: "sleep_talking" },
  { label: "dashboard.sleepType.sleep_walking", value: "sleep_walking" },
  { label: "dashboard.sleepType.sleep_apnea", value: "sleep_apnea" }
];

export const sleepTypeColor = (type: string | null): string => {
  switch (type) {
    case "lucid":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "nightmare":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "dream":
      return "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400";
    case "erotic":
      return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400";
    case "sleep_paralysis":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "sleep_talking":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "sleep_apnea":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "sleep_walking":
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
    default:
      return "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400";
  }
};

export const sleepTypeIcon = (type: string | null) => {
  switch (type) {
    case "lucid":
      return "sparkles";
    case "nightmare":
      return "moon";
    case "dream":
      return "star";
    case "erotic":
      return "heart";
    case "sleep_paralysis":
      return "angry";
    case "sleep_talking":
      return "speech";
    case "sleep_apnea":
      return "wind";
    case "sleep_walking":
      return "footprints";
    default:
      return "star";
  }
};

export const sleepTypeTextColor = (type: string | null): string => {
  switch (type) {
    case "lucid":
      return "text-purple-700 dark:text-purple-400";
    case "nightmare":
      return "text-red-700 dark:text-red-400";
    case "dream":
      return "text-primary-700 dark:text-primary-400";
    case "erotic":
      return "text-pink-700 dark:text-pink-400";
    case "sleep_paralysis":
      return "text-yellow-700 dark:text-yellow-400";
    case "sleep_talking":
      return "text-green-700 dark:text-green-400";
    case "sleep_apnea":
      return "text-blue-700 dark:text-blue-400";
    case "sleep_walking":
      return "text-cyan-700 dark:text-cyan-400";
    default:
      return "text-primary-700 dark:text-primary-400";
  }
};
