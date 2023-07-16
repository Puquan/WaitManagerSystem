import { Card, List,message} from "antd";
import * as React from "react";
import CustomerDishCard from "./CustomerDishCard";
const { Meta } = Card;

const GridList = ({ categoryId, AllDish }) => {
  const [dishes, setDishes] = React.useState([]);

  React.useEffect(() => {
    fetchData(categoryId);
    console.log("upate!!!!");
  }, [categoryId, AllDish]);

  const fetchMoveCat = (data) => {
    fetch(
      `http://localhost:8080/waitsys/manager/item/changeOrder`,
    {
      method: "POST",
      headers:{'Content-type': 'application/json'},
      body: data
    }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("Success:", response);
      } else {
        throw new Error("Failed to move dish.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

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
      console.log("sad")
      console.log("sad")
      console.log("sad")
      console.log(data)
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
        const dishA = newDishes.splice(index, 1)[0];
        console.log(dishA);
        newDishes.splice(index + 1, 0, dishA);

        const newnewDishes = [...newDishes];
        const dishB = newnewDishes.splice(index, 1)[0];
        console.log(dishB);
        newnewDishes.splice(index+1, 0, dishB);
        
        const firstVar = dishA['id'];
        const secondVar = dishB['id'];
        const firstPara = dishA['index'];
        const secondPara = dishB['index'];
        const entries = new Map([
          [firstVar, secondPara],
          [secondVar, firstPara]
        ]);
        console.log(entries);
        const obj = Object.fromEntries(entries);
        const json = JSON.stringify(obj);
        console.log(json);
        fetchMoveCat(json);
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
        const dishA = newDishes.splice(index, 1)[0];
        newDishes.splice(index - 1, 0, dishA);
        console.log(newDishes);

        const newnewDishes = [...newDishes];
        const dishB = newnewDishes.splice(index, 1)[0];
        console.log(dishB);
        newnewDishes.splice(index-1, 0, dishB);
        
        const firstVar = dishA['id'];
        const secondVar = dishB['id'];
        const firstPara = dishA['index'];
        const secondPara = dishB['index'];
        const entries = new Map([
          [firstVar, secondPara],
          [secondVar, firstPara]
        ]);

        const obj = Object.fromEntries(entries);
        const json = JSON.stringify(obj);

        fetchMoveCat(json);
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
          <CustomerDishCard
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
