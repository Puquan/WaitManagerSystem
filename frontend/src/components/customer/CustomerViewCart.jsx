import React, { useState, useRef } from "react";
import { List, Divider, Statistic, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CustomerViewCart = ({
  onClose,
  data,
  cost,
  compeleteOrderCost,
  compeleteOrderData,
  tableId,
  orderId,
}) => {
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  const [newTableId, setNewTableId] = useState(parseInt(tableId));
  const [newOrderId, setNewOrderId] = useState(parseInt(orderId));
  const [newCost, setNewCost] = useState(parseFloat(cost));
  const [newData, setNewData] = useState(data);

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
      console.log("1");
      fetchCart();
      getCurrentOrderCost();
      fetchAllCompeleteOrder();
      getAllPreviousOrderCost();
    }
  }, [newData, newCost, newCompeleteOrderCost, newComeleteOrderData]);

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
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          const data = await response.json();
          console.log("Collect all previous order cost!");
          console.log(data);
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
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          console.log("Finish Collect Previous Order Information!");
          const data = await response.json();
          console.log(data);
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

  const fetchCart = () => {
    try {
      const response = fetch(
        `http://localhost:8080/waitsys/customer/order/showAllItems?orderId=${parseInt(
          newOrderId
        )}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          const processData = await data.map((item) => ({
            id: item.itemId,
            title: item.itemName,
            amount: item.itemNumber,
            price: item.totalPrice,
            picture: item.itemPicture,
          }));
          console.log(data);
          setNewData(processData);
        } else {
          throw new Error("Failed to fetch order.");
        }
      });
    } catch (error) {
      console.log("Error fetching item:", error);
    }
  };

  const getCurrentOrderCost = () => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/showCurrentCost?orderId=${parseInt(
        newOrderId
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
          console.log(data);
          setNewCost(parseFloat(data));
        } else {
          throw new Error("Error Collect current order cost");
        }
      })

      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const deleteItem = (itemIdTemp) => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/removeItem?tableId=${parseInt(
        newTableId
      )}&orderId=${parseInt(newOrderId)}&itemId=${parseInt(itemIdTemp)}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          // cant catch error due to no-cors
          console.log("Delete Succefully!");
        } else {
          throw new Error("Error Delete");
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
        dataSource={newData}
        renderItem={(item) => (
          <List.Item
            actions={[<DeleteOutlined onClick={() => deleteItem(item.id)} />]}
          >
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
      <Divider />
      <Statistic title="Current Order Cost (AUD)" value={newCost} />
      <Divider />
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
        title="Total Cost (Include un placed order)(AUD)"
        value={newCompeleteOrderCost}
      />
    </>
  );
};
export default CustomerViewCart;
