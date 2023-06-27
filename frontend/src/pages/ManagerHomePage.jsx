import { Layout, theme, Button, Typography, Modal, Anchor } from "antd";
import React, { useEffect, useState } from "react";
import AddDishForm from "../components/AddDishForm";
import AddCatForm from "../components/AddCatForm";
import "../App.css";
const { Header, Content, Footer, Sider } = Layout;
const items = ["Drink", "Fries", "Burger", "Dessert", "Pizza"];

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
    <Layout>
      <Sider
        theme="dark"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Anchor
          items={items.map((item, index) => {
            return {
              key: (index + 1).toString(),
              href: `#grid${item}`,
              title: item,
            };
          })}
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
          >
            <AddDishForm />
          </Modal>
          <Modal
            open={addCatOpen}
            onCancel={handleCancelAddCat}
            footer={null}
            keyboard
          >
            <AddCatForm />
          </Modal>
          {items.map((name, index) => (
            <div
              key={index}
              id={`grid${name}`}
              style={{
                height: "100vh",
                background: `rgba(99,${index + 120},${index + 10},0.1)`,
              }}
            >
              <h2>{name}</h2>
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ManagerHomePage;
