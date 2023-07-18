import { Layout, theme, Button, Modal, Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import React, { useState } from "react";
import AddDishForm from "../components/manager/AddDishForm";
import AddCatForm from "../components/manager/AddCatForm";
import DishGrid from "../components/manager/DishGrid";
import "../App.css";
import { ReactSortable } from "react-sortablejs";
import { Link, Element } from "react-scroll";

const { Header, Content, Sider } = Layout;
const ManagerHomePage = () => {
  const dragCatColor = {
    fontSize: "25px",
    color: "#2131231",
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [addDishOpen, addDishSetOpen] = useState(false);
  const [addCatOpen, addCatSetOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [Dishes, setDishes] = useState([]);
  const [moveCat, SetMoveCat] = useState(false);
  const [delCat, delCatOpen] = useState(false);

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

  const showDelCat = () => {
    console.log("Del Cat");
    delCatOpen(true);
  };
  const handleCancelDelCat = () => {
    console.log("Cancel Del Cat");
    delCatOpen(false);
  };

  const buildMap = (keys, values) => {
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {
      map.set(keys[i], values[i]);
    }
    return map;
  };

  const fetchCatSeq = (data) => {
    //console.log(data)
    var catNameList = ([] = data.map((item) => {
      return item.categoryId;
    }));
    var catOrderList = ([] = data.map((item) => {
      return item.index;
    }));
    console.log(catNameList);
    console.log(catOrderList);
    const newMap = buildMap(catNameList, catOrderList.sort());
    const obj = Object.fromEntries(newMap);
    const json = JSON.stringify(obj);
    console.log(json);
    fetch(`http://localhost:8080/waitsys/manager/change_category_order`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: json,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Success:", response);
        } else {
          throw new Error("Failed to move dish.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        index: item.orderNum,
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

  const DeleteCategory = (categoryId) => {
    const formData = new FormData();
    formData.append("itemId", categoryId);
    fetch(
      `http://localhost:8080/waitsys/manager/remove_category?id=${categoryId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Delete success:", response);
          message.success("Dish deleted successfully!");
          onClose();
        } else {
          throw new Error("Failed to delete dish.");
        }
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
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

  const confirm = (categoryId) => {
    DeleteCategory(categoryId);
  };

  const cancel = (e) => {
    console.log(e);
  };
  return (
    <Layout style={{ margin: -8, padding: 0, minHeight: "100vh" }}>
      <Sider theme="light">
        <ReactSortable
          style={dragCatColor}
          list={Category}
          setList={setCategory}
          onChange={fetchCatSeq(Category)}
        >
          {Category.map((item) => (
            <div className="draggableItem" style={{ margin: "24px 4px" }}>
              <Link
                activeClass="active"
                className={item.name}
                to={item.name}
                spy={true}
                smooth={true}
                duration={500}
              ></Link>
              {item.name}
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(item.categoryId)}
                onCancel={cancel}
              >
                <Button icon={<DeleteTwoTone />} onClick={showDelCat} />
              </Popconfirm>
            </div>
          ))}
        </ReactSortable>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 0,
        }}
      >
        <Header
          style={{
            background: "#fff",
            color: "#333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Manager Page</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
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
            <div key={item.categoryId} id={`grid${item.name}`}>
              <Element name={item.name} className="element">
                <h2>{item.name}</h2>
              </Element>
              <DishGrid categoryId={item.categoryId} AllDish={Dishes} />
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default ManagerHomePage;
