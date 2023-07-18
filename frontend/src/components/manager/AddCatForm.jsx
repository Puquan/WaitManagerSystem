import * as React from "react";
import { Button, Form, Input, Card } from "antd";

const AddCatForm = ({ onClose }) => {
  const sendFormData = (data) => {
    fetch("http://localhost:8080/waitsys/manager/add_category", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.status == 200) {
          // cant catch error due to no-cors
          message.success("Category added successfully!");
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
    onClose();
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
