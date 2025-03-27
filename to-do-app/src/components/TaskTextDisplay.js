import React, { useState } from "react";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";

const TaskTextDisplay = ({ text = "", completed, record = {} }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const MAX_LENGTH = 80; // Maximum number of characters to display initially

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Check if text is too long
  const isTextTooLong = text.length > MAX_LENGTH;

  // Shorten the text if necessary
  const displayText = isTextTooLong
    ? text.substring(0, MAX_LENGTH) + "..."
    : text;

  // Format the due date using Day.js
  const formattedDueDate = record?.dueDate
    ? record.dueDate.format
      ? record.dueDate.format(DATE_FORMAT)
      : dayjs(record.dueDate, DATE_FORMAT).format(DATE_FORMAT)
    : "Not set";

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ textDecoration: completed ? "line-through" : "none" }}>
          {displayText}
        </span>
        {isTextTooLong && (
          <Button type="link" onClick={showModal}>
            View
          </Button>
        )}
      </div>

      <Modal
        title="Task Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div style={{ padding: "20px" }}>
          <h3>Task Content</h3>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>{text}</p>

          <h3>Status</h3>
          <p style={{ marginBottom: "20px" }}>
            {completed ? "Completed" : "Waiting"}
          </p>

          <h3>Priority</h3>
          <p style={{ marginBottom: "20px" }}>
            {record?.priority
              ? record.priority.charAt(0).toUpperCase() +
                record.priority.slice(1)
              : "Not set"}
          </p>

          <h3>Due Date & Time</h3>
          <p>{formattedDueDate}</p>
        </div>
      </Modal>
    </>
  );
};

export default TaskTextDisplay;
