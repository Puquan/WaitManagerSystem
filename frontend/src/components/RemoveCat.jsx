import * as React from "react";
import {
  Button,
  Card,
  message,
} from "antd";

const RemoveCatForm = ({ onClose, categoryId }) => {
  const handleDelete = () => {
    const formData = new FormData();
    formData.append("itemId", categoryId);
    fetch(
        `http://localhost:8080/waitsys/manager/remove_category?id=${categoryId}`,
      {
        method: "POST"
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

  return (
    <Card title="Remove Category" name="Remove Category" bordered={false}>
        <div>
            <Button >
                Back
            </Button>
            <Button type="primary" danger onClick={handleDelete}>
                Delete
            </Button>
        Are you sure you want to remove this category?
        </div>
    </Card>
  );
};

export default RemoveCatForm;
