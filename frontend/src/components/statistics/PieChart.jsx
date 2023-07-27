import React, { useState, useEffect } from "react";
import { Card, Statistic } from "antd";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

const PieChart = () => {
  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];

  const config = {
    appendPadding: 5,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.5,
    label: {
      type: "outer",
      content: "{name} {percentage}",
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
