// src/components/PieCharts.js
import React from "react";
import { Row, Col, Typography } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const { Text } = Typography;

function PieCharts({ completed, waiting, overdue, pieData }) {
  const COLORS_PRIORITY = ["#FF8042", "#0088FE", "#00C49F"];
  const COLORS_STATUS = ["#3f8600", "#faad14"];

  // Prepare status data using the provided props
  const statusData = [
    { name: "Completed", value: completed },
    { name: "Waiting", value: waiting },
  ];

  // Check if there's any data to display in either chart.
  const hasPriorityData = pieData.some((entry) => entry.value > 0);
  const hasStatusData = statusData.some((entry) => entry.value > 0);

  if (!hasPriorityData && !hasStatusData) {
    return null; // Hide the component if no data exists
  }

  return (
    <Row
      style={{
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Col
        span={12}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Task Priority Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`priority-cell-${index}`}
                fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Col>

      <Col
        span={12}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Task Status Overview</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {statusData.map((entry, index) => (
              <Cell
                key={`status-cell-${index}`}
                fill={COLORS_STATUS[index % COLORS_STATUS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        {overdue > 0 && (
          <Text type="danger" style={{ fontSize: 14, marginTop: 10 }}>
            ⚠ {overdue} out of {waiting} "Waiting" tasks are overdue!
          </Text>
        )}
      </Col>
    </Row>
  );
}

export default PieCharts;
