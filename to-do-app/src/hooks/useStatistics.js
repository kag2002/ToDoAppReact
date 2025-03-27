import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT } from "../constants/config";
dayjs.extend(customParseFormat);

export const useStatistics = (todos) => {
  const getStatistics = () => {
    const totalTasks = todos.length;
    const completedTasks = todos.filter((todo) => todo.completed).length;
    const waitingTasks = totalTasks - completedTasks;
    const overdueTasks = todos.filter(
      (todo) =>
        todo.dueDate &&
        dayjs(todo.dueDate, DATE_FORMAT).isBefore(dayjs()) &&
        !todo.completed
    ).length;

    return {
      totalTasks,
      completedTasks,
      waitingTasks,
      overdueTasks,
    };
  };

  const getPieData = () => {
    return [
      {
        name: "High",
        value: todos.filter((todo) => todo.priority === "high").length,
      },
      {
        name: "Normal",
        value: todos.filter((todo) => todo.priority === "normal").length,
      },
      {
        name: "Low",
        value: todos.filter((todo) => todo.priority === "low").length,
      },
    ];
  };

  return { getStatistics, getPieData };
};
