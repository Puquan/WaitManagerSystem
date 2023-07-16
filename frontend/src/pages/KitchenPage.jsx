import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import TableCard from "../components/kitchen/TableCard";
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
      <Col span={24} md={8} key={order.orderId}>
        <TableCard
          tableId={order.tableId}
          orderId={order.orderId}
          orderItems={order.orderItemList}
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
      <h1>Kitchen Staff Page</h1>
      {kitchenOrders.length > 0 ? (
        <>
          <button onClick={fetchKitchenOrders}>Click me</button>
          <div style={{ overflowY: "scroll" }}>
            <Row gutter={{ xs: 12, sm: 16, md: 24, lg: 32 }}>
              {generateTableCards()}
            </Row>
          </div>
        </>
      ) : (
        <div>No Order</div>
      )}
    </>
  );
};

export default KitchenPage;
