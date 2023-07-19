import { Row, Col } from "antd";
import WSCard from "./WSCard";

const WSGrid = ({ tables }) => {
  return (
    <Row gutter={[16, 16]}>
      {tables.map((table) => (
        <Col key={table.tableId} xs={24} sm={12} md={8} lg={6}>
          <WSCard table={table} />
        </Col>
      ))}
    </Row>
  );
};

export default WSGrid;
