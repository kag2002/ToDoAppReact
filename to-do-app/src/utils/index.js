import moment from "moment";
import { DATE_FORMAT } from "../constants/config";
export const formatDate = (date) => {
  return date ? date.format(DATE_FORMAT) : null;
};

export const isOverdue = (dueDate, completed) => {
  return (
    dueDate && moment(dueDate, DATE_FORMAT).isBefore(moment()) && !completed
  );
};

export const capitalizeFirstLetter = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const getTableDataSource = (todos) => {
  return todos.map((todo) => ({
    id: todo.id,
    key: todo.id,
    text: todo.text,
    completed: todo.completed,
    priority: todo.priority,
    dueDate: todo.dueDate,
  }));
};

export * from "./date";
export * from "./formatting";
export * from "./table";
