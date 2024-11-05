const express = require("express");
const router = express.Router();

const Admin=require('./controllers/adminController')
const User = require('./controllers/userController'); 



// User routes

router.post('/registerUser', User.uploadSingle, User.registerUser);
router.post('/loginUser', User.login);
router.post('/forgotPasswordUser', User.forgotPassword);
router.post('/resetPasswordUser/:id', User.resetPassword);
router.post('/viewUserById/:id', User.viewUserById);

router.post('/viewActiveUsers', User.viewActiveUsers);
router.post('/deActivateUserById/:id', User.deActivateUserById);
router.post('/rejectUserById/:id', User.rejectUserById);
router.post('/approveUserById/:id', User.approveUserById);
router.post('/editUserById/:id', User.editUserById);
router.post('/activateUserById/:id', User.activateUserById);

//admin
router.post('/adminResetPassword',Admin.adminResetPassword);
router.post('/adminLogin',Admin.login);

module.exports = router;