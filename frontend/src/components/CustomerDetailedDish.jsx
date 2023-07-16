import * as React from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Modal
} from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CustomerDetailedDish = ({itemId}) => {

    const [id,setId]=  React.useState();
    const [title,setTitle] =  React.useState();
    const [description,setDescription ]= React.useState();
    const [ingredient,setIngredient ]= React.useState();
    const [price,setPrice] = React.useState();
    const [picture,setPicture] = React.useState();

    React.useEffect(() => {
        fetchData(itemId);
        console.log("upate!!!!");
      }, [itemId]);


    const fetchData = async (itemId) => {
    try {
        console.log(itemId)
      const response = await fetch(
        `http://localhost:8080/waitsys/manager/item/showById?itemId=${itemId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      // 处理数据，将其设置到组件的状态中
      console.log(data);
      setId(data['itemId'])
      setTitle(data['name'])
      setDescription(data['description'])
      setIngredient(data['ingredient'])
      setPrice(data['price'])
      setPicture(`data:image/jpeg;base64, ${data.picture}`)
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <Card title="Detailed Dish" bordered={false}>
        {id}
    </Card>
  );
};

export default CustomerDetailedDish;
