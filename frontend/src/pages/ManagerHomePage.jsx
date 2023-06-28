import { Layout, theme, Button, Typography, Modal, Anchor } from "antd";
import React, { useEffect, useState } from "react";
import AddDishForm from "../components/AddDishForm";
import AddCatForm from "../components/AddCatForm";
import "../App.css";
const { Header, Content, Footer, Sider } = Layout;
const items = ["Drink", "Fries", "Burger", "Dessert", "Pizza"];
import DishGrid from "../components/DishGrid";

const ManagerHomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [addDishOpen, addDishSetOpen] = useState(false);
  const [addCatOpen, addCatSetOpen] = useState(false);
  const [Category, setCategory] = useState([]);

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/waitsys/manager/list_all_categories",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

      // 处理数据，将其设置到组件的状态中
      const processedData = data.map((item) => ({
        categoryId: item.categoryId,
        name: item.name,
        orderNum: item.orderNum,
      }));
      setCategory(processedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const handleTest = () => {
    console.log("Test");
    fetchCategory();
    //loadData();
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
          items={Category.map((item, index) => {
            return {
              key: item.categoryId.toString(),
              href: `#grid${item.name}`,
              title: item.name,
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
          <Button onClick={handleTest}>Test</Button>
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
          {Category.map((item, index) => (
            <div
              key={item.categoryId}
              id={`grid${item.name}`}
              style={{
                height: "100vh",
                background: `rgba(99,${index + 120},${index + 10},0.1)`,
              }}
            >
              <h2>{item.name}</h2>
              <DishGrid categoryId={item.categoryId} />
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ManagerHomePage;
