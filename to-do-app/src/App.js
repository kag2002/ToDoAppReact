import "./App.css";
import Statistics from "./components/Statistics";
import PieCharts from "./components/PieChart";
import AddTask from "./components/AddTask";
import TodoDetailModal from "./components/TodoDetailModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import TodoTable from "./components/TodoTable";
import { useTodo } from "./hooks/useTodo";
import { getTableDataSource } from "./utils";

function App() {
  const {
    contextHolder,
    text,
    setText,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    modalVisible,
    modalConfirmDeleteVisible,
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
  } = useTodo();

  const statistics = getStatistics();
  const pieData = getPieData();
  const dataSource = getTableDataSource(todos);

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <h1>Todo App</h1>
      <Statistics
        total={statistics.totalTasks}
        completed={statistics.completedTasks}
        waiting={statistics.waitingTasks}
        overdue={statistics.overdueTasks}
      />
      <br />
      <hr style={{ margin: "0 250px" }} />
      <AddTask
        text={text}
        setText={setText}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleAddTodo={handleAddTodo}
        clearFields={clearFields}
      />
      <br />
      <TodoTable
        todos={dataSource}
        onToggleTodo={handleToggleTodo}
        onDeleteClick={openDeleteModal}
        onEditClick={openEditModal}
      />
      <PieCharts
        completed={statistics.completedTasks}
        waiting={statistics.waitingTasks}
        overdue={statistics.overdueTasks}
        pieData={pieData}
      />
      <TodoDetailModal
        visible={modalVisible}
        record={selectedRecord}
        onClose={closeEditModal}
        onSaveEdit={handleSaveEdit}
      />
      <ConfirmDeleteModal
        visible={modalConfirmDeleteVisible}
        record={selectedRecord}
        onClose={closeDeleteModal}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
