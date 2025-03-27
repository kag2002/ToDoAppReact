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