import React from 'react';
import {useNavigate} from "react-router-dom"
import { Layout,  Button, Select, Form,Dropdown} from "antd";

const About = () => {

    const navigate = useNavigate();
    const [tableNumList,setTableNumList] = React.useState();
    const [selectedTable,setSelectedTable] = React.useState();
    const [form] = Form.useForm();

    const onChange = (value) =>{
        setSelectedTable(value);
    }

    const sendFormData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/waitsys/customer/start?tableId=${parseInt(selectedTable)}`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const data = await response.json();
          // 处理数据，将其设置到组件的状态中
          console.log(data);
          localStorage.setItem("orderId", JSON.stringify(data.orderId));
          localStorage.setItem("tableId", JSON.stringify(data.tableId));
        } catch (error) {
          console.error("Error:", error);
        }
      };

    const onFinish = async (values) => {
        setSelectedTable(values.tableNum);
        await sendFormData();
        console.log(selectedTable)
        navigate("/Order")
      };

    const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/waitsys/customer/table/showAll`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const data = await response.json();
          createSelectMenu(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    const createSelectMenu = (data) => {
        var map = [];
        for (var i=0;i<data.length;i++){ 
            const temp = {
                value:data[i],
                label:data[i]
            };
            map.push(temp);
        }
        
        console.log(map);
        setTableNumList(map);  
    }

    return (
    <>
       <Form
        form={form}
        name="SelectTableForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <Form.Item
          label="Your table"
          name="tableNum"
          rules={[
            {
              required: true,
              message: "Please select the category!",
            },
          ]}
        >
        <Select
            defaultValue="See Dropdown menu and select your table"
            style={{
              width: 500,
            }}

            options={tableNumList}
            onChange={onChange}
            onClick={fetchData}
        />    
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
       
   </>
    )
  };
    
  export default About;