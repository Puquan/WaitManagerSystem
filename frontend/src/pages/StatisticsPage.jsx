import React from "react";
import { Row, Col } from "antd";
import PieChart from "../components/statistics/PieChart";
import LineChart from "../components/statistics/LineChart";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const StatisticsPage = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}></Col>
        <Col className="gutter-row" span={12}></Col>
        <Col className="gutter-row" span={12}>
          <LineChart />
        </Col>
        <Col span={12}>
          <PieChart />
        </Col>
      </Row>
    </>
  );
};

export default StatisticsPage;
