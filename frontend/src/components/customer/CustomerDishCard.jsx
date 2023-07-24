import { Card, Divider, Modal, Rate,Tag } from "antd";
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

  const isItemRatedZero = itemRate === 0;

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

export default CustomerDishCard;
