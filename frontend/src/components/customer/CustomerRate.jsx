import React, { useState, useRef } from "react";
import { List, Divider, Modal, Button, Rate, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./CustomerRate.css";

const CustomerRate = ({ data, tableId, orderIds }) => {
  const [showThanks, setShowThanks] = useState(false); 
  
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
        setShowThanks(true);
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
      <div >{showThanks ? (
        <div className="centered-message">    
        <p >Thanks for rating!</p>    
        </div>
      ) : (
        <div>
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
      </div>
      )}</div>
      <Button
        type="primary"
        onClick={handleSubmit}
        className={showThanks ? "hide-button" : ""}
      >
        Submit Rating
      </Button>
    </>
  );
};
export default CustomerRate;
