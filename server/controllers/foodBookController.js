const FoodBooking = require("../models/foodBookingModel");

// Add a new food booking
const addFoodBooking = async (req, res) => {
    try {
        const { ticketId, foodId, seatLabel, userId, movieDate } = req.body;

        const newFoodBooking = new FoodBooking({
            ticketId,
            foodId,
            seatLabel,
            userId,
            movieDate,
        });

        await newFoodBooking.save();
        return res.status(200).json({
            status: 200,
            msg: "Food booking added successfully!",
            data: newFoodBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to add food booking.",
            error: error.message,
        });
    }
};

// Edit a food booking by ID
const editFoodBookingById = async (req, res) => {
    const foodBookingId = req.params.id;
    const { ticketId, foodId, seatLabel, userId, movieDate } = req.body;

    try {
        const existingFoodBooking = await FoodBooking.findById(foodBookingId);
        if (!existingFoodBooking) {
            return res.status(404).json({
                status: 404,
                msg: "Food booking not found!",
                data: null,
            });
        }

        const updatedFoodBooking = await FoodBooking.findByIdAndUpdate(
            foodBookingId,
            {
                ticketId,
                foodId,
                seatLabel,
                userId,
                movieDate,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            msg: "Food booking updated successfully!",
            data: updatedFoodBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to update food booking.",
            error: error.message,
        });
    }
};

// Delete a food booking by ID
const deleteFoodBookingById = async (req, res) => {
    const foodBookingId = req.params.id;

    try {
        const deletedFoodBooking = await FoodBooking.findByIdAndDelete(foodBookingId);

        if (!deletedFoodBooking) {
            return res.status(404).json({
                status: 404,
                msg: "Food booking not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Food booking deleted successfully!",
            data: deletedFoodBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to delete food booking.",
            error: error.message,
        });
    }
};

// View a food booking by ID
const viewFoodBookingById = async (req, res) => {
    const foodBookingId = req.params.id;

    try {
        const foodBooking = await FoodBooking.findById(foodBookingId)
            .populate('ticketId foodId seatLabel userId');

        if (!foodBooking) {
            return res.status(404).json({
                status: 404,
                msg: "Food booking not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Food booking fetched successfully!",
            data: foodBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch food booking.",
            error: error.message,
        });
    }
};
const viewFoodBookingByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const foodBooking = await FoodBooking.findBy({userId:userId})
            .populate('ticketId foodId seatLabel userId');

        if (!foodBooking) {
            return res.status(404).json({
                status: 404,
                msg: "Food booking not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Food booking fetched successfully!",
            data: foodBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch food booking.",
            error: error.message,
        });
    }
};
// View all food bookings
const viewAllFoodBookings = async (req, res) => {
    try {
        const foodBookings = await FoodBooking.find().populate('ticketId foodId seatLabel userId');

        return res.status(200).json({
            status: 200,
            msg: "Food bookings fetched successfully!",
            data: foodBookings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch food bookings.",
            error: error.message,
        });
    }
};

module.exports = {
    addFoodBooking,
    deleteFoodBookingById,
    viewFoodBookingById,
    viewAllFoodBookings,
    viewFoodBookingByUserId
};
