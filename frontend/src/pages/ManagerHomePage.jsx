import { Layout, theme, Button, Typography, Modal, Anchor } from "antd";
import React, { useEffect, useState } from "react";
import AddDishForm from "../components/AddDishForm";
import AddCatForm from "../components/AddCatForm";
import "../App.css";
const { Header, Content, Footer, Sider } = Layout;
import DishGrid from "../components/DishGrid";
import { ReactSortable } from "react-sortablejs";

const ManagerHomePage = () => {
  const [items,Setitems] = useState([
    {id:1,name:"Drink"}, {id:2,name:"Fries"},
     {id:3,name:"Burger"},{id:4,name:"Dessert"},
     {id:5,name:"Pizza"}])

  const [moveCat,SetMoveCat] = useState(false);

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

  const showMoveCatSeq = () =>{
    console.log("Move category sequence");
    SetMoveCat(true);
  };

  const handleCancelMoveCatSeq = () => {
    console.log("Cancel Move category sequence");
    SetMoveCat(false);
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
          items={items.map((item) => {
            return {
              key: (item.id + 1).toString(),
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
          <Button onClick={showMoveCatSeq}>Move Category Sequence</Button>
          <Modal
            open={moveCat}
            onCancel={handleCancelMoveCatSeq}
            footer={null}
            keyboard>
              <ReactSortable list={items} setList={Setitems}>
              {items.map(item => (
                <div className="draggableItem">{item.name}</div>
              ))}
              </ReactSortable>
          </Modal>
          <Modal
            open={addDishOpen}
            onCancel={handleCancelAddDish}
            footer={null}
            keyboard
          >
            <AddDishForm onClose={handleCancelAddDish}/>
          </Modal>
          <Modal
            open={addCatOpen}
            onCancel={handleCancelAddCat}
            footer={null}
            keyboard
          >
            <AddCatForm />
          </Modal>
          {items.map((item) => (
            <div
              key={item.id}
              id={`grid${item.name}`}
              style={{
                height: "100vh",
                background: `rgba(99,${item.id + 120},${item.id + 10},0.1)`,
              }}
            >
              <h2>{item.name}</h2>
              <DishGrid />
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ManagerHomePage;

