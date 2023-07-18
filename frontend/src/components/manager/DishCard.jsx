import { Card, Modal, Button } from "antd";
import { EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import ModifyDishForm from "./ModifyDishForm";
import { useState } from "react";
import * as React from "react";
const { Meta } = Card;

const DishCard = ({ ItemId, title, price, MoveLeft, MoveRight, picture }) => {
  const [updateDishOpen, updateDishSetOpen] = useState(false);

  const showUpdateDish = () => {
    console.log("Update Dish");
    updateDishSetOpen(true);
  };

  const handleCancelUpdateDish = () => {
    console.log("Cancel Update Dish");
    updateDishSetOpen(false);
  };

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
        <Button ghost={false} icon={<LeftOutlined />} onClick={MoveLeft} />,
        <Button
          ghost={false}
          icon={<EditOutlined />}
          onClick={showUpdateDish}
        />,
        <Button ghost={false} icon={<RightOutlined />} onClick={MoveRight} />,
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
      <Meta title={title} description={price} />
    </Card>
  );
};

export default DishCard;
