// src/components/TodoDetailModal.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  Typography,
  Input,
  Button,
  Radio,
  DatePicker,
} from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const TodoDetailModal = ({ visible, record, onClose, onSaveEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("normal");
  const [editDueDate, setEditDueDate] = useState(null);

  // Update modal state when record changes
  useEffect(() => {
    if (record) {
      setEditText(record.text);
      setEditPriority(record.priority || "normal");
      setEditDueDate(
        record.dueDate ? moment(record.dueDate, "YYYY-MM-DD HH:mm") : null
      );
      setEditMode(false); // Default to view mode
    }
  }, [record]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const formattedDueDate = editDueDate
      ? editDueDate.format("YYYY-MM-DD HH:mm")
      : null;

    onSaveEdit({
      id: record.key,
      ...record,
      text: editText,
      priority: editPriority,
      dueDate: formattedDueDate,
    });
    setEditMode(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Card>
        {editMode ? (
          <>
            <Title level={4}>Edit Task</Title>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Task Description:</Text>
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ marginTop: 8 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Priority&nbsp;&ensp;</Text>
              <Radio.Group
                onChange={(e) => setEditPriority(e.target.value)}
                value={editPriority}
                style={{ marginTop: 8 }}
              >
                <Radio value="high">High</Radio>
                <Radio value="normal">Normal</Radio>
                <Radio value="low">Low</Radio>
              </Radio.Group>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Due Date & Time &nbsp;&ensp;</Text>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                value={editDueDate}
                onChange={(date) => setEditDueDate(date)}
                style={{ marginTop: 8 }}
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => setEditMode(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          </>
        ) : (
          <>
            <Title level={4}>Task Details</Title>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Task Description:</Text>
              <p>{record?.text}</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Status:</Text>
              <p>{record?.completed ? "Completed" : "Waiting"}</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Priority:</Text>
              <p>
                {record?.priority
                  ? record.priority.charAt(0).toUpperCase() +
                    record.priority.slice(1)
                  : "-"}
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Due Date & Time:</Text>
              <p>{record?.dueDate ? record.dueDate : "-"}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Close
              </Button>
              <Button type="primary" onClick={handleEditClick}>
                Edit
              </Button>
            </div>
          </>
        )}
      </Card>
    </Modal>
  );
};

export default TodoDetailModal;
