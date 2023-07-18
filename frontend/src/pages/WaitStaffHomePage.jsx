import { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import WSGrid from "../components/WSGrid";

const { Header, Content } = Layout;
const { Title } = Typography;

const WaitStaffHomePage = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
    const timer = setInterval(fetchTables, 1000); 
    return () => clearInterval(timer); 
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/waitsys/waitstaff/list_all_tables_waitstaff"
      );
      const data = await response.json();
      setTables(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <Header style={{ background: "#ffffff" }}>
        <Title level={3} style={{ color: "black", textAlign: "center" }}>
          Wait Staff Home Page
        </Title>
      </Header>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <WSGrid tables={tables} />
      </Content>
    </Layout>
  );
};

export default WaitStaffHomePage;
