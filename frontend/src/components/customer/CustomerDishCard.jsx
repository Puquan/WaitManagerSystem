import { Card, Modal, Rate } from "antd";
import CustomerDetailedDish from "./CustomerDetailedDish";
import { useState } from "react";
import * as React from "react";
const { Meta } = Card;

const CustomerDishCard = ({
  ItemId,
  title,
  price,
  picture,
  tableId,
  orderId,
  itemRate,
}) => {
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
        <img alt="image" src={picture} style={{ width: "100%", height: 200 }} />
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
        <CustomerDetailedDish
          itemId={ItemId}
          tableId={tableId}
          orderId={orderId}
        />
      </Modal>
      <Meta title={title} description={"$" + price} />
      <Rate disabled defaultValue={itemRate} />
    </Card>
  );
};

export default CustomerDishCard;
