import React from "react";

import { Card, Statistic } from "antd";

const TotalSales = (sales) => {
  const temp = sales.sales;

  return (
    <Card bordered={false}>
      <Statistic
        title="Total Sales Amount"
        value={temp}
        precision={2}
        valueStyle={{
          color: "#555e50",
        }}
      />
    </Card>
  );
};

export default TotalSales;
