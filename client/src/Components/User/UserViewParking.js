import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewParking.css";
import gc from "../../Assets/Images/GC.png";
import rc from "../../Assets/Images/RC.png";
import rb from "../../Assets/Images/RB.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../Services/BaseURL";

function UserViewParking() {
  const { id } = useParams();
  const uId = localStorage.getItem("user");
  const [allParking, setAllParking] = useState([]);
  const navigate = useNavigate();

  const [carParkingSpots, setCarParkingSpots] = useState([
    { id: "C-1", isAvailable: true },
    { id: "C-2", isAvailable: true },
    { id: "C-3", isAvailable: true },
    { id: "C-4", isAvailable: true },
    { id: "C-5", isAvailable: true },
    { id: "C-6", isAvailable: true },
    { id: "C-7", isAvailable: true },
    { id: "C-8", isAvailable: true },
    { id: "C-9", isAvailable: true },
    { id: "C-10", isAvailable: true },
    { id: "C-11", isAvailable: true },
    { id: "C-12", isAvailable: true },
    { id: "C-13", isAvailable: true },
    { id: "C-14", isAvailable: true },
    { id: "C-15", isAvailable: true },
    { id: "C-16", isAvailable: true },
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
    { id: "B-2", isAvailable: true },
    { id: "B-3", isAvailable: true },
    { id: "B-4", isAvailable: true },
    { id: "B-5", isAvailable: true },
    { id: "B-6", isAvailable: true },
    { id: "B-7", isAvailable: true },
    { id: "B-8", isAvailable: true },
    { id: "B-9", isAvailable: true },
    { id: "B-10", isAvailable: true },
    { id: "B-11", isAvailable: true },
    { id: "B-12", isAvailable: true },
    { id: "B-13", isAvailable: true },
    { id: "B-14", isAvailable: true },
    { id: "B-15", isAvailable: true },
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

  const [data, setData] = useState({
    ticketId: id,
    slotNo: "",
    vehicleType: "",
    userId: uId,
    date: "",
  });

  const [apiData, setApiData] = useState({});

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewTicketById/${id}`)
      .then((res) => {
        setApiData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllParking`)
      .then((res) => {
        setAllParking(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setData((prevData) => ({ ...prevData, date: apiData.movieDate }));
  }, [apiData]);

  // Function to handle slot selection and update slotNo & vehicleType
  const handleSlotSelection = (slotId, vehicleType) => {
    const amount = vehicleType === "Car" ? 50 : 20; // Set amount based on vehicle type
    setData((prevData) => ({
      ...prevData,
      slotNo: slotId,
      vehicleType: vehicleType,
      amount: amount, // Add amount to state
    }));
  };

  useEffect(() => {
    if (allParking.length > 0 && apiData.movieDate && apiData.showId) {
      // Extract the relevant date and show time
      const movieDate = apiData.movieDate;
      const movieStartTime = apiData.showId.startTime;

      // Filter booked slots for the same date and start time
      const bookedSlots = allParking
        .filter(
          (parking) =>
            parking.date === movieDate &&
            parking.ticketId?.showId?.startTime === movieStartTime
        )
        .map((parking) => parking.slotNo);

      // Update car parking spots
      setCarParkingSpots((prevSpots) =>
        prevSpots.map((spot) => ({
          ...spot,
          isAvailable: !bookedSlots.includes(spot.id),
        }))
      );

      // Update bike parking spots
      setBikeParkingSpots((prevSpots) =>
        prevSpots.map((spot) => ({
          ...spot,
          isAvailable: !bookedSlots.includes(spot.id),
        }))
      );
    }
  }, [allParking, apiData]);

  console.log("parlingdetails", allParking);
  console.log("moivedetails", apiData);

  return (
    <div className="container user-view-parking">
      <p className="customer-view-parking-head">Parking</p>
      <div className="parking-section">
        {/* Car Parking Section */}
        <div className="car-parking">
          <p
            className="user-view-parking-car-head"
            style={{ textAlign: "center" }}
          >
            Car - ₹50/-
          </p>
          <div className="row">
            {carParkingSpots.map((spot) => (
              <div
                key={spot.id}
                className={`card user-view-parking-all-card-size col-sm-4 ${
                  data.slotNo === spot.id ? "selected-slot" : ""
                }`}
                onClick={() => handleSlotSelection(spot.id, "Car")}
                style={{
                  cursor: "pointer",
                  border:
                    data.slotNo === spot.id
                      ? "2px solid blue"
                      : "1px solid gray",
                }}
              >
                {spot.isAvailable ? (
                  <div style={{ textAlign: "center" }}>
                    <p className="mb-0">{spot.id}</p>
                    <p>Available</p>
                  </div>
                ) : (
                  <img
                    src={rc}
                    style={{ objectFit: "contain", pointerEvents: "none" }}
                    alt={`Car in ${spot.id}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bike Parking Section */}
        <div className="bike-parking">
          <p
            className="user-view-parking-bike-head"
            style={{ textAlign: "center" }}
          >
            Bike - ₹20/-
          </p>
          <div className="row">
            {bikeParkingSpots.map((spot) => (
              <div
                key={spot.id}
                className={`card user-view-parking-all-bikecard-size col-sm-2 ${
                  data.slotNo === spot.id ? "selected-slot" : ""
                }`}
                onClick={() => handleSlotSelection(spot.id, "Bike")}
                style={{
                  cursor: "pointer",
                  border:
                    data.slotNo === spot.id
                      ? "2px solid blue"
                      : "1px solid gray",
                }}
              >
                {spot.isAvailable ? (
                  <div style={{ textAlign: "center" }}>
                    <p className="mb-0">{spot.id}</p>
                  </div>
                ) : (
                  <img
                    src={rb}
                    alt={`Bike in ${spot.id}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {data.slotNo && (
          <div>
            <button
              className="btn btn-danger"
              style={{ alignItems: "center" }}
              onClick={() => {
                navigate("/user-parking-payment", {
                  state: {
                    data,
                  },
                });
              }}
            >
              Pay {data.vehicleType === "Car" ? "50" : "20"}/-
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserViewParking;
