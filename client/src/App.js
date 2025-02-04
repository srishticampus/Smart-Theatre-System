
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'remixicon/fonts/remixicon.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingNavbar from './Components/Navbars/LandingNavbar'
import LandingPage from './Components/Common/LandingPage'
import ScrollToTop from './Components/Common/ScrollToTop';
import ContactUs from './Components/Common/ContactUs';
import Aboutus from './Components/Common/Aboutus';
import UserNavbar from './Components/Navbars/UserNavbar';
import UserBookTickets from './Components/User/UserBookTickets';
import UserBookTicketSeatCount from './Components/User/UserBookTicketSeatCount';
import UserBookTicketSelectSeat from './Components/User/UserBookTicketSelectSeat';
import UserBookTicketSelectedSeat from './Components/User/UserBookTicketSelectedSeat';
import UserBookTicketsPayment from './Components/User/UserBookTicketsPayment';
import UserViewParking from './Components/User/UserViewParking';
import UserSelectParking from './Components/User/UserSelectParking';
import UserParkingPayment from './Components/User/UserParkingPayment';

// import ForgotPassword from './Components/User/ForgotPassword'
// import UserAddComplaints from './Components/User/UserAddComplaints'
// import UserAddReview from './Components/User/UserAddReview'
// import UserEditProfile from './Components/User/UserEditProfile'
import UserRegistration from './Components/User/UserRegistration'
// import UserNavbar from './Components/Navbars/UserNavbar'
// import UserProfile from './Components/User/UserProfile'
import AdminLogin from './Components/Admin/AdminLogin'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AdminCall from './Components/Admin/AdminCall'
import Footer from './Components/Footers/Footer'
import { ToastContainer, toast } from 'react-toastify';
import UserLogin from './Components/User/UserLogin';
import StaffMain from './Components/Staff/StaffMain';
import UserHome from './Components/User/UserHome';
import UserContact from './Components/User/UserContact';
import UserAboutus from './Components/User/UserAboutUs';
import UserHomeNowShowing from './Components/User/UserHomeNowShowing';
import UserMovieDetails from './Components/User/UserMovieDetails';
import UserNowShowing from './Components/User/UserNowShowing';
import UserViewBookings from './Components/User/UserViewBookings';
import UserBookVirtualQueue from './Components/User/UserBookVirtualQueue';
import UserFoodBanner from './Components/User/UserFoodBanner';
import UserViewFoods from './Components/User/UserViewFoods';
import UserPreOrderFood from './Components/User/UserPreOrderFood';
import UserViewFoodPayment from './Components/User/UserViewFoodPayment';
import UserBookeQueueSeats from './Components/User/UserBookeQueueSeats';
function App() {
  return (
    <div className="App">

      <BrowserRouter basename="theatre">
        <ScrollToTop />
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          position="top-right"
        />
        <div>
          <Routes>
            {/* Common routes */}
            <Route path="/" element={[<LandingNavbar />, <LandingPage />,]} />
            <Route path="/contact" element={[<LandingNavbar />, <ContactUs />,]} />
            <Route path="/aboutUs" element={[<LandingNavbar />, <Aboutus />]} />




            {/* Admin Routes */}
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashboard' element={<AdminCall type='admin_dashboard' />} />
            <Route path='/admin_view_users' element={<AdminCall type='admin_view_users' />} />
            <Route path='/admin_add_staff' element={<AdminCall type='admin_add_staff' />} />
            <Route path='/admin-view-staff' element={<AdminCall type='admin-view-staff' />} />
            <Route path='/admin-edit-staff/:id' element={<AdminCall type='admin-edit-staff' />} />
            <Route path='/admin-add-screen' element={<AdminCall type='admin-add-screen' />} />
            <Route path='/admin-view-screen' element={<AdminCall type='admin-view-screen'/>}/>
            <Route path='/admin-view-lounge/:id'element={<AdminCall type='admin-view-lounge'/>}/>
            <Route path='/admin-edit-screen/:id' element={<AdminCall type='admin-edit-screen'/>} />
            <Route path='/admin-add-show/:id' element={<AdminCall type='admin-add-show'/>}/>
            <Route path='/admin-view-show-time'element={<AdminCall type='admin-view-show-time'/>}/>
            <Route path='/admin-edit-show-time' element={<AdminCall type='admin-edit-show-time'/>}/>
            <Route path='/admin-add-movie' element={<AdminCall type='admin-add-movie'/>}/>
            <Route path='/admin-edit-movie/:id' element={<AdminCall type='admin-edit-movie'/>}/>
            <Route path='/admin-view-movie' element={<AdminCall type='admin-view-movie'/>}/>
            <Route path='/admin-view-movie-details/:id' element={<AdminCall type='admin-view-details'/>}/>
            <Route path='/admin-add-food' element={<AdminCall type='admin-add-food'/>}/>
            <Route path='/admin-view-food' element={<AdminCall type='admin-view-food'/>}/>
            <Route path='/admin-edit-food/:id' element={<AdminCall type='admin-edit-food'/>}/>
            <Route path='/admin-parking-details' element={<AdminCall type='admin-parking-details'/>}/>
            <Route path='/admin-booking-details' element={<AdminCall type='admin-booking-details'/>}/>
            <Route path='/admin-booking-history' element={<AdminCall type='admin-booking-history'/>}/>
            <Route path='/admin-booking-details-single/:id' element={<AdminCall type='admin-booking-details-single'/>}/>



  

            {/* user */}
            <Route path='/user-registration' element={[<LandingNavbar />, <UserRegistration />]} />
            <Route path='/user-login' element={[<LandingNavbar />, <UserLogin />]} />
            <Route path='/user-home' element={[<UserNavbar />, <UserHome />]} />
            <Route path="/user-contact" element={[<UserNavbar />, <UserContact />,]} />
            <Route path="/user-about" element={[<UserNavbar />, <UserAboutus />]} />
            <Route path='/user-book-ticket/:id' element={[<UserNavbar/>,<UserBookTickets/>]}/>
            <Route path='/user-book-ticket-seat/:mId/:showId/:movieDate/:sId' element={[<UserNavbar/>,<UserBookTicketSeatCount/>]}/>
            <Route path='/user-book-ticket-select-seat/:mId/:showId/:count/:movieDate/:sId' element={[<UserNavbar/>,<UserBookTicketSelectSeat/>]}/>
            {/* <Route path='/user-book-ticket-selected-seat' element={[<UserNavbar/>,<UserBookTicketSelectedSeat/>]}/> */}
            <Route path='/user-book-ticket-payment' element={[<UserNavbar/>,<UserBookTicketsPayment/>]}/>
            <Route path='/user-view-parking/:id' element={[<UserNavbar/>,<UserViewParking/>]}/>
            <Route path='/user-select-parking' element={[<UserNavbar/>,<UserSelectParking/>]}/>
            <Route path='/user-parking-payment' element={[<UserNavbar/>,<UserParkingPayment/>]}/>
            <Route path='/user-movie-details/:id' element={[<UserNavbar/>,<UserMovieDetails/>]}/>
            <Route path='/user-now-showing' element={[<UserNavbar/>,<UserNowShowing/>]}/>
            <Route path='/user-view-bookings' element={[<UserNavbar/>,<UserViewBookings/>]}/>
            <Route path='/user-book-virtualqueue/:mId/:showId/:movieDate/:seatCount' element={[<UserNavbar/>,<UserBookVirtualQueue/>]}/>
            <Route path='/user-view-foods/:tId' element={[<UserNavbar/>,<UserFoodBanner/>,<UserViewFoods/>]}/>
            <Route path='/user-view-pre-order-food' element={[<UserNavbar/>,<UserPreOrderFood/>]}/>
            <Route path='/user-view-food-payment' element={[<UserNavbar/>,<UserViewFoodPayment/>]}/>
            <Route path='/user-book-queue-seats/:mId/:showId/:movieDate/:sId' element={[<UserNavbar/>,<UserBookeQueueSeats/>]}/>




            {/*  <Route path='/user_forgot_password' element={[<LandingNavbar />, <ForgotPassword activeUser='user' />]} />

           

            <Route path='/user_add_complaint' element={[<UserNavbar />, <UserAddComplaints />]} />

            // <Route path='/user_profile' element={[<UserNavbar />, <UserProfile />]} />
            <Route path='/user_edit_profile' element={[<UserNavbar />, <UserEditProfile />]} />

            <Route path='/user_add_review/:id' element={[<UserNavbar />, <UserAddReview />]} /> */}

            {/* STaff */}

            <Route path='/staff-home' element={<StaffMain type='staff-home' />} />
            <Route path='/staff-profile' element={<StaffMain type='staff-profile' />} />
            <Route path='/staff-edit-profile' element={<StaffMain type='staff-edit-profile' />} />
            <Route path='/staff-view-food' element={<StaffMain type='staff-view-food' />} />
            <Route path='/staff-view-ticket-booking' element={<StaffMain type='staff-view-ticket-booking' />} />
            <Route path='/staff-view-bookig-history' element={<StaffMain type='staff-view-bookig-history' />} />
            <Route path='/staff-booking-details-single/:id' element={<StaffMain type='staff-booking-details-single' />} />
            <Route path='/staff-parking-details' element={<StaffMain type='staff-parking-details' />} />
            <Route path='/staff-food-booking-req' element={<StaffMain type='staff-food-booking-req' />} />
            <Route path='/staff-view-delivered-foods' element={<StaffMain type='staff-view-delivered-foods' />} />
            <Route path='/staff-view-movies-queues' element={<StaffMain type='staff-view-movies-queues' />} />
            <Route path='/staff-view-queues' element={<StaffMain type='staff-view-queues' />} />



          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
