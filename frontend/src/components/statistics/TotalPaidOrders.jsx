import React from "react";

import { Card, Statistic } from "antd";

const TotalPaidOrders = (orderNum) => {
  const temp = orderNum.orderNum;

  return (
    <Card bordered={true}>
      <Statistic
        title="Total Number of Orders"
        value={temp}
        precision={0}
        valueStyle={{
          color: "#555e50",
        }}
      />
    </Card>
  );
};

export default TotalPaidOrders;
