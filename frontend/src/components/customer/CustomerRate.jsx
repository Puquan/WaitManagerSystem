import React, { useState, useRef } from "react";
import { List, Divider, Statistic, Button, Rate, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CustomerRate = ({ data, tableId, orderIds }) => {
  const [rateList, setRateList] = useState(
    data.map((item) => ({
      itemId: item.id,
      rate: 0,
    }))
  );

  const handleRateChange = (itemId, value) => {
    setRateList(
      rateList.map((rateItem) =>
        rateItem.itemId === itemId ? { ...rateItem, rate: value } : rateItem
      )
    );
  };

  const handleSubmit = async () => {
    try {
      console.log(tableId);
      console.log(orderIds);
      const itemRatings = rateList.reduce((accumulator, { itemId, rate }) => {
        accumulator[itemId] = rate;
        return accumulator;
      }, {});
      console.log(itemRatings);
      const bodyMessage = JSON.stringify({
        tableId,
        orderIds,
        itemRatings,
      });
      console.log(bodyMessage);
      const response = await fetch(
        `http://localhost:8080/waitsys/customer/order/rating`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: bodyMessage,
        }
      );
      if (response.status === 200) {
        message.success("Rate Succefffully!");
        console.log("Rate Succefffully!");
      } else {
        throw new Error("Error Finish Current Order");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div>Table {tableId}</div>
      <Divider />
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  src={`data:image/jpeg;base64, ${item.picture}`}
                  style={{ width: 50, height: 50 }}
                />
              }
              title={item.title}
            ></List.Item.Meta>
            <Rate
              allowHalf={true}
              onChange={(value) => handleRateChange(item.id, value)}
            />
          </List.Item>
        )}
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit Rating
      </Button>
    </>
  );
};
export default CustomerRate;
