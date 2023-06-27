import { EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const App = () => (
  <Card
    style={{
      width: 300
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <LeftOutlined key="MoveLeft" />,
      <EditOutlined key="edit" />,
      <RightOutlined key="MoveRight" />
    ]}
  >
    <Meta
      avatar={
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
      }
      title="DishName"
      description="Price"
    />
  </Card>
);
export default App;
