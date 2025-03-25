// src/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding a todo
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async ({ text, priority, dueDate }) => {
    // Simulate an API call delay (e.g., 500ms)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ text, priority, dueDate });
      }, 500);
    });
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 500);
    });
  }
);

export const editTodoAsync = createAsyncThunk(
  "todos/editTodoAsync",
  async ({ id, text, priority, dueDate }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, text, priority, dueDate });
      }, 500);
    });
  }
);

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      const { text, priority, dueDate } = action.payload;
      state.todos.push({
        id: Date.now(),
        text,
        priority,
        dueDate,
        completed: false,
      });
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    });
    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      const { id, text, priority, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.priority = priority;
        todo.dueDate = dueDate;
      }
    });
  },
});

export default todoSlice.reducer;
