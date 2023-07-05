import { Layout, theme, Button, Typography, Modal, Anchor } from "antd";
import React, { useState } from "react";
import AddDishForm from "../components/AddDishForm";
import AddCatForm from "../components/AddCatForm";
import "../App.css";
const { Header, Content, Sider } = Layout;
import DishGrid from "../components/DishGrid";
import { ReactSortable } from "react-sortablejs";

const ManagerHomePage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [addDishOpen, addDishSetOpen] = useState(false);
  const [addCatOpen, addCatSetOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [Dishes, setDishes] = useState([]);
  const [moveCat, SetMoveCat] = useState(false);

  React.useEffect(() => {
    fetchCategory();
    console.log("fetching category");
  }, [addCatOpen]);

  React.useEffect(() => {
    fetchAllDishes();
    console.log(addDishOpen, "fetching dishes");
  }, [addDishOpen]);

  const showMoveCatSeq = () => {
    console.log("Move category sequence");
    SetMoveCat(true);
  };

  const handleCancelMoveCatSeq = () => {
    console.log("Cancel Move category sequence");
    SetMoveCat(false);
  };

  // Fetch category
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
      const processedData = data.map((item) => ({
        categoryId: item.id,
        name: item.name,
      }));
      setCategory(processedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllDishes = async () => {
    try {
      const response = await fetch(
        // 这里用的api不对，后面会改
        "http://localhost:8080/waitsys/manager/item/showAll?pageNo=1&pageSize=10",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      const processedData = data.records.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        picture: item.picture,
        description: item.description,
        ingredient: item.ingredient,
        price: item.price,
        categoryId: item.categoryId,
        rating: item.rating,
        isOnMenu: item.isOnMenu,
        orderNum: item.orderNum,
        category: item.category,
      }));
      setDishes(processedData);
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
    console.log(Dish);
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
          items={Category.map((item) => {
            return {
              key: item.categoryId,
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
          <Button onClick={showMoveCatSeq}>Move Category Sequence</Button>
          <Modal
            open={moveCat}
            onCancel={handleCancelMoveCatSeq}
            footer={null}
            keyboard
          >
            <ReactSortable list={Category} setList={setCategory}>
              {Category.map((item, index) => (
                <div key={index} className="draggableItem">
                  {item.name}
                </div>
              ))}
            </ReactSortable>
          </Modal>
          <Modal
            open={addDishOpen}
            onCancel={handleCancelAddDish}
            footer={null}
            keyboard
          >
            <AddDishForm onClose={handleCancelAddDish} />
          </Modal>
          <Modal
            open={addCatOpen}
            onCancel={handleCancelAddCat}
            footer={null}
            keyboard
          >
            <AddCatForm onClose={handleCancelAddCat} />
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
              <DishGrid categoryId={item.categoryId} AllDish={Dishes} />
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ManagerHomePage;
