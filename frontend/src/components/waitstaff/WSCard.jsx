import { Card, Button, Row, Space, message, Modal, Table } from "antd";
import {
  BellOutlined,
  DollarCircleOutlined,
  CheckOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const WSCard = ({ table }) => {
  const { tableId, state, needHelp, orderItemList } = table;

  const [openPopup, setOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);

  const handleNotifyAssistance = () => {
    if (needHelp === 0) {
      message.error("Help not required");
      return;
    }
    markNeedHelp(tableId);
  };

  const markNeedHelp = (tableId) => {
    fetch(`http://localhost:8080/waitsys/waitstaff/mark_need_help?tableId=${tableId}`, {
      method: "POST",
    })
      .then(() => {
        console.log(`Table ${tableId} request completed`);
        message.success("Request completed");
      })
      .catch((error) => {
        console.error(`Error marking needHelp as 0 for table ${tableId}:`, error);
      });
  };

  const handleRequestBill = () => {
    if (state === 0 || state === 1) {
      message.error("Table not ready for bill");
      return;
    }
    confirmRequestBill(tableId);
  };

  const confirmRequestBill = (tableId) => {
    fetch(`http://localhost:8080/waitsys/waitstaff/confirm_request_bill?tableId=${tableId}`, {
      method: "POST",
    })
      .then(() => {
        console.log(`Confirmed request bill for table ${tableId}`);
        message.success("Bill confirmed");
      })
      .catch((error) => {
        console.error(`Error confirming request bill for table ${tableId}:`, error);
      });
  };

  const handleSend = (orderItemId) => {
    ItemServe(orderItemId);
  };

  const ItemServe = (orderItemId) => {
    fetch(`http://localhost:8080/waitsys/waitstaff/modify_order_item_is_serve?orderItemId=${orderItemId}`, {
      method: "POST",
    })
      .then(() => {
        console.log(`itemId ${orderItemId} is served`);
        message.success("Dish served");
      })
      .catch((error) => {
        console.error(`Error posting for itemId ${orderItemId}:`, error);
      });
  };

  const filteredOrderItemList = orderItemList.filter(
    (item) => item.isCook === 1 && item.isServe === 0
  );

  const handleShowPreviousItems = () => {
    fetch(`http://localhost:8080/waitsys/customer/order/showAllPreviousItems?tableId=${tableId}`)
      .then((response) => response.json())
      .then((data) => {
        // Process the data and display the popup window
        console.log(data); // Replace with the code to process the data

        // Show the popup window
        setPopupData(data);
        setOpenPopup(true);
      })
      .catch((error) => {
        console.error("Error fetching previous items:", error);
      });
  };

  const columns = [
    {
      title: "Dish",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Quantity",
      dataIndex: "itemNumber",
      key: "itemNumber",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  return (
    <Card title={`Table ${tableId}`} style={{ width: 300, height: 400 }}>
      <Row justify="space-between" align="middle">
        <Button
          icon={<BellOutlined />}
          onClick={handleNotifyAssistance}
          style={{ backgroundColor: needHelp === 1 ? "yellow" : "" }}
        />
        <Button
          icon={<DollarCircleOutlined />}
          onClick={handleRequestBill}
          style={{ backgroundColor: state === 2 ? "yellow" : "" }}
        />
        <Button onClick={handleShowPreviousItems}>Show Dishes</Button>
      </Row>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredOrderItemList.map((item) => (
          <li key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <span>{item.itemName}</span>
            <Space align="end" style={{ marginLeft: "auto" }}>
              {item.isCook === 1 ? (
                <CoffeeOutlined style={{ color: "#52c41a" }} />
              ) : (
                <CoffeeOutlined style={{ color: "red" }} />
              )}
              <Button
                type={item.isServe ? "primary" : ""}
                onClick={() => handleSend(item.id)}
                style={{
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  border: "1px solid red",
                  backgroundColor: item.isServe ? "#52c41a" : "red",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                icon={<CheckOutlined style={{ fontSize: "12px" }} />}
              />
            </Space>
          </li>
        ))}
      </ul>
      <Modal
        open={openPopup}
        onCancel={() => setOpenPopup(false)}
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={popupData}
          pagination={{ pageSize: 10 }}
          rowKey="itemId"
        />
      </Modal>
    </Card>
  );
};

export default WSCard;
