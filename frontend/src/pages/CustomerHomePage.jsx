import {
  Layout,
  theme,
  Card,
  Button,
  Typography,
  FloatButton,
  Modal,
  message,
} from "antd";
import React, { useState, useRef } from "react";
import "../App.css";
const { Header, Content, Sider } = Layout;
import CustomerDishGrid from "../components/customer/CustomerDishGrid";
import { Link, Element } from "react-scroll";
import { FileTextOutlined, BellOutlined } from "@ant-design/icons";
import CustomerViewCart from "../components/customer/CustomerViewCart";
import CustomerViewAllCompeleteOrder from "../components/customer/CustomerViewAllCompeleteOrder";
import { useNavigate } from "react-router-dom";
const CustomerHomePage = () => {
  const dragCatColor = {
    fontSize: "25px",
    color: "#998900",
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const [orderId, setOrderId] = useState();
  const [tableId, setTableId] = useState();
  const [addDishOpen, addDishSetOpen] = useState(false);
  const [addCatOpen, addCatSetOpen] = useState(false);
  const [Category, setCategory] = useState([]);
  const [Dishes, setDishes] = useState([]);

  const [helpStatus, setHelpStatus] = useState(false);
  const [viewCart, setViewCart] = useState(false);
  const [cartData, setCartData] = useState();
  const [currentOrderCost, setCurrentOrderCost] = useState();
  const [viewCompeleteOrder, setViewCompeleteOrder] = useState(false);
  const [compeleteOrder, setCompeleteOrder] = useState();
  const [compeleteOrderCost, setCompeleteOrderCost] = useState();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [readyToGo, setReadyToGo] = useState(false);
  const isInitialMount1 = useRef(true);

  React.useEffect(() => {
    fetchCategory();
    console.log("fetching category");
  }, [addCatOpen]);

  React.useEffect(() => {
    fetchAllDishes();
    console.log(addDishOpen, "fetching dishes");
  }, [addDishOpen]);

  React.useEffect(() => {
    readLocalOrderId();
    console.log(orderId);
  }, []);

  React.useEffect(() => {
    readLocalTableId();
    console.log(tableId);
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log(tableId);
      fetchFinishPayment();
      handleFinishPayment();
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentStatus]);

  const handleFinishPayment = () => {
    if (paymentStatus == "0" && readyToGo) {
      navigate("/");
    }
  };

  const fetchFinishPayment = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/waitsys/customer/checkTableInfo?tableId=${parseInt(
          tableId
        )}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data["state"]);
      setPaymentStatus(data["state"]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const readLocalOrderId = () => {
    const orderId = localStorage.getItem("orderId");
    const localOrderId = JSON.parse(orderId);
    setOrderId(localOrderId);
  };

  const readLocalTableId = () => {
    const tableId = localStorage.getItem("tableId");
    const localTableId = JSON.parse(tableId);
    setTableId(localTableId);
  };

  const triggerRenderCart = () => {
    console.log("trigger render cart");
    fetchCart();
    getCurrentOrderCost();
    setViewCart(true);
  };

  const untriggerRenderCart = () => {
    console.log("cancel render cart");
    setViewCart(false);
  };

  const triggerRenderAllPreviousOrder = () => {
    console.log("trigger previous order list");
    fetchAllCompeleteOrder();
    getAllPreviousOrderCost();
    setViewCompeleteOrder(true);
  };

  const untriggerRenderAllPreviousOrder = () => {
    console.log("cancel trigger previous order list");
    setViewCompeleteOrder(false);
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

  const getAllPreviousOrderCost = () => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/showTotalCost?tableId=${parseInt(
        tableId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          const data = await response.json();
          console.log("Collect all previous order cost!");
          console.log(data);
          setCompeleteOrderCost(parseFloat(data));
        } else {
          throw new Error("Error Collect current order cost");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const getCurrentOrderCost = () => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/showCurrentCost?orderId=${parseInt(
        orderId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          const data = await response.json();
          console.log("Collect current order cost!");
          console.log(data);
          setCurrentOrderCost(parseFloat(data));
        } else {
          throw new Error("Error Collect current order cost");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const askForHelp = () => {
    console.log(helpStatus);
    const response = fetch(
      `http://localhost:8080/waitsys/customer/table/askForHelp?tableId=${parseInt(
        tableId
      )}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          message.success("Ask help successfully!");
          console.log("Ask help successfully!");
          setHelpStatus(true);

          onClose();
        } else {
          throw new Error("Error Ask help");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const fetchCart = () => {
    try {
      const response = fetch(
        `http://localhost:8080/waitsys/customer/order/showAllItems?orderId=${parseInt(
          orderId
        )}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then(async (response) => {
        if (response.status === 200) {
          console.log("Success:", response);
          const data = await response.json();
          console.log(orderId);
          console.log(tableId);
          console.log(data);
          const processData = await data.map((item) => ({
            id: item.itemId,
            title: item.itemName,
            amount: item.itemNumber,
            price: item.totalPrice,
            picture: item.itemPicture,
          }));
          setCartData(processData);
          console.log(processData);
        } else {
          throw new Error("Failed to fetch order.");
        }
      });
    } catch (error) {
      console.log("Error fetching item:", error);
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

  const checkOut = () => {
    console.log(tableId, orderId);
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/finishOrder?tableId=${parseInt(
        tableId
      )}&orderId=${parseInt(orderId)}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          message.success("Finish Current Order");
          console.log("Finish Current Order!");
          const data = await response.json();
          console.log(data);
          localStorage.setItem("orderId", JSON.stringify(data.orderId));
          setOrderId(data.orderId);
          localStorage.setItem("tableId", JSON.stringify(data.tableId));
          setTableId(data.tableId);
          untriggerRenderCart();
        } else {
          throw new Error("Error Finish Current Order");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const fetchAllCompeleteOrder = () => {
    const response = fetch(
      `http://localhost:8080/waitsys/customer/order/showAllPreviousItems?tableId=${parseInt(
        tableId
      )}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          // cant catch error due to no-cors
          console.log("Finish Collect Previous Order Information!");
          const data = await response.json();
          console.log(data);
          const processedData = data.map((item) => ({
            id: item.itemId,
            title: item.itemName,
            amount: item.itemNumber,
            price: item.totalPrice,
            picture: item.itemPicture,
          }));
          console.log(processedData);
          setCompeleteOrder(processedData);
        } else {
          throw new Error("Error Finish Current Order");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const finishMeal = () => {
    console.log(tableId, orderId);
    const response2 = fetch(
      `http://localhost:8080/waitsys/customer/table/toPayTable?tableId=${parseInt(
        tableId
      )}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(async (response2) => {
        console.log(response2);
        if (response2.status === 200) {
          // cant catch error due to no-cors
          message.success("Request Bill Successfully");
          console.log("Request Bill Successfully");
          setReadyToGo(true);
        } else {
          throw new Error("Error Finish Payment");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
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
        <div style={dragCatColor}>
          {Category.map((item, index) => (
            <div className="Category">
              <Link
                activeClass="active"
                className={item.name}
                to={item.name}
                spy={true}
                smooth={true}
                duration={500}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
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
              Customer Home Page {"tableId: " + tableId}
            </Typography.Title>
          </div>

          <FloatButton
            icon={<FileTextOutlined />}
            description="Help"
            shape="square"
            style={{
              top: 20,
              right: 40,
              bottom: 1200,
            }}
            onClick={() => askForHelp()}
          />

          <FloatButton
            icon={<FileTextOutlined />}
            description="Bill"
            shape="square"
            style={{
              top: 20,
              right: 120,
              bottom: 1200,
            }}
            onClick={() => {
              finishMeal();
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: `calc(100vh - 64px)`,
            marginLeft: 200,
          }}
        >
          <FloatButton
            icon={<FileTextOutlined />}
            description="Current Order"
            shape="square"
            style={{
              right: 50,
            }}
            onClick={() => {
              triggerRenderCart();
              triggerRenderAllPreviousOrder();
            }}
          />

          <Modal
            open={viewCart}
            onCancel={untriggerRenderCart}
            footer={null}
            destroyOnClose={true}
            closable={false}
            centered={true}
            maskClosable={true}
          >
            <CustomerViewCart
              tableId={tableId}
              orderId={orderId}
              cost={currentOrderCost}
              data={cartData}
              onClose={untriggerRenderCart}
              compeleteOrderCost={compeleteOrderCost}
              compeleteOrderData={compeleteOrder}
            />
            <Button onClick={() => checkOut()}>Place Current Order</Button>
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
              <Element name={item.name} className="element">
                <h2>{item.name}</h2>
              </Element>
              <CustomerDishGrid
                categoryId={item.categoryId}
                AllDish={Dishes}
                tableId={tableId}
                orderId={orderId}
              />
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default CustomerHomePage;
