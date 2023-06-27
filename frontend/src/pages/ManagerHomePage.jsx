import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Typography, Modal } from "antd";
import React from "react";
import { useState } from "react";
import AddDishForm from "../components/AddDishForm";
import ModifyDishForm from "../components/ModifyDishForm";
import AddCatForm from "../components/AddCatForm";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const ManagerHomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [addDishOpen, addDishSetOpen] = useState(false);
  const [addCatOpen, addCatSetOpen] = useState(false);

  const showAddDish = () => {
    console.log("Add Dish");
    addDishSetOpen(true);
  };

  const handleCancelAddDish = () => {
    console.log("Cancel Add Dish");
    addDishSetOpen(false);
  };

  const showAddCat = () => {
    console.log("Add Cat");
    addCatSetOpen(true);
  };

  const handleCancelAddCat = () => {
    console.log("Cancel Add Cat");
    addCatSetOpen(false);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 0,
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
          }}
        >
          <div>
            <Typography.Title
              level={3}
              style={{ color: "black", textAlign: "center" }}
            >
              Manager Home Page
            </Typography.Title>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: `calc(100vh - 64px)`,
            marginLeft: 200,
          }}
        >
          <Button onClick={showAddDish}>Add New Dish</Button>
          <Button onClick={showAddCat}>Add New Category</Button>
          <Modal
            open={addDishOpen}
            onCancel={handleCancelAddDish}
            footer={null}
            keyboard
            width={`45vh`}
            height={`10vh`}
          >
            <AddDishForm />
          </Modal>
          <Modal
            open={addCatOpen}
            onCancel={handleCancelAddCat}
            footer={null}
            keyboard
            width={`45vh`}
            height={`10vh`}
          >
            <AddCatForm />
          </Modal>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default ManagerHomePage;
