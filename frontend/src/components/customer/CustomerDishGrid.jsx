import { Row, Col, List } from "antd";
import CustomerDishCard from "./CustomerDishCard";
import React, { useEffect, useState } from "react";

const GridList = ({ categoryId, AllDish, tableId, orderId }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchData(categoryId);
    console.log("update!!!!");
  }, [categoryId, AllDish]);

  const fetchData = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/waitsys/manager/item/showByCategory?categoryId=${categoryId}&pageNo=1&pageSize=10`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Process data and set it to the component state
      const processedData = data.records.map((item) => ({
        title: item.name,
        price: item.price,
        index: item.orderNum,
        id: item.itemId,
        picture: `data:image/jpeg;base64, ${item.picture}`,
      }));
      setDishes(processedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {dishes.map((dish) => (
        <Col key={dish.id} xs={24} sm={12} md={8} lg={6}>
          <CustomerDishCard
            title={dish.title}
            price={dish.price}
            index={dish.index}
            ItemId={dish.id}
            picture={dish.picture}
            tableId={tableId}
            orderId={orderId}
          />
        </Col>
      ))}
    </Row>
  );
};

export default GridList;
