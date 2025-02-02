const Ticket = require("../models/ticketModel");
const Parking= require("../models/parkingModel");

// Add a new ticket
const addTicket = async (req, res) => {
    try {
        const { userId, movieId, screenId, showId, seatNumber, paymentStatus, status, bookingDate, movieDate, amount } = req.body;

        const newTicket = new Ticket({
            userId,
            movieId,
            screenId, 
            showId,
            seatNumber,
            paymentStatus,
            status,
            bookingDate,
            movieDate,
            amount
        });

        await newTicket.save();
        return res.status(200).json({
            status: 200,
            msg: "Ticket added successfully!",
            data: newTicket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to add ticket.",
            error: error.message,
        });
    }
};

// Edit a ticket by ID
const editTicketById = async (req, res) => {
    const ticketId = req.params.id;
    const { userId, movieId, screenId, showId, seatNumber, paymentStatus, status, bookingDate, movieDate } = req.body;

    try {
        const existingTicket = await Ticket.findById(ticketId);
        if (!existingTicket) {
            return res.status(404).json({
                status: 404,
                msg: "Ticket not found!",
                data: null,
            });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                userId,
                movieId,
                screenId,
                showId,
                seatNumber,
                paymentStatus,
                status,
                bookingDate,
                movieDate,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            msg: "Ticket updated successfully!",
            data: updatedTicket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to update ticket.",
            error: error.message,
        });
    }
};

// Delete a ticket by ID
// const deleteTicketById = async (req, res) => {
//     const ticketId = req.params.id;

//     try {
//         const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

//         if (!deletedTicket) {
//             return res.status(404).json({
//                 status: 404,
//                 msg: "Ticket not found!",
//                 data: null,
//             });
//         }

//         return res.status(200).json({
//             status: 200,
//             msg: "Ticket deleted successfully!",
//             data: deletedTicket,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: 500,
//             msg: "Failed to delete ticket.",
//             error: error.message,
//         });
//     }
// };



const deleteTicketById = async (req, res) => {
    const ticketId = req.params.id;

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return res.status(404).json({
                status: 404,
                msg: "Ticket not found!",
                data: null,
            });
        }
        const deletedParking = await Parking.findOneAndDelete({ ticketId });

        return res.status(200).json({
            status: 200,
            msg: "Ticket deleted successfully!",
            ticketData: deletedTicket,
            parkingData: deletedParking || "No associated parking found",
        });
    }  catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to delete ticket and parking.",
            error: error.message,
        });
    }
      
};


// View a ticket by ID
const viewTicketById = async (req, res) => {
    const ticketId = req.params.id;

    try {
        const ticket = await Ticket.findById(ticketId).populate('userId movieId screenId showId');

        if (!ticket) {
            return res.status(404).json({
                status: 404,
                msg: "Ticket not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Ticket fetched successfully!",
            data: ticket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch ticket.",
            error: error.message,
        });
    }
};


const viewTicketsByUserId = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
        
    try {
        const ticket = await Ticket.find({userId:userId})
        .populate('movieId screenId showId')
        .sort({createdAt:-1})

        if (!ticket) {
            return res.status(404).json({
                status: 404,
                msg: "Ticket not found!",
                data: null,
            });
        }
        console.log(ticket);

        return res.status(200).json({
            status: 200,
            msg: "Ticket fetched successfully!",
            data: ticket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch ticket.",
            error: error.message,
        });
    }
};
// View all tickets
const viewAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('userId movieId screenId showId');

        return res.status(200).json({
            status: 200,
            msg: "Tickets fetched successfully!",
            data: tickets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch tickets.",
            error: error.message,
        });
    }
};





const getBookedSeats = async (req, res) => {
    console.log('req',req.body);
    
    try {
        const { screenId, showId } = req.body; 
        
        if (!screenId || !showId) {
            return res.status(400).json({
                status: 400,
                msg: "screenId and showId are required.",
            });
        }

        const tickets = await Ticket.find({ screenId, showId });

        const bookedSeats = tickets.map(ticket => ticket.seatNumber); 

        return res.status(200).json({
            status: 200,    
            msg: "Booked seats get successfully!",
            data: {
                screenId,
                showId,
                bookedSeats,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to get booked seats.",
            error: error.message,
        });
    }
};


module.exports = {
    addTicket,
    editTicketById,
    deleteTicketById,
    viewTicketById,
    viewTicketsByUserId,
    viewAllTickets,
    getBookedSeats
};
