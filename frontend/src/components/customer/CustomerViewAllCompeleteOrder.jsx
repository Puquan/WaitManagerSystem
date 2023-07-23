import React, { useState, useRef } from "react";
import { List, Divider, Statistic, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CustomerViewCompeleterOrder = ({
  onClose,
  compeleteOrderCost,
  compeleteOrderData,
  tableId,
  orderId,
}) => {
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  const [newTableId, setNewTableId] = useState(parseInt(tableId));
  const [newOrderId, setNewOrderId] = useState(parseInt(orderId));
  const [newCompeleteOrderCost, setNewCompeleteOrderCost] = useState(
    parseFloat(compeleteOrderCost)
  );
  const [newComeleteOrderData, setNewComeleteOrderData] =
    useState(compeleteOrderData);

  const isInitialMount1 = useRef(true);

  React.useEffect(() => {
    if (isInitialMount1.current) {
      isInitialMount1.current = false;
    } else {
      fetchAllCompeleteOrder();
      getAllPreviousOrderCost();
    }
  }, [newCompeleteOrderCost, newComeleteOrderData]);

  const getAllPreviousOrderCost = () => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/showTotalCost?tableId=${parseInt(
        newTableId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.status === 200) {
          // cant catch error due to no-cors
          const data = await response.json();

          setNewCompeleteOrderCost(parseFloat(data));
        } else {
          throw new Error("Error Collect current order cost");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const fetchAllCompeleteOrder = () => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/showAllPreviousItems?tableId=${parseInt(
        newTableId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.status === 200) {
          // cant catch error due to no-cors

          const data = await response.json();

          const processedData = data.map((item) => ({
            id: item.itemId,
            title: item.itemName,
            amount: item.itemNumber,
            price: item.totalPrice,
            picture: item.itemPicture,
          }));
          setNewComeleteOrderData(processedData);
        } else {
          throw new Error("Error Finish Current Order");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <List
        pagination={{
          position,
          align,
        }}
        dataSource={newComeleteOrderData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  src={`data:image/jpeg;base64, ${item.picture}`}
                  style={{ width: 50, height: 50 }}
                />
              }
              title={item.title + " " + "*" + item.amount.toString()}
              description={"Price:  " + item.price.toString()}
            ></List.Item.Meta>
          </List.Item>
        )}
      />
      <Statistic
        title="Total Cost (Not include un placed order)(AUD)"
        value={newCompeleteOrderCost}
      />
    </>
  );
};
export default CustomerViewCompeleterOrder;
