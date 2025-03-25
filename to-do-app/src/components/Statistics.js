// Statistics.js
import { Card, Col, Row, Statistic, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

function Statistics({ total, completed, waiting, overdue }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Tasks" value={total} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed"
              value={completed}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Waiting"
              value={waiting}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={overdue}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>
      <br />
      {overdue > 0 && (
        <Text type="danger" style={{ fontSize: 16 }}>
          <InfoCircleOutlined style={{ marginRight: 4 }} />
          {overdue} tasks are overdue
        </Text>
      )}
    </>
  );
}

export default Statistics;
