import { Card, Button, Row, Space, message } from "antd";
import {
  BellOutlined,
  DollarCircleOutlined,
  CheckOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

const WSCard = ({ table }) => {
  const { tableId, state, needHelp, orderItemList } = table;

  const handleNotifyAssistance = () => {
    if (needHelp == 0) {
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
        console.log(`table ${tableId} request completed`);
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
    const item = orderItemList.find((item) => item.id === orderItemId);
    if (item.isCook === 0) {
      message.error("Dish is not ready");
      return;
    }
  
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
  
  return (
    <Card title={`Table ${tableId}`}>
      <Row justify="space-between" align="middle">
        <Button
          icon={<BellOutlined />}
          onClick={handleNotifyAssistance}
          style={{ marginBottom: "8px", backgroundColor: needHelp === 1 ? "yellow" : "" }}
        />
        <Button
          icon={<DollarCircleOutlined />}
          onClick={handleRequestBill}
          style={{ backgroundColor: state === 2 ? "yellow" : "" }}
        />
      </Row>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {orderItemList.map((item) => (
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
    </Card>
  );
};

export default WSCard;
