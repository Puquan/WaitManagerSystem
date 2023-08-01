import React, { useState, useEffect } from "react";
import { Card, Slider } from "antd";
import { Column } from "@ant-design/plots";

const BarChart = ({ data, x, onTopValueChange }) => {
  const [inputValue, setInputValue] = useState(5);
  const [topx, setTopx] = useState(x);
  const title = `Top ${topx} Dishes by Sales Volume`;

  const onChange = (newValue) => {
    setInputValue(newValue);
    setTopx(newValue);
    onTopValueChange(newValue);
  };

  const config = {
    data,
    xField: "itemName",
    yField: "itemSaleCount",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      itemName: {
        alias: "Dish Name",
      },
      itemSaleCount: {
        alias: "Sales Volume",
      },
    },
  };

  return (
    <Card
      title={title}
      bordered={true}
      hoverable={true}
      extra={
        <Slider
          style={{ width: 150 }}
          min={3}
          max={15}
          onChange={onChange}
          tooltip={true}
          value={typeof inputValue === "number" ? inputValue : 5}
        />
      }
    >
      <Column {...config} />
    </Card>
  );
};

export default BarChart;
