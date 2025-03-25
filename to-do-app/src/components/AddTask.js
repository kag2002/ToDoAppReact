// src/components/AddTask.js
import React from "react";
import { Input, Button, Radio, DatePicker, Row, Col } from "antd";

const AddTask = ({
  text,
  setText,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  handleAddTodo,
  clearFields,
}) => {
  return (
    <>
      <h3>Add new Task</h3>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={9} md={7}>
          <div style={{ marginBottom: 4, fontSize: "12px", color: "#888" }}>
            Task content
          </div>
          <Input
            style={{ width: 300 }}
            placeholder="Enter a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={8} md={6}>
          <div style={{ marginBottom: 4, fontSize: "12px", color: "#888" }}>
            Choose priority
          </div>
          <Radio.Group
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <Radio value="high">High</Radio>
            <Radio value="normal">Normal</Radio>
            <Radio value="low">Low</Radio>
          </Radio.Group>
        </Col>
        <Col xs={24} sm={8} md={6}>
          <div style={{ marginBottom: 4, fontSize: "12px", color: "#888" }}>
            Select Due Date & Time
          </div>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            value={dueDate}
            onChange={(date) => setDueDate(date)}
          />
        </Col>
        <Col xs={24} sm={23} md={5}>
          <Button type="primary" onClick={() => handleAddTodo(text)}>
            Add Task
          </Button>
          <br />
          <br />
          <Button color="danger" variant="solid" onClick={clearFields}>Clear</Button>
        </Col>
      </Row>
    </>
  );
};

export default AddTask;
