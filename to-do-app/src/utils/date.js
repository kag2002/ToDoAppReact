import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { DATE_FORMAT } from "../constants/config";
dayjs.extend(customParseFormat);

export const formatDate = (date) => {
  if (!date) return null;
  // If date has a .format method, it's likely already a Day.js object.
  return typeof date.format === "function"
    ? date.format(DATE_FORMAT)
    : dayjs(date, DATE_FORMAT).format(DATE_FORMAT);
};

export const isOverdue = (dueDate, completed) => {
  if (!dueDate) return false;
  const dateObj =
    typeof dueDate.format === "function"
      ? dueDate
      : dayjs(dueDate, DATE_FORMAT);
  return dateObj.isBefore(dayjs()) && !completed;
};

export const capitalizeFirstLetter = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};
