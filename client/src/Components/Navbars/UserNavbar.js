import React, { useEffect, useState } from "react";
import "../../Assets/Styles/UserNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/Vector (1).png";
import { toast } from "react-toastify";

function UserNavbar() {
  const navigate = useNavigate();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [searcResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out Succesfully')
    setTimeout(()=>{navigate("/")},300)
  };

  const handleSearchIconClick = () => {
    setShowSearchBox(!showSearchBox);
    setSearchResults([])
  };



  return (
    // <nav className="navbar navbar-expand-lg fixed-top">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" to="/user_home">
    //       <img
    //         src={logo}
    //         alt="logo"
    //         width="30"
    //         height="30"
    //         className="d-inline-block align-top"
    //       />
    //       <span className="ms-2 text-light">
    //         <span className="text-danger">Maxus</span>Cinemas
    //       </span>
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav ms-auto">
    //         <li className="nav-item">
    //           <Link className="nav-link text-light" to="/user_home">
    //             Home
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             className="nav-link text-light"
    //             to="/user_view_subscription"
    //           >
    //             About
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link text-light" to="/user_chat">
    //             Book Ticket
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link text-light" to="/user_add_complaint">
    //             My Bookings
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link text-light" to="/user_add_complaint">
    //            Feedback
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link text-light" to="/user_add_complaint">
    //            Contact
    //           </Link>
    //         </li>
    //         {showSearchBox && (
    //           <div className="position-relative">
    //             <form className="d-flex ms-2"
    //             //  onSubmit={handleSearch}
    //              >
    //               <input
    //                 className="form-control me-2"
    //                 type="search"
    //                 placeholder="Search"
    //                 aria-label="Search"
    //                 // value={searchInfo}
    //                 onChange={(e) => setSearchInfo(e.target.value)}
    //               />
    //               {/* <button className="btn btn-outline-success" type="submit">
    //                 Search
    //               </button> */}
    //             </form>
    //             {searcResults.length > 0 && (
    //               <ul className="list-group position-absolute mt-1" style={{ zIndex: 1000, width: "100%" }}>
    //                 {searcResults.map((data, index) => (
    //                   <li key={index} className="list-group-item bg-dark text-light border-0">
    //                     <Link to={`/user-view-single-movie/${data._id}/${data.thumbnail.filename}`}onClick={handleSearchIconClick} className="nav-link p-0 text-light" >{data.name}</Link>
    //                   </li>
    //                 ))}
    //               </ul>
    //             )}
    //           </div>
    //         )}
    //         <li className="nav-item nav-link text-light">
    //           <i
    //             className="ri-search-line"
    //             onClick={handleSearchIconClick}
    //             style={{ cursor: "pointer" }}
    //           ></i>
    //         </li>
            
          
    //         <li className="nav-item dropdown">
    //           <Link
    //             className="nav-link dropdown-toggle text-light"
    //             to="#"
    //             id="navbarDropdown"
    //             role="button"
    //             data-bs-toggle="dropdown"
    //             aria-expanded="false"
    //           >
    //             <i className="ri-user-3-line"></i>
    //           </Link>
    //           <ul
    //             className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
    //             aria-labelledby="navbarDropdown"
    //           >
    //             <li>
    //               <Link className="dropdown-item" to="/user_profile">
    //                 Profile
    //               </Link>
    //             </li>
               
    //             <li>
    //               <button className="dropdown-item" onClick={handleLogout}>
    //                 Logout
    //               </button>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>


    <nav className="navbar navbar-expand-lg fixed-top">
  <div className="container-fluid d-flex align-items-center justify-content-between">
    {/* Logo */}
    <Link className="navbar-brand" to="/user_home">
      <img
        src={logo}
        alt="logo"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      <span className="ms-2 text-light">
        <span className="text-danger">Maxus</span>Cinemas
      </span>
    </Link>

    {/* Menu Options */}
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-light" to="/user-home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/user-about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/user_chat">
            Book Ticket
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/user_add_complaint">
            My Bookings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/user_add_complaint">
            Feedback
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/user-contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>

    {/* Search & Profile */}
    <div className="d-flex align-items-center">
      {showSearchBox && (
        <form className="d-flex me-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchInfo(e.target.value)}
          />
        </form>
      )}
      <i
        className="ri-search-line text-light me-3"
        onClick={handleSearchIconClick}
        style={{ cursor: "pointer" }}
      ></i>
      <div className="dropdown">
        <i
          className="ri-user-3-line text-light"
          data-bs-toggle="dropdown"
          style={{ cursor: "pointer" }}
        ></i>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
          <li>
            <Link className="dropdown-item" to="/user_profile">
              Profile
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

  );
}

export default UserNavbar;
