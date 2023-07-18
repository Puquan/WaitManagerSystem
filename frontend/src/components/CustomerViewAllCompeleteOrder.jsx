import React, { useState } from "react";
import { List,Divider,Statistic } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const CustomerViewAllCompeleteOrder = ({data,cost,onClose}) =>{

  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');

  return (
    <>
    <List
        pagination={{
          position,
          align,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
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
export default CustomerViewAllCompeleteOrder;