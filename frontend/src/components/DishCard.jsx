import { Card, Avatar, Modal, Button } from "antd";
import { EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import ModifyDishForm from "./ModifyDishForm";
import { useState, useEffect } from "react";
import * as React from "react";
const { Meta } = Card;

const DishCard = ({ id, title, price, MoveLeft, MoveRight }) => {
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
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Button ghost={false} icon={<LeftOutlined />} onClick={MoveLeft} />,
        <Button
          ghost={false}
          icon={<EditOutlined />}
          onClick={showUpdateDish}
        />,
        <Button ghost={false} icon={<RightOutlined />} onClick={MoveRight} />,
      ]}
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
        <ModifyDishForm />
      </Modal>
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={title}
        description={price}
      />
    </Card>
  );
};

export default DishCard;
