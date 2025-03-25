import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Expect payload: { text, priority, dueDate }
      const { text, priority, dueDate } = action.payload;
      state.todos.push({
        id: Date.now(), // unique id based on timestamp
        text,
        priority,
        dueDate, // formatted as "YYYY-MM-DD HH:mm" or null
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      // Filter out the todo with matching id from action.payload
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      // Expect payload: { id, text, priority, dueDate }
      const { id, text, priority, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.priority = priority;
        todo.dueDate = dueDate;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
