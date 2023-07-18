import React, { useState,useRef } from "react";
import { List,Divider,Statistic,Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const CustomerViewCart = ({onClose,data,cost,tableId,orderId}) =>{

  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');
  const [newTableId,setNewTableId] = useState(parseInt(tableId));
  const [newOrderId,setNewOrderId] = useState(parseInt(orderId));
  const [newCost,setNewCost] = useState(parseInt(cost));
  const [newData,setNewData] = useState(data);
  const isInitialMount = useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    fetchCart();

   }
  }, [newData]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    getCurrentOrderCost();

   }
  }, [newCost]);

  const fetchCart = () => {
    try {
      const response = fetch(
        `http://localhost:8080/waitsys/customer/order/showAllItems?orderId=${parseInt(newOrderId)}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then( async (response) => {
        if (response.status === 200) {

          const data = await response.json();
          const processData = await data.map((item)=>({
            id : item.itemId,
            title : item.itemName,
            amount : item.itemNumber,
            price : item.totalPrice,
            picture : item.itemPicture,
          }))
          setNewData(processData);

        } else {
          throw new Error("Failed to fetch order.");
        }
      })
    } catch (error) {
      console.log("Error fetching item:", error);
    }
  };

  const getCurrentOrderCost = () => {
    const response = fetch(
    `http://localhost:8080/waitsys/customer/order/showCurrentCost?orderId=${parseInt(newOrderId)}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
  .then( async (response) => {
    
    if (response.status === 200) {
      // cant catch error due to no-cors
      const data = await response.json();
      setNewCost(parseInt(data));
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
    `http://localhost:8080/waitsys/customer/order/removeItem?tableId=${parseInt(newTableId)}&orderId=${parseInt(newOrderId)}&itemId=${parseInt(itemIdTemp)}`,
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

  const checkOut = async () => {
    try {
      const response = fetch(
        `http://localhost:8080/waitsys/customer/order/finishOrder?tableId=${parseInt(newTableId)}&orderId=${parseInt(newOrderId)}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      const data = await response.json();
        // 处理数据，将其设置到组件的状态中
        console.log(data);
        localStorage.setItem("orderId", JSON.stringify(data.orderId));
        localStorage.setItem("tableId", JSON.stringify(data.tableId));

        } catch (error) {
          console.error("Error:", error);
        }
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
          <List.Item actions={[
            <DeleteOutlined onClick={()=>deleteItem(item.id)} />
          ]}>
            <List.Item.Meta
              avatar={
                <img src={`data:image/jpeg;base64, ${item.picture}`} style={{ width: 50, height: 50}}/>
              }
              title={item.title}
              description={'OrderCounts:  *'+item.amount.toString()+'Price:  '+item.price.toString()}
            >
            </List.Item.Meta>
          </List.Item>
           )}
          />
      <Divider />
      <Statistic title="Current Order Cost (AUD)" value={cost} precision={2} />


      </>


    );
}
export default CustomerViewCart;