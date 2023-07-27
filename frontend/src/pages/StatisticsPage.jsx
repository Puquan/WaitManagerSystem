import React from "react";
import { Row, Col, Layout, Space, Menu, theme, Card, Button } from "antd";
import PieChart from "../components/statistics/PieChart";
import LineChart from "../components/statistics/LineChart";
import TotalSales from "../components/statistics/TotalSales";
import TotalPaidOrders from "../components/statistics/TotalPaidOrders";
import "../App.css";
const { Header, Footer, Sider, Content } = Layout;

const StatisticsPage = () => {
  const data = { totalSales: 100, orderNum: 1000 };

  return (
    <>
      <Layout>
        <Space direction="vertical">
          <Header
            style={{
              background: "#fff",
              color: "#333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: -10,
              marginTop: -10,
              boxShadow: "2px 5px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="lato">
              <h1>Manager Statistics Page</h1>
            </div>
          </Header>
          <Content>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space>
                  <Button type="primary">Today</Button>
                  <Button type="primary">This Week</Button>
                  <Button type="primary">This Month</Button>
                  <Button type="primary">This Year</Button>
                </Space>
              </Col>
              <Col span={12}>
                <TotalSales sales={data.totalSales} />
              </Col>
              <Col span={12}>
                <TotalPaidOrders orderNum={data.orderNum} />
              </Col>
              <Col span={12}></Col>
              <Col className="gutter-row" span={12}></Col>
              <Col className="gutter-row" span={12}>
                <LineChart />
              </Col>
              <Col span={12}>
                <PieChart />
              </Col>
            </Row>
          </Content>
        </Space>
      </Layout>
    </>
  );
};

export default StatisticsPage;
