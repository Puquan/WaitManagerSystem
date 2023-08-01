import React, { useState, useEffect } from "react";
import { Card, Statistic } from "antd";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

const PieChart = ({ data }) => {
  const config = {
    appendPadding: 5,
    data,
    angleField: "categorySalePercent",
    colorField: "categoryName",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  return (
    <Card
      title="Proportion of Sales by Category"
      style={{ width: "100%" }}
      itle="Card title"
      bordered={true}
      hoverable={true}
    >
      <Pie {...config} />
    </Card>
  );
};

export default PieChart;
