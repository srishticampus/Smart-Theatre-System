const express = require("express");
const router = express.Router();

const Admin=require('./controllers/adminController')
const User = require('./controllers/userController'); 
const Staff = require('./controllers/staffController'); 
const Screen = require('./controllers/screenController'); 
const showtime=require('./controllers/showTimeController')
const Movie=require('./controllers/movieController')
const Food=require('./controllers/foodController')

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


// Screens
router.post('/addScreen',Screen.addScreen)
router.post('/viewAllScreens',Screen.viewAllScreens)
router.post('/editScreenById/:id',Screen.editScreenById)
router.post('/deleteScreenById/:id',Screen.deleteScreenById)
router.post('/viewScreenById/:id',Screen.viewScreenById)

// show Time
router.post('/addShowtime',showtime.addShowtime)

router.post('/viewShowsByScreenIdForDay/:id',showtime.viewShowsByScreenIdForDay)
router.post('/viewShowsById/:id',showtime.viewShowsById)


//movies
router.post('/createMovie',Movie.upload,Movie.createMovie)
router.post('/createCast/:id',Movie.uploadCaste,Movie.createCast)
router.post('/viewAllMovies',Movie.viewAllMovies)
router.post('/viewMovieById/:id',Movie.viewMovieById)
router.post('/viewCastByMovieId/:id',Movie.viewCastByMovieId)
router.post('/updateMovieById/:id',Movie.upload,Movie.updateMovieById)
router.post('/updateCast/:id',Movie.updateCast,Movie.updateCast)
router.post('/nowShowingMovies',Movie.nowShowingMovies)
router.post('/comingSonnMovies',Movie.comingSoonMovies)


// Food
router.post('/addFood',Food.uploadSingle,Food.registerFood)
router.post('/viewAllFood',Food.viewAllFood)
router.post('/viewFoodById/:id',Food.viewFoodById)
router.post('/deleteFoodById/:id',Food.deleteFoodById)
router.post('/editFoodById/:id',Food.uploadSingle,Food.editFoodById)

module.exports = router;