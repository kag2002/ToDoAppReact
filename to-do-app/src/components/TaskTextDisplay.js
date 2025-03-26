import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import moment from 'moment';

const TaskTextDisplay = ({ text, completed, record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const MAX_LENGTH = 80; // Số ký tự tối đa hiển thị ban đầu

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Kiểm tra xem text có vượt quá độ dài tối đa không
  const isTextTooLong = text.length > MAX_LENGTH;
  
  // Cắt text nếu quá dài
  const displayText = isTextTooLong 
    ? text.substring(0, MAX_LENGTH) + "..."
    : text;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        <div style={{ padding: '20px' }}>
          <h3>Task Content</h3>
          <p style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>{text}</p>
          
          <h3>Status</h3>
          <p style={{ marginBottom: '20px' }}>
            {completed ? "Completed" : "Waiting"}
          </p>
          
          <h3>Priority</h3>
          <p style={{ marginBottom: '20px' }}>
            {record?.priority ? record.priority.charAt(0).toUpperCase() + record.priority.slice(1) : "Not set"}
          </p>
          
          <h3>Due Date & Time</h3>
          <p>
            {record?.dueDate ? moment(record.dueDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm") : "Not set"}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default TaskTextDisplay;
