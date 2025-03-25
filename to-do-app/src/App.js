// src/App.js
import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAsync,
  deleteTodoAsync,
  toggleTodoAsync,
  editTodoAsync,
} from "./todoSlice";
import { Table, Radio, DatePicker, Row, Col, Input, Button, message } from "antd";
import Statistics from "./components/Statistics";
import PieCharts from "./components/PieChart";
import AddTask from "./components/AddTask";
import moment from "moment";
import TodoDetailModal from "./components/TodoDetailModal";

function App() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTick((prev) => prev + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  // For tick (if used later) 
  const [tick, setTick] = useState(0);

  const todos = useSelector((state) => state.todos.todos || state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = async () => {
    if (text) {
      const formattedDueDate = dueDate ? dueDate.format("YYYY-MM-DD HH:mm") : null;
      try {
        await dispatch(
          addTodoAsync({ text, priority, dueDate: formattedDueDate })
        ).unwrap();
        message.success("Todo added successfully!");
        clearFields();
      } catch (error) {
        message.error("Failed to add todo.");
      }
    }
  };

  // Clear input fields
  const clearFields = () => {
    setText("");
    setDueDate(null);
    setPriority("normal");
  };

  // Handle updated record from TodoDetailModal
  const handleSaveEdit = async (updatedRecord) => {
    try {
      await dispatch(editTodoAsync(updatedRecord)).unwrap();
      message.success("Todo updated successfully!");
      setModalVisible(false);
      setSelectedRecord(null);
    } catch (error) {
      message.error("Failed to update todo.");
    }
  };

  // Map todos for the Table
  const dataSource = todos.map((todo) => ({
    id: todo.id,
    key: todo.id,
    text: todo.text,
    completed: todo.completed,
    priority: todo.priority,
    dueDate: todo.dueDate,
  }));

  const columns = [
    {
      title: "Task",
      dataIndex: "text",
      key: "text",
      sorter: (a, b) => a.text.localeCompare(b.text),
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span style={{ textDecoration: record.completed ? "line-through" : "none" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (completed ? "Completed" : "Waiting"),
      filters: [
        { text: "Completed", value: true },
        { text: "Waiting", value: false },
      ],
      onFilter: (value, record) => record.completed === value,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "High", value: "high" },
        { text: "Normal", value: "normal" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (priority) =>
        priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : "",
    },
    {
      title: "Due Date & Time",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return moment(a.dueDate, "YYYY-MM-DD HH:mm").diff(
          moment(b.dueDate, "YYYY-MM-DD HH:mm")
        );
      },
      sortDirections: ["descend", "ascend"],
      render: (dueDate, record) => {
        if (!dueDate) return "-";
        const isOverdue =
          moment(dueDate, "YYYY-MM-DD HH:mm").isBefore(moment()) &&
          !record.completed;
        return (
          <span style={{ color: isOverdue ? "red" : "inherit" }}>
            {dueDate}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            onClick={async () => {
              try {
                await dispatch(toggleTodoAsync(record.id)).unwrap();
                message.success("Status updated successfully!");
              } catch (error) {
                message.error("Failed to update status.");
              }
            }}
            style={{ marginRight: 4 }}
          >
            {record.completed ? "Mark as Undone" : "Mark as Done"}
          </Button>
          <Button
            onClick={async () => {
              try {
                await dispatch(deleteTodoAsync(record.id)).unwrap();
                message.success("Todo deleted successfully!");
              } catch (error) {
                message.error("Failed to delete todo.");
              }
            }}
            style={{ marginRight: 4 }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setSelectedRecord(record);
              setModalVisible(true);
            }}
          >
            View / Edit
          </Button>
        </>
      ),
    },
  ];

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const waitingTasks = totalTasks - completedTasks;
  const overdueTasks = todos.filter(
    (todo) =>
      todo.dueDate &&
      moment(todo.dueDate, "YYYY-MM-DD HH:mm").isBefore(moment()) &&
      !todo.completed
  ).length;
  const pieData = [
    { name: "High", value: todos.filter((todo) => todo.priority === "high").length },
    { name: "Normal", value: todos.filter((todo) => todo.priority === "normal").length },
    { name: "Low", value: todos.filter((todo) => todo.priority === "low").length },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      {/* Statistics component */}
      <Statistics
        total={totalTasks}
        completed={completedTasks}
        waiting={waitingTasks}
        overdue={overdueTasks}
      />
      <br />
      <hr style={{ margin: "0 250px" }} />
      {/* Add Task component */}
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
      {/* Table with todos */}
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
      <PieCharts
        completed={completedTasks}
        waiting={waitingTasks}
        overdue={overdueTasks}
        pieData={pieData}
      />
      {/* Todo Detail Modal */}
      <TodoDetailModal
        visible={modalVisible}
        record={selectedRecord}
        onClose={() => setModalVisible(false)}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  );
}

export default App;
