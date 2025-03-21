const express = require("express");
const router = express.Router();

const Admin=require('./controllers/adminController')
const User = require('./controllers/userController'); 
const Staff = require('./controllers/staffController'); 
const Screen = require('./controllers/screenController'); 
const showtime=require('./controllers/showTimeController')
const Movie=require('./controllers/movieController')
const Food=require('./controllers/foodController')
const Ticket=require('./controllers/ticketController')
const foodBooking=require('./controllers/foodBookController')
const parking=require('./controllers/parkingController')
const queue=require('./controllers/queueController')
const feedback=require('./controllers/feedbackController')

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
router.post('/forgotPWDsentMail', User.forgotPWDsentMail);
router.post('/resetPswdaftermail/:id', User.resetPswdaftermail);

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
router.post('/deactivateMovieById/:id',Movie.deactivateMovieById)


// Food
router.post('/addFood',Food.uploadSingle,Food.registerFood)
router.post('/viewAllFood',Food.viewAllFood)
router.post('/viewFoodById/:id',Food.viewFoodById)
router.post('/deleteFoodById/:id',Food.deleteFoodById)
router.post('/editFoodById/:id',Food.uploadSingle,Food.editFoodById)

// Tickets
router.post('/addTicket',Ticket.addTicket)
router.post('/deleteTicketById/:id',Ticket.deleteTicketById)
router.post('/viewTicketById/:id',Ticket.viewTicketById)
router.post('/viewAllTickets',Ticket.viewAllTickets)
router.post('/viewTicketsByUserId/:id',Ticket.viewTicketsByUserId)
router.post('/getBookedSeats',Ticket.getBookedSeats)
router.post('/getTicketThroughMail/:id',Ticket.getTicketThroughMail)


//foodBooking
router.post('/addFoodBooking',foodBooking.addFoodBooking)
router.post('/viewAllFoodBookings',foodBooking.viewAllFoodBookings)
router.post('/viewFoodBookingById/:id',foodBooking.viewFoodBookingById)
router.post('/viewFoodBookingByUserId/:id',foodBooking.viewFoodBookingByUserId)
router.post('/viewFoodBookingByTicketId/:id',foodBooking.viewFoodBookingByTicketId)
router.post('/deleteFoodBookingById/:id',foodBooking.deleteFoodBookingById)
router.post('/confirmDelivery/:id',foodBooking.confirmDelivery)


// parking
router.post('/addParking',parking.addParking)
router.post('/viewAllParking',parking.viewAllParking)
router.post('/viewParkingById/:id',parking.viewParkingById)
router.post('/viewParkingByTicketId/:id',parking.viewParkingByTicketId)

// queue
router.post('/addQueue',queue.addQueue)
router.post('/viewAllQueues',queue.viewAllQueues)
router.post('/viewQueueById/:id',queue.viewQueueById)
router.post('/deleteQueueById/:id',queue.deleteQueueById)
router.post('/viewQueueByShowId',queue.viewQueueByShowId)
router.post('/viewQueueByMovieId',queue.viewQueueByMovieId)
router.post('/viewQueueByUserId',queue.viewQueueByUserId)
router.post('/confirmBooking/:id',queue.confirmBooking)
router.post('/cancelBooking/:id',queue.cancelBooking)

//feedback
router.post('/addFeedback',feedback.addFeedback)
router.post('/viewAllFeedbacks',feedback.viewAllFeedbacks)


module.exports = router;