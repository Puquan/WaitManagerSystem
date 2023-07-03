import * as React from "react";
import { useState } from "react";
import { Button, Form, Input, Card } from "antd";

const AddCatForm = (onClose) => {
  const sendFormData = (data) => {
    fetch("http://localhost:8080/waitsys/manager/add_category", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status == 200) {
          // cant catch error due to no-cors
          message.success("Dish added successfully!");
          console.log("Dish added successfully!");
          onClose();
        } else {
          throw new Error("Error adding Category");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.Category);
    sendFormData(formData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card title="Add New Category" name="addCatCard" bordered={false}>
      <Form
        name="addCatForm"
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
          label="Category"
          name="Category"
          rules={[
            {
              required: true,
              message: "Please input the name of the Category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCatForm;
