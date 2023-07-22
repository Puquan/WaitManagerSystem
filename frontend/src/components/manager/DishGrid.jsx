import { Card, List,message,  Row, Col,} from "antd";
import * as React from "react";
import DishCard from "./DishCard";
import { ReactSortable } from "react-sortablejs";
const { Meta } = Card;

const GridList = ({ categoryId, AllDish }) => {
  const [dishes, setDishes] = React.useState([]);

  React.useEffect(() => {
    fetchData(categoryId);
    console.log("upate!!!!");
  }, [categoryId, AllDish]);

  const handleChange = (event) => {
    const newDishes = [...dishes];
    const movedItem = newDishes.splice(event.oldIndex, 1)[0];
    newDishes.splice(event.newIndex, 0, movedItem);

    const dishUpdates = newDishes.map((dish, index) => {
      const newOrderNum = newDishes.length - index;
      return { id: dish.id, orderNum: newOrderNum };
    });

    dishUpdates.forEach(async (update) => {
      try {
        const response = await fetchMoveDish(update.id, update.orderNum);
        if (response.ok) {
          const dish = newDishes.find(d => d.id === update.id);
          if (dish) {
            dish.orderNum = update.orderNum;
          }
        } else {
          throw new Error('Failed to update orderNum');
        }
      } catch (error) {
        console.error(error);
      }
    });
    setDishes(newDishes);
  };
  
  const fetchMoveDish = async (dishId, newIndex) => {
    try {
      const response = await fetch('http://localhost:8080/waitsys/manager/item/changeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [dishId]: newIndex }),
      });
      return response
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

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
      const processedData = data.records.map((item) => ({
        title: item.name,
        price: item.price,
        index: item.orderNum,
        id: item.itemId,
        picture: `data:image/jpeg;base64, ${item.picture}`,
        rating:item.rating
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
    <ReactSortable
      list={dishes}
      setList={setDishes}
      tag={Row}
      onUpdate={handleChange}
    >
      {dishes.map((dish) => (
        <Col key={dish.id} xs={24} sm={12} md={8} lg={6}>
          <div style={{margin:'24px'}}>
            <DishCard
              title={dish.title}
              price={dish.price}
              index={dish.index}
              ItemId={dish.id}
              picture={dish.picture}
              itemRate={dish.rating}
            />
         </div>

        </Col>
      ))}
      
    </ReactSortable>

  );
};

export default GridList;
