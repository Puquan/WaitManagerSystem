import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch, Space, Button, message, Popconfirm } from "antd";
const { Meta } = Card;

const TableCard = ({ tableId, orderItems, orderId }) => {
  const tableTitle = "Table" + tableId.toString();
  const [disabled, setDisabled] = useState(false);
  const [isOrderFinished, setIsOrderFinished] = useState(false);

  useEffect(() => {
    // 当传入的 props 发生变化时执行的逻辑
    console.log("Props have changed");
    // 可以在这里进行需要执行的副操作
  }, [tableId, orderItems, orderId]); // 在这里添加需要监视的 props 变化

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
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

  const handleClick = (id) => {
    Switch_Cooked(id);
  };

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
          {orderItems.map((item) => (
            <Space size={8} key={`item-${item.id}`}>
              {item.itemName}
              <Switch
                disabled={disabled}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={onChange}
                defaultChecked={item.isCook}
              />
              <button onClick={() => handleClick(item.id)}>Click me</button>
            </Space>
          ))}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
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
                onClick={() => setDisabled(true)}
              >
                Finish Order
              </Button>
            </Popconfirm>
          </div>
        </Card>
      )}
    </>
  );
};

export default TableCard;
