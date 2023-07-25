import React from "react";
import { Row, Col } from "antd";
import PieChart from "../components/statistics/PieChart";
import LineChart from "../components/statistics/LineChart";
import TotalSales  from "../components/statistics/TotalSales";
import TotalPaidOrders  from "../components/statistics/TotalPaidOrders";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const StatisticsPage = () => {
  const data = {totalSales:100,
                orderNum:1000,};

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
        <Col span={8}>
          <TotalSales sales = {data.totalSales}/>
        </Col>
        <Col span={8}>
          <TotalPaidOrders orderNum = {data.orderNum}/>
        </Col>
      </Row>
    </>
  );
};

export default StatisticsPage;
