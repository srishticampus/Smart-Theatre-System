import React, { useState } from "react";
import "../../Assets/Styles/UserSelectParking.css";
import rc from "../../Assets/Images/RC.png";
import rb from "../../Assets/Images/RB.png";

function UserSelectParking() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState("1st Floor");
  const [carParkingSpots, setCarParkingSpots] = useState([
    { id: "C-1", isAvailable: false },
    { id: "C-2", isAvailable: false },
    { id: "C-3", isAvailable: false },
    { id: "C-4", isAvailable: true },
    { id: "C-5", isAvailable: false },
    { id: "C-6", isAvailable: true },
    { id: "C-7", isAvailable: true },
    { id: "C-8", isAvailable: false },
    { id: "C-9", isAvailable: true },
    { id: "C-10", isAvailable: true },
    { id: "C-11", isAvailable: true },
    { id: "C-12", isAvailable: true },
    { id: "C-13", isAvailable: true },
    { id: "C-14", isAvailable: true },
    { id: "C-15", isAvailable: true },
    { id: "C-16", isAvailable: false },
    { id: "C-17", isAvailable: true },
    { id: "C-18", isAvailable: true },
    { id: "C-19", isAvailable: true },
    { id: "C-20", isAvailable: true },
    { id: "C-21", isAvailable: true },
    { id: "C-22", isAvailable: true },
    { id: "C-23", isAvailable: true },
    { id: "C-24", isAvailable: true },
  ]);

  const [bikeParkingSpots, setBikeParkingSpots] = useState([
    { id: "B-1", isAvailable: true },
    { id: "B-2", isAvailable: false },
    { id: "B-3", isAvailable: true },
    { id: "B-4", isAvailable: true },
    { id: "B-5", isAvailable: false },
    { id: "B-6", isAvailable: true },
    { id: "B-7", isAvailable: true },
    { id: "B-8", isAvailable: false },
    { id: "B-9", isAvailable: true },
    { id: "B-10", isAvailable: true },
    { id: "B-11", isAvailable: true },
    { id: "B-12", isAvailable: true },
    { id: "B-13", isAvailable: true },
    { id: "B-14", isAvailable: true },
    { id: "B-15", isAvailable: false },
    { id: "B-16", isAvailable: true },
    { id: "B-17", isAvailable: true },
    { id: "B-18", isAvailable: true },
    { id: "B-19", isAvailable: true },
    { id: "B-20", isAvailable: true },
    { id: "B-21", isAvailable: true },
    { id: "B-22", isAvailable: true },
    { id: "B-23", isAvailable: true },
    { id: "B-24", isAvailable: true },
    { id: "B-25", isAvailable: true },
    { id: "B-26", isAvailable: true },
    { id: "B-27", isAvailable: true },
    { id: "B-28", isAvailable: true },
    { id: "B-29", isAvailable: true },
    { id: "B-30", isAvailable: true },
    { id: "B-31", isAvailable: true },
    { id: "B-32", isAvailable: true },
    { id: "B-33", isAvailable: true },
    { id: "B-34", isAvailable: true },
    { id: "B-35", isAvailable: true },
    { id: "B-36", isAvailable: true },
    { id: "B-37", isAvailable: true },
    { id: "B-38", isAvailable: true },
    { id: "B-39", isAvailable: true },
    { id: "B-40", isAvailable: true },
    { id: "B-41", isAvailable: true },
    { id: "B-42", isAvailable: true },
    { id: "B-43", isAvailable: true },
    { id: "B-44", isAvailable: true },
    { id: "B-45", isAvailable: true },
    { id: "B-46", isAvailable: true },
    { id: "B-47", isAvailable: true },
    { id: "B-48", isAvailable: true },
    { id: "B-49", isAvailable: true },
    { id: "B-50", isAvailable: true },
    { id: "B-51", isAvailable: true },
    { id: "B-52", isAvailable: true },
    { id: "B-53", isAvailable: true },
    { id: "B-54", isAvailable: true },
    { id: "B-55", isAvailable: true },
    { id: "B-56", isAvailable: true },
    { id: "B-57", isAvailable: true },
    { id: "B-58", isAvailable: true },
    { id: "B-59", isAvailable: true },
    { id: "B-60", isAvailable: true },
    { id: "B-61", isAvailable: true },
    { id: "B-62", isAvailable: true },
    { id: "B-63", isAvailable: true },
    { id: "B-64", isAvailable: true },
    { id: "B-65", isAvailable: true },
    { id: "B-66", isAvailable: true },
    { id: "B-67", isAvailable: true },
    { id: "B-68", isAvailable: true },
    { id: "B-69", isAvailable: true },
    { id: "B-70", isAvailable: true },
  ]);

  // Split car parking spots into groups of 3 to create rows
  const carRows = [];
  for (let i = 0; i < carParkingSpots.length; i += 3) {
    carRows.push(carParkingSpots.slice(i, i + 3));
  }

  // Split bike parking spots into groups of 5 to create rows
  const bikeRows = [];
  for (let i = 0; i < bikeParkingSpots.length; i += 5) {
    bikeRows.push(bikeParkingSpots.slice(i, i + 5));
  }

  const handleSpotClick = (spot, type) => {
    if (spot.isAvailable) {
      setSelectedSpot({ id: spot.id, type });
    }
  };

  console.log(carRows);
  

  const renderPayButton = () => {
    if (!selectedSpot) return null;
    const price = selectedSpot.type === "car" ? "50" : "20";
    return (
      <div className="user-select-parking-popup-container">
        <div className="user-select-parking-button">
          <div>
            <button className="btn btn-danger mt-3">
              Pay - &#8377;{price}
            </button>
          </div>
        </div>
      </div>
    );
  };
  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
  };

  return (
    <div className="container user-select-parking">
      <div className="d-flex justify-content-between">
        <p className="customer-select-parking-head">Parking</p>

        <div className="dropdown user-select-parking mt-0">
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {selectedFloor} {/* Display selected floor */}
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleFloorSelect("2nd Floor")}
              >
                2nd Floor
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleFloorSelect("3rd Floor")}
              >
                3rd Floor
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="parking-section">
        {/* Car Parking Section */}
        <div className="car-parking">
          <p
            style={{ textAlign: "center" }}
            className="user-select-parking-car-head"
          >
            Car -&#8377;50/-
          </p>
          {/* Render each row of car parking cards */}
          {carRows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((spot) => (
                <div
                  className="card user-select-parking-all-card-size col-sm-4"
                  key={spot.id}
                  onClick={() => handleSpotClick(spot, "car")}
                >
                  {/* Conditional rendering for car spots */}
                  {spot.isAvailable ? (
                    <div style={{ textAlign: "center" }}>
                      <p className="mb-0">{spot.id}</p>
                      <p>Available</p>
                    </div>
                  ) : (
                    <img src={rc} alt={`Car in ${spot.id}`} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bike Parking Section */}
        <div className="bike-parking">
          <p
            style={{ textAlign: "center" }}
            className="user-select-parking-bike-head"
          >
            Bike- &#8377; 20/-
          </p>
          {/* Render each row of bike parking cards */}
          {bikeRows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((spot) => (
                <div
                  className="card user-select-parking-all-bikecard-size col-sm-2"
                  key={spot.id}
                  onClick={() => handleSpotClick(spot, "bike")}
                >
                  {/* Conditional rendering for bike spots */}
                  {spot.isAvailable ? (
                    <div style={{ textAlign: "center" }}>
                      <p className="mb-0">{spot.id}</p>
                    </div>
                  ) : (
                    <img src={rb} alt={`Bike in ${spot.id}`} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {renderPayButton()}
    </div>
  );
}

export default UserSelectParking;
