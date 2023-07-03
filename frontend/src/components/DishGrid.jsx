import { Card, List } from "antd";
import * as React from "react";
import { useState, useEffect } from "react";
import DishCard from "./DishCard";
const { Meta } = Card;

const GridList = ({ categoryId }) => {
  const [dishes, setDishes] = React.useState([]);
  React.useEffect(() => {
    fetchData(categoryId);
  }, []);

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
      // 处理数据，将其设置到组件的状态中
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

  const MoveRight = (id) => {
    setDishes((prevDishes) => {
      const index = prevDishes.findIndex((dish) => dish.id === id);
      if (index < prevDishes.length - 1) {
        const newDishes = [...prevDishes];
        const dish = newDishes.splice(index, 1)[0];
        newDishes.splice(index + 1, 0, dish);
        return newDishes;
      }
      return prevDishes;
    });
  };

  const MoveLeft = (id) => {
    setDishes((prevDishes) => {
      const index = prevDishes.findIndex((dish) => dish.id === id);
      if (index > 0) {
        const newDishes = [...prevDishes];
        const dish = newDishes.splice(index, 1)[0];
        newDishes.splice(index - 1, 0, dish);
        return newDishes;
      }
      return prevDishes;
    });
  };

  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={dishes}
      renderItem={(dish) => (
        <List.Item>
          <DishCard
            MoveRight={() => MoveRight(dish.id)}
            MoveLeft={() => MoveLeft(dish.id)}
            title={dish.title}
            price={dish.price}
            index={dish.index}
            ItemId={dish.id}
            picture={dish.picture}
          />
        </List.Item>
      )}
    />
  );
};

export default GridList;
