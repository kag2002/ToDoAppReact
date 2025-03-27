export const MESSAGE_KEY = "updatable";
export const MESSAGE_DURATION = 2;
export const LOADING_DELAY = 500;

export const MESSAGES = {
  ADD: {
    LOADING: "Adding todo...",
    SUCCESS: "Todo added successfully!",
    ERROR: "Failed to add todo!",
    WARNING: "Task description cannot be empty!"
  },
  DELETE: {
    LOADING: "Deleting todo...",
    SUCCESS: "Todo deleted successfully!",
    ERROR: "Failed to delete todo!"
  },
  TOGGLE: {
    LOADING: "Updating status...",
    SUCCESS: "Status updated successfully!",
    ERROR: "Failed to update status!"
  },
  EDIT: {
    LOADING: "Saving changes...",
    SUCCESS: "Todo updated successfully!",
    ERROR: "Failed to update todo!"
  }
}; 