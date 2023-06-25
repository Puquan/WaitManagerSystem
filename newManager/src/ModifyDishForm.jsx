import * as React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload, Card, Space } from "antd";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

class ModifyDishForm extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card title="Modify Dish" name="modifyForm">
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
                offset: 5,
                span: 16,
              }}
            >
              <Space size={20}>
                <Button
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  style={{ backgroundColor: "green" }}
                >
                  Modify
                </Button>
                <Button type="primary" danger>
                  Delete
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };
  }
  

export default ModifyDishForm;
