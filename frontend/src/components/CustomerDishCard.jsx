import { Card, Modal, Button } from "antd";
import { EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import CustomerDetailedDish from "./CustomerDetailedDish";
import { useState } from "react";
import * as React from "react";
const { Meta } = Card;

const CustomerDishCard = ({ ItemId, title, price, picture }) => {
  const [showDetail, updateShowDetail] = useState(false);

  const displayDetail = () => {
    console.log("Show detail infor");
    updateShowDetail(true);
  };

  const handleCancelDisplayDetail = () => {
    console.log("Cancel Show detail infor");
    setTimeout(() => {
      updateShowDetail(false);
    }, 0);
  };

  return (
    <Card
      cover={
        <img
          alt="example"
          src={picture}
          style={{ width: "100%", height: 200 }}
        />
      }
      hoverable={true}
      onClick={displayDetail}

    >
      
      <Modal
        open={showDetail}
        onCancel={handleCancelDisplayDetail}
        footer={null}
        destroyOnClose={true}
        maskClosable={true}
        closable={true}
        centered={true}

      >
        <CustomerDetailedDish itemId={ItemId}/>
      </Modal>
      <Meta title={title} description={price} />
    </Card>
  );
};

export default CustomerDishCard;
