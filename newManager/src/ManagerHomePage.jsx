import * as React from "react";
import {UploadOutlined,PlusOutlined,UserOutlined,VideoCameraOutlined} from "@ant-design/icons";
import {Modal,Layout,Menu,Button,Upload, Card,Form,Input, InputNumber} from "antd";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

const ManagerHomePage = () =>{
    const [addDishOpen, addDishSetOpen] = useState(false);
    const [addCatOpen, addCatSetOpen] = useState(false);
    const [updateDishOpen, updateDishSetOpen] = useState(false);

    const showAddDish = () => {
      console.log('Add Dish');
        addDishSetOpen(true);
    };
    
    const showAddCat = () => {
      console.log('Add Cat');
        addCatSetOpen(true);
    };
    const showUpdateDish = () => {
        updateDishSetOpen(true);
    };

    const handleCancelAddDish = () => {
        console.log('Cancel Add Dish');
        addDishSetOpen(false);
    };

    const handleCancelAddCat = () => {
      console.log('Cancel Add Cat');
      addCatSetOpen(false);
    };

    const handleCancelUpdateDish = () => {
      console.log('Cancel Update Dish');
      updateDishSetOpen(false);
    };

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    return (
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                UserOutlined,
                VideoCameraOutlined,
                UploadOutlined,
                UserOutlined
              ].map((icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `cat ${index + 1}`
              }))}
            />
          </Sider>
          <Layout>
            <Header style={{padding: 0,backgroundColor: 'black'}}>
              <Button onClick={showAddDish}> 
                Add New Dish
              </Button>
              <Modal
                open = {addDishOpen}
                onCancel={handleCancelAddDish}
                footer={null}
                destroyOnClose={true} 
                closable={false}
                centered={true}
                maskClosable={true}>
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
                <Card title="Add New Dish" name="addForm">
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 20,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="Dish Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                <Upload action="/upload.do" listType="picture-card">
                    <div>
                    <PlusOutlined />
                        <div
                            style={{
                            marginTop: 8,
                            alignItems: "center",
                            }}
                        >
                        Upload
                        </div>
                    </div>
                </Upload>
                </Form.Item>
                <Form.Item
                    label="Dish Name"
                    name="dishName"
                    rules={[
                    {
                        required: true,
                        message: "Please input the name of the dish!",
                    },
                    ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                    {
                        required: true,
                        message: "Please input the price of the dish!",
                    },
                    ]}
                 >
                <InputNumber />
                </Form.Item>
                <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input the description of the dish!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Ingredients"
              name="ingredients"
              rules={[
                {
                  required: true,
                  message: "Please input the ingredient of the dish!",
                },
              ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
              </Modal>
              <Button onClick={showAddCat}>
                Add New Category
              </Button>
                <Modal
                open = {addCatOpen}
                onCancel={handleCancelAddCat}
                footer={null}
                destroyOnClose={true} 
                closable={false}
                centered={true}
                maskClosable={true}>
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    }}>
                </div>
                <Card title="Add New Cat" name="addForm">
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 20,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Category Name"
                    name="CategoryName"
                    rules={[
                    {
                        required: true,
                        message: "Please input the name of the new category!",
                    },
                    ]}
                >
                <Input />
                </Form.Item>
                  <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                  >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                
                </Form.Item>
                </Form>
                </Card>
                </Modal>
            </Header>
            <Content
              style={{
                margin: "24px 16px 0"
              }}
            >
              <div
                style={{
                  padding: 24,
                  minHeight: 360
                }}
              >
              </div>
                
            </Content>
            <Footer
              style={{
                textAlign: "center"
              }}
            ></Footer>
          </Layout>
        </Layout>
      );
    }

export default ManagerHomePage;
