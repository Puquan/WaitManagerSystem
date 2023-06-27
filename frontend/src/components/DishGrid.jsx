import { Card, List } from "antd";
import * as React from "react";
import DishCard from "./DishCard";
const { Meta } = Card;

const GridList = (props) => {
  const [dishes, setDishes] = React.useState([
    { title: "DishA", price: "24", index: 1, id: 1 },
    { title: "DishB", price: "27", index: 2, id: 2 },
    { title: "DishC", price: "58", index: 3, id: 3 },
    { title: "DishD", price: "67", index: 4, id: 4 },
    { title: "DishF", price: "67", index: 5, id: 5 },
  ]);
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
            id={dish.id}
          />
        </List.Item>
      )}
    />
  );
};

export default GridList;
