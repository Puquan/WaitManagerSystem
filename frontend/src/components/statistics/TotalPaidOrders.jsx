import React from "react";

import { Card,Statistic} from "antd";


const TotalPaidOrders = (orderNum) => {
    const temp = orderNum.orderNum;

    return (
        <Card bordered={false}>
            <Statistic
                title="总订单数"
                value={temp}
                precision={0}
                valueStyle={{
                  color: '#555e50',
                }}
            />
        </Card>
    );
};

export default TotalPaidOrders;
