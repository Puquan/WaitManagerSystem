import * as React from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload, Card, Space, message } from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ModifyDishForm = ({onClose, itemId}) => {
  const [file, setFile] = useState(null); // State variable to track the uploaded image file
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('itemId', itemId);
    formData.append('name', values.dishName);
    formData.append('description', values.description);
    formData.append('ingredient', values.ingredients);
    formData.append('price', values.price);
    formData.append('categoryId', 1); //???

    if (file) {
      formData.append('picture', file);
    } else {
    message.error(`Please add dish image.`);
    formData.append('picture', null); 
    return;
    }
    sendFormData(formData);
  };

  const sendFormData = (data) => {
    fetch("http://localhost:8080/waitsys/manager/item/edit", { 
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.status === 200) { 
          console.log("Modify success:", response);
          message.success("Dish modified successfully!");
          onClose();
        } else {
          throw new Error("Failed to modify dish.");
        }
      })
      .catch((error) => {
        console.error("Modify failed:", error);
      });
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("itemId", itemId);
    fetch(`http://localhost:8080/waitsys/manager/item/delete?itemId=${itemId}`, {
      method: "GET",
    })
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

  const beforeUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const isAllowed = allowedTypes.includes(file.type);
    if (!isAllowed) {
      console.log("Only JPG/PNG files are allowed!");
    } else {
      setFile(file); // Update the image file state variable
    }
    return false; // Returning false prevents immediate upload
  };

  const uploadProps = {
    beforeUpload,
    maxCount: 1,
    listType: "picture-card",
    accept: "image/jpeg, image/png",
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="Modify Dish" name="modifyDishForm" bordered={false}>
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
          <Upload
            {...uploadProps}
            action="/upload.do"
            listType="picture-card"
            beforeUpload={beforeUpload}
          >
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
            <Button type="primary" danger onClick={handleDelete}>
              Delete
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ModifyDishForm;