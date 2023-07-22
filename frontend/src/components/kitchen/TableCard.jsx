import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch, Button, Popconfirm, Pagination, message } from "antd";
const { Meta } = Card;

const TableCard = ({ tableId, orderItems, orderId, startTime }) => {
  const tableTitle = "Table" + tableId.toString();
  const [isOrderFinished, setIsOrderFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedItems = orderItems.slice(startIndex, endIndex);
  const timeString =
    "Order Time: " +
    new Date(startTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  useEffect(() => {
    // 当传入的 props 发生变化时执行的逻辑
    console.log("Props have changed");
    // console.log(startTime);
    // 可以在这里进行需要执行的副操作
  }, [tableId, orderItems, orderId]); // 在这里添加需要监视的 props 变化

  const onChange = (checked, id) => {
    console.log(`switch to ${checked}`);
    Switch_Cooked(id);
  };

  async function Switch_Cooked(orderItemId) {
    const response = await fetch(
      `http://localhost:8080/waitsys/kitchen/modify_order_item_is_cook?orderItemId=${orderItemId}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
  }

  async function Finish_Order(orderId) {
    const response = await fetch(
      `http://localhost:8080/waitsys/kitchen/modify_order_is_cook?orderId=${orderId}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
  }

  const confirm = (id) => {
    Finish_Order(id);
    message.success("Finish Order");
    setIsOrderFinished(true);
  };
  const cancel = (e) => {
    console.log(e);
  };

  return (
    <>
      {!isOrderFinished && (
        <Card
          title={tableTitle}
          style={{ height: "55vh", position: "relative" }}
          hoverable={true}
        >
          <Meta description={timeString} />
          {displayedItems.map((item) => (
            <div
              key={`item-${item.id}`}
              style={{
                display: "flex",
                marginTop: 12,
              }}
            >
              <Space size={8} key={`item-${item.id}`}>
                {item.itemName}
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  onChange={(checked) => onChange(checked, item.id)}
                  defaultChecked={item.isCook}
                />
              </Space>
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {orderItems.length > pageSize && (
              <div style={{ textAlign: "center" }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={orderItems.length}
                  onChange={setCurrentPage}
                  style={{ display: "inline-block", marginTop: 12 }}
                  responsive={true}
                />
              </div>
            )}
            <div style={{ textAlign: "center" }}>
              <Popconfirm
                title="Finish Order?"
                description="Are you sure to Finish this order?"
                onConfirm={() => confirm(orderId)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  shape="round"
                  style={{ backgroundColor: "green" }}
                >
                  Finish Order
                </Button>
              </Popconfirm>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default TableCard;