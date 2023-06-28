import * as React from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload, Card } from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddDishForm = ({ onClose }) => {
  const [file, setFile] = useState(null); // State variable to track the uploaded image file

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sendFormData = (data) => {
    fetch("http://localhost:8080/waitsys/manager/item/add", {
      mode: "no-cors",
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 0) {
          // cant catch error due to no-cors
          message.success("Dish added successfully!");
          console.log("Dish added successfully!");
          onClose();
        } else {
          throw new Error("Error adding dish");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const formData = new FormData();
    formData.append("name", values.dishName);
    formData.append("description", values.description);
    formData.append("ingredient", values.ingredients);
    formData.append("price", values.price);
    formData.append("categoryId", values.dishCategory);

    if (file) {
      formData.append("picture", file);
    } else {
      message.error(`Please add dish image.`);
      formData.append("picture", null);
      return;
    }
    sendFormData(formData);
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

  return (
    <Card title="Add New Dish" name="addDishCard" bordered={false}>
      <Form
        name="addDishForm"
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
          label="Category"
          name="dishCategory"
          rules={[
            {
              required: true,
              message: "Please input the name of the Category!",
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
  );
};

export default AddDishForm;
