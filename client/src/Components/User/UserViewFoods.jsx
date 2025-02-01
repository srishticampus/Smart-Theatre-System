import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserViewFoods.css";
import axios from "axios";
import { API_BASE_URL, IMG_BASE_URL } from "../../Services/BaseURL";
import { useNavigate } from "react-router-dom";

function UserViewFoods() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredData, setFilteredData] = useState([]); 
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items
  const navigate=useNavigate()

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllFood`)
      .then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filteredItems = data.filter(item =>
        item.foodItem.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
      setFilteredData(filteredItems);
    } else {
      setFilteredData(data);
    }
  };

  const handleCategoryFilter = (category) => {
    if (category === "All") {
      setFilteredData(data);
    } else {
      const filteredItems = data.filter(item => item.category === category);
      setFilteredData(filteredItems);
    }
  };

  const handleAddRemove = (item) => {
    const isItemAdded = selectedItems.some(selected => selected._id === item._id);

    if (isItemAdded) {
      setSelectedItems(prevItems => prevItems.filter(selected => selected._id !== item._id));
    } else {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };

  console.log(selectedItems);
  

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
                placeholder="Search here"
                value={searchQuery}
                onChange={handleSearch}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>

       

        <div className="category_button_container">
          {["All", "Snacks", "Puffs", "Deserts", "Beverages"].map(category => (
            <div className="user_food_category_button" key={category}>
              <button
                className="btn btn-outline-danger rounded-5 w-75"
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            </div>
          ))}
        </div>

        {
          selectedItems.length>0?<div className="confirm_button text-center mb-3">
          <button className="btn btn-danger" onClick={() => {
                navigate("/user-view-pre-order-food", {
                  state: {
                    selectedItems
                  },
                });
              }} > {selectedItems.length} Product Added</button>
        </div>:''
        }

        

        <div className="user_food_cat_card_container">
          <div className="row">
            {filteredData.length > 0
              ? filteredData.map((e) => {
                  const isAdded = selectedItems.some(item => item._id === e._id);

                  return (
                    <div className="col-3" key={e._id}>
                      <div className="user_food_cat_card_image">
                        <img src={`${IMG_BASE_URL}/${e.image.filename}`} alt={e.foodItem} />
                      </div>
                      <div className="user_food_cat_card_title">
                        <p>{e.foodItem}</p>
                      </div>
                      <div className="user_food_cat_card_actions">
                        <p>₹{e.amount}/-</p>
                        <button 
                          className={`btn ${isAdded ? "btn-danger" : "btn-outline-danger"}`} 
                          onClick={() => handleAddRemove(e)}
                        >
                          {isAdded ? "Added" : "+Add"}
                        </button>
                      </div>
                    </div>
                  );
                })
              : <p className="text-center">No food items found</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserViewFoods;
