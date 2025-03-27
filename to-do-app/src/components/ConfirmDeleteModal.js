import { useEffect, useState } from "react";
import { Button, Modal, Card, Typography } from "antd";
const { Title, Text } = Typography;

const ConfirmDeleteModal = ({ record, visible, onClose, onDelete }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Normal");

  useEffect(() => {
    if (record) {
      setText(record.text);
      // Ensure the first letter is uppercase
      const pri = record.priority
        ? record.priority.charAt(0).toUpperCase() + record.priority.slice(1)
        : "Normal";
      setPriority(pri);
    }
  }, [record]);

  const handleConfirmDelete = () => {
    onDelete(record.key); // pass the id of the record
    onClose(); // close the modal after deletion
  };

  const handleCancelDelete = () => {
    onClose();
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
        <Title level={4}>Delete Task</Title>
        <div style={{ marginBottom: 16 }}>
          <Text strong>Task Description: </Text>
          <Text>{text}</Text>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Text strong>Priority: </Text>
          <Text>{priority}</Text>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button onClick={handleCancelDelete} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            color="danger"
            variant="solid"
            type="primary"
            onClick={handleConfirmDelete}
          >
            Confirm
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ConfirmDeleteModal;
