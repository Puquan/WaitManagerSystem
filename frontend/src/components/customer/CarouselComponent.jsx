import React from "react";
import { Carousel, Modal } from "antd";
import { FaStar } from "react-icons/fa";
import { GiFire } from "react-icons/gi";
import { useState } from "react";
import CustomerDetailedDish from "./CustomerDetailedDish";

// Displays carousels of top-rated and top-selling dishes.
// It accepts topRatingDish, topSellingDish, tableId, orderId as props.
const CarouselComponent = ({ topRatingDish, topSellingDish, tableId, orderId}) => {
  //State intial and trigger
    const [showDetail, setShowDetail] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
  
    const displayDetail = (dish) => {
      setSelectedDish(dish);
      setShowDetail(true);
    };
  
    const handleCancelDisplayDetail = () => {
      setShowDetail(false);
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Top Rated Dishes Carousel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginRight: 20 }}>
          <h2 style={{ fontFamily: "Lato", fontWeight: "bold" }}>
            <FaStar style={{ marginRight: 5 }} />
            Top Rated
          </h2>
          {topRatingDish && topRatingDish.length > 0 ? (
            <Carousel style={{ width: "100%", maxWidth: "480px", height: "320px" }} autoplay dotPosition="bottom">
              {topRatingDish.map((dish) => (
                <div key={`rating_${dish.itemId}`}>
                  <img
                    src={`data:image/jpeg;base64,${dish.picture}`}
                    alt={dish.name}
                    style={{ width: "100%", height: "310px", cursor: "pointer" }}
                    onClick={() => displayDetail(dish)}
                  />
                  <div style={{ textAlign: "center", fontFamily: "Lato", fontSize: "16px" }}>{dish.name}</div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div>No top-rated dishes found.</div>
          )}
        </div>
  
        {/* Top Selling Dishes Carousel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontFamily: "Lato", fontWeight: "bold" }}>
            <GiFire style={{ marginRight: 5 }} />
            Best Seller
          </h2>
          {topSellingDish && topSellingDish.length > 0 ? (
            <Carousel style={{ width: "100%", maxWidth: "480px", height: "320px" }} autoplay dotPosition="bottom">
              {topSellingDish.map((dish) => (
                <div key={`selling_${dish.itemId}`}>
                  <img
                    src={`data:image/jpeg;base64,${dish.picture}`}
                    alt={dish.name}
                    style={{ width: "100%", height: "310px", cursor: "pointer" }}
                    onClick={() => displayDetail(dish)}
                  />
                  <div style={{ textAlign: "center", fontFamily: "Lato", fontSize: "16px" }}>{dish.name}</div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div>No top-selling dishes found.</div>
          )}
        </div>
  
        {/* Modal for displaying detailed dish */}
        {selectedDish && (
          <Modal
            open={showDetail}
            onCancel={handleCancelDisplayDetail}
            footer={null}
            destroyOnClose
            maskClosable
            closable
            centered
          >
            <CustomerDetailedDish
              itemId={selectedDish.itemId}
              tableId={tableId} 
              orderId={orderId} 
            />
          </Modal>
        )}
      </div>
    );
  };
  
  export default CarouselComponent;