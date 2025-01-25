import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewFoods.css";
import img from "../../Assets/Images/image.png";
import axios from "axios";
import { API_BASE_URL, IMG_BASE_URL } from "../../Services/BaseURL";

function UserViewFoods() {
  const [data, setData] = useState([]);
      const [searchQuery, setSearchQuery] = useState(""); // State for search query
      const [filteredData, setFilteredData] = useState([]); // State for filtered food data

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllFood`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   // Function to handle search
   const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
        // Filter the data based on the search query
        const filteredItems = data.filter(item =>
            item.foodItem.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        setFilteredData(filteredItems);
    } else {
        // If the search is empty, show all items
        setFilteredData(data);
    }
};

  return (
    <div>
      <div className="container">
        <div className="user_view_foods">
          <div className="user_food_head">
            <p>Snacks & Beverages</p>
          </div>
          <div className="user_food_search">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search here    "
                value={searchQuery}
                onChange={handleSearch} // Call handleSearch when input changes
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>
        <div className="category_button_container">
          <div className="user_food_category_button">
            <button className="btn btn-outline-danger rounded-5 w-75">
              All
            </button>
          </div>
          <div className="user_food_category_button">
            <button className="btn btn-outline-danger rounded-5 w-75">
              Snacks
            </button>
          </div>
          <div className="user_food_category_button">
            <button className="btn btn-outline-danger rounded-5 w-75">
              Puffs
            </button>
          </div>
          <div className="user_food_category_button">
            <button className="btn btn-outline-danger rounded-5 w-75">
              Deserts
            </button>
          </div>
          <div className="user_food_category_button">
            <button className="btn btn-outline-danger rounded-5 w-75">
              Beverages
            </button>
          </div>
        </div>
        <div className="user_food_cat_card_container">
          <div className="row">
            {filteredData.length > 0
              ? filteredData.map((e) => {
                  return (
                    <div className="col-3">
                      <div className="user_food_cat_card_image">
                        {/* <img src={img} alt="" /> */}
                        <img src={`${IMG_BASE_URL}/${e.image.filename}`} alt={e.foodItem} />
                      </div>
                      <div className="user_food_cat_card_title">
                        <p>{e.foodItem}</p>
                      </div>
                      <div className="user_food_cat_card_actions">
                        <p>₹{e.amount}/-</p>
                        <button className="btn btn-outline-danger">+Add</button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserViewFoods;
