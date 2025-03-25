import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo, editTodo } from "./todoSlice";
import { Table, Button, message } from "antd";
import Statistics from "./components/Statistics";
import PieCharts from "./components/PieChart";
import AddTask from "./components/AddTask";
import moment from "moment";
import TodoDetailModal from "./components/TodoDetailModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const todos = useSelector((state) => state.todos.todos || state.todos);
  const dispatch = useDispatch();

  // Auto refresh every minute (if needed)
  useEffect(() => {
    const interval = setInterval(() => {}, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTodo = () => {
    if (text.trim()) {
      const formattedDueDate = dueDate
        ? dueDate.format("YYYY-MM-DD HH:mm")
        : null;
      messageApi.open({
        key,
        type: "loading",
        content: "Adding todo...",
      });
      dispatch(addTodo({ text, priority, dueDate: formattedDueDate }));
      setTimeout(() => {
        messageApi.open({
          key,
          type: "success",
          content: "Todo added successfully!",
          duration: 2,
        });
        clearFields();
      }, 500);
    } else {
      messageApi.warning({
        content: "Task description cannot be empty!",
        duration: 2,
      });
    }
  };

  const handleDeleteTodo = (id) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Deleting todo...",
    });
    dispatch(deleteTodo(id));
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Todo deleted successfully!",
        duration: 2,
      });
    }, 500);
  };

  const handleToggleTodo = (id) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Updating status...",
    });
    dispatch(toggleTodo(id));
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Status updated successfully!",
        duration: 2,
      });
    }, 500);
  };

  const handleSaveEdit = (updatedRecord) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Saving changes...",
    });
    dispatch(editTodo(updatedRecord));
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Todo updated successfully!",
        duration: 2,
      });
      setModalVisible(false);
      setSelectedRecord(null);
    }, 500);
  };

  const clearFields = () => {
    setText("");
    setDueDate(null);
    setPriority("normal");
  };

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
        <span
          style={{ textDecoration: record.completed ? "line-through" : "none" }}
        >
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
            onClick={() => handleToggleTodo(record.key)}
            style={{ marginRight: 4 }}
          >
            {record.completed ? "Mark as Undone" : "Mark as Done"}
          </Button>
          <Button
            onClick={() => {
              setSelectedRecord(record);
              setModalConfirmDeleteVisible(true);
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

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <h1>Todo App</h1>
      <Statistics
        total={totalTasks}
        completed={completedTasks}
        waiting={waitingTasks}
        overdue={overdueTasks}
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
      <TodoDetailModal
        visible={modalVisible}
        record={selectedRecord}
        onClose={() => setModalVisible(false)}
        onSaveEdit={handleSaveEdit}
      />
      <ConfirmDeleteModal
        visible={modalConfirmDeleteVisible}
        record={selectedRecord}
        onClose={() => setModalConfirmDeleteVisible(false)}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
