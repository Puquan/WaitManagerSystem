import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import TableCard from "../components/kitchen/TableCard";
import { Spin } from "antd";

const KitchenPage = () => {
  const [kitchenOrders, setkitchenOrders] = useState([]);

  useEffect(() => {
    fetchKitchenOrders(); // 初始化时执行一次
    const interval = setInterval(() => {
      fetchKitchenOrders(); // 每隔一段时间执行一次
      console.log("fetching kitchen orders");
    }, 5000); // 间隔时间为 5 秒
    return () => {
      clearInterval(interval); // 组件卸载时清除定时器
    };
  }, []);

  useEffect(() => {
    console.log("kitchenOrders changed");
  }, [kitchenOrders]);

  const generateTableCards = () => {
    return kitchenOrders.map((order, index) => (
      <Col span={32} md={10} key={order.orderId}>
        <TableCard
          tableId={order.tableId}
          orderId={order.orderId}
          orderItems={order.orderItemList}
          startTime={order.startTime}
        />
      </Col>
    ));
  };

  async function fetchKitchenOrders() {
    const response = await fetch(
      `http://localhost:8080/waitsys/kitchen/list_all_orders_kitchen`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    //setkitchenOrders([...data]);
    setkitchenOrders(data);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
        }}
      >
        <h2>Kitchen Page</h2>
      </div>
      {kitchenOrders.length > 0 ? (
        <>
          <div>
            <Row gutter={{ xs: 12, sm: 16, md: 24, lg: 32 }}>
              {generateTableCards()}
            </Row>
          </div>
        </>
      ) : (
        <div>
          <Spin />
          <p>Fetching kitchen orders...</p>
        </div>
      )}
    </>
  );
};

export default KitchenPage;
