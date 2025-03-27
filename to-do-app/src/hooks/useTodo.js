import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from "../store/slices/todoSlice";
import { useMessage } from "./useMessage";
import { useModal } from "./useModal";
import { useTodoForm } from "./useTodoForm";
import { useStatistics } from "./useStatistics";
import { LOADING_DELAY, DATE_FORMAT } from "../constants";

import dayjs from "dayjs";

export const useTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos || state.todos);

  const { showMessage, contextHolder } = useMessage();
  const {
    modalVisible,
    setModalVisible,
    modalConfirmDeleteVisible,
    setModalConfirmDeleteVisible,
    selectedRecord,
    openEditModal,
    openDeleteModal,
    closeEditModal,
    closeDeleteModal,
  } = useModal();

  const {
    text,
    setText,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    clearFields,
  } = useTodoForm();

  const { getStatistics, getPieData } = useStatistics(todos);

  const handleAddTodo = () => {
    if (text.trim()) {
      showMessage("loading", "Adding todo...");
      try {
        // dueDate is expected to be a Day.js object from DatePicker
        const formattedDueDate = dueDate ? dueDate.format(DATE_FORMAT) : null;
        dispatch(addTodo({ text, priority, dueDate: formattedDueDate }));
        setTimeout(() => {
          showMessage("success", "Todo added successfully!");
          clearFields();
        }, LOADING_DELAY);
      } catch (error) {
        showMessage("error", "Failed to add todo!");
      }
    } else {
      showMessage("warning", "Task description cannot be empty!");
    }
  };

  const handleDeleteTodo = (id) => {
    showMessage("loading", "Deleting todo...");
    try {
      dispatch(deleteTodo(id));
      setTimeout(() => {
        showMessage("success", "Todo deleted successfully!");
        closeDeleteModal();
      }, LOADING_DELAY);
    } catch (error) {
      showMessage("error", "Failed to delete todo!");
    }
  };

  const handleToggleTodo = (id) => {
    showMessage("loading", "Updating status...");
    try {
      dispatch(toggleTodo(id));
      setTimeout(() => {
        showMessage("success", "Status updated successfully!");
      }, LOADING_DELAY);
    } catch (error) {
      showMessage("error", "Failed to update status!");
    }
  };

  const handleSaveEdit = (updatedRecord) => {
    showMessage("loading", "Saving changes...");
    try {
      // Ensure updatedRecord.dueDate is formatted using dayjs
      const formattedDueDate = updatedRecord.dueDate
        ? dayjs(updatedRecord.dueDate).format(DATE_FORMAT)
        : null;
      dispatch(editTodo({ ...updatedRecord, dueDate: formattedDueDate }));
      setTimeout(() => {
        showMessage("success", "Todo updated successfully!");
        closeEditModal();
      }, LOADING_DELAY);
    } catch (error) {
      showMessage("error", "Failed to update todo!");
    }
  };

  return {
    contextHolder,
    text,
    setText,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    modalVisible,
    setModalVisible,
    modalConfirmDeleteVisible,
    setModalConfirmDeleteVisible,
    selectedRecord,
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleSaveEdit,
    clearFields,
    getStatistics,
    getPieData,
    openEditModal,
    openDeleteModal,
    closeEditModal,
    closeDeleteModal,
  };
};
