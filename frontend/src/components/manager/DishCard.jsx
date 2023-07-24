import { Card, Modal, Button,Rate,Divider,Tag } from "antd";
import { EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import ModifyDishForm from "./ModifyDishForm";
import { useState } from "react";
import * as React from "react";
const { Meta } = Card;

const DishCard = ({ itemRate,ItemId, title, price,picture }) => {
  const [updateDishOpen, updateDishSetOpen] = useState(false);

  const showUpdateDish = () => {
    console.log("Update Dish");
    updateDishSetOpen(true);
  };

  const handleCancelUpdateDish = () => {
    console.log("Cancel Update Dish");
    updateDishSetOpen(false);
  };

  const isItemRatedZero = itemRate === 0;

  return (
    <Card
      bordered={true}
      cover={
        <img
          alt="example"
          src={picture}
          style={{ width: "100%", height: 150 }}
        />
      }
      hoverable={true}
      actions={[
    
        <Button
          ghost={false}
          icon={<EditOutlined />}
          onClick={showUpdateDish}
        />,
      
      ]}
      style={{ boxShadow: "12px 0px 24px rgba(0, 0, 0, 0.2)" }}
    >
      <Modal
        open={updateDishOpen}
        onCancel={handleCancelUpdateDish}
        footer={null}
        destroyOnClose={true}
        closable={false}
        centered={true}
        maskClosable={true}
      >
        <ModifyDishForm itemId={ItemId} onClose={handleCancelUpdateDish} />
      </Modal>
      <Meta title={title} description={`$${price}`} />
      <Divider />
      <div>{isItemRatedZero ? (
        <div style={{ display: "flex", alignItems: "center" }}>
        <Tag style={{ height: 30, lineHeight: `30px`, marginBottom: 0 }} color="blue">
          Not Rate
        </Tag>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rate disabled defaultValue={itemRate} style={{ height: 30, lineHeight: '30px', marginBottom: 0 }} />
        </div>
        
      )}</div>
    </Card>
  );
};

export default DishCard;
