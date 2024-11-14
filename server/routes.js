const express = require("express");
const router = express.Router();

const Admin=require('./controllers/adminController')
const User = require('./controllers/userController'); 
const Staff = require('./controllers/staffController'); 


// User routes

router.post('/registerUser', User.uploadSingle, User.registerUser);
router.post('/loginUser', User.login);
router.post('/forgotPasswordUser', User.forgotPassword);
router.post('/resetPasswordUser/:id', User.resetPassword);
router.post('/viewUserById/:id', User.viewUserById);

router.post('/viewAllUsers', User.viewAllUsers);
router.post('/deActivateUserById/:id', User.deActivateUserById);
router.post('/rejectUserById/:id', User.rejectUserById);
router.post('/approveUserById/:id', User.approveUserById);
router.post('/editUserById/:id', User.editUserById);
router.post('/activateUserById/:id', User.activateUserById);

//admin
router.post('/adminResetPassword',Admin.adminResetPassword);
router.post('/adminLogin',Admin.login);


// Staff routes
router.post('/registerStaff', Staff.uploadSingle, Staff.registerStaff);
router.post('/forgotPasswordStaff', Staff.forgotPassword);
router.post('/resetPasswordStaff/:id', Staff.resetPassword);
router.post('/viewStaffById/:id', Staff.viewStaffById);
router.post('/viewAllStaff', Staff.viewAllStaff);
router.post('/deActivateStaffById/:id', Staff.deActivateStaffById);
router.post('/activateStaffById/:id', Staff.activateStaffById);
router.post('/editStaffById/:id',Staff.uploadSingle, Staff.editStaffById);
router.post('/deleteStaffById/:id', Staff.deleteStaffById);
router.post('/loginStaff', Staff.login);

module.exports = router;