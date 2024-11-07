
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

// import ForgotPassword from './Components/User/ForgotPassword'
// import UserLogin from './Components/User/UserEditProfile'

// import UserHome from './Components/User/UserHome'
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
function App() {
  return (
    <div className="App">

      <BrowserRouter basename="maxuscinemas">
        <ScrollToTop />
        <ToastContainer
          autoClose={3000} 
          hideProgressBar={true}  
          position="top-right"  
        />
        <div>
          <Routes>
            {/* Common routes */}
            <Route path="/" element={[<LandingNavbar />, <LandingPage />, <Footer />]} />


     {/* Admin Routes */}
     <Route path='/admin-login' element={<AdminLogin/>} />
     <Route path='/admin-dashboard' element={<AdminCall type='admin_dashboard' />} />
     <Route path='/admin_view_users' element={<AdminCall type='admin_view_users' />} />
     <Route path='/admin_add_staff' element={<AdminCall type='admin_add_staff' />} />
     <Route path='/admin-view-staff' element={<AdminCall type='admin-view-staff' />} />
     <Route path='/admin-edit-staff/:id' element={<AdminCall type='admin-edit-staff' />} />



            {/* user */}
            <Route path='/user-registration' element={[<LandingNavbar />, <UserRegistration/>]} />
            {/* <Route path='/user_login' element={[<LandingNavbar />, <UserLogin />]} />
            <Route path='/user_forgot_password' element={[<LandingNavbar />, <ForgotPassword activeUser='user' />]} />

            <Route path='/user_home' element={[<UserNavbar />, <UserHome />]} />

            <Route path='/user_add_complaint' element={[<UserNavbar />, <UserAddComplaints />]} />

            <Route path='/user_profile' element={[<UserNavbar />, <UserProfile />]} />
            <Route path='/user_edit_profile' element={[<UserNavbar />, <UserEditProfile />]} />

            <Route path='/user_add_review/:id' element={[<UserNavbar />, <UserAddReview />]} /> */}



          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
