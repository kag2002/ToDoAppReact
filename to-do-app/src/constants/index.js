export * from "./validation";
export * from "./config";

export const MESSAGE_KEY = "updatable";
export const MESSAGE_DURATION = 2;
export const LOADING_DELAY = 500;
export const MAX_TEXT_LENGTH = 50;

export const PRIORITY_OPTIONS = [
  { text: "High", value: "high" },
  { text: "Normal", value: "normal" },
  { text: "Low", value: "low" },
];

export const STATUS_FILTERS = [
  { text: "Completed", value: true },
  { text: "Waiting", value: false },
];

export const TABLE_PAGINATION = {
  pageSize: 5,
};

export const MODAL_WIDTH = 600;
