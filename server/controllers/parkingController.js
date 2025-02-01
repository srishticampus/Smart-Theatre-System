const Parking = require("../models/parkingModel");

// Add a new parking entry
const addParking = async (req, res) => {
    try {
        const { ticketId, slotNo, vehicleType, userId, date,amount } = req.body;

        const newParking = new Parking({
            ticketId,
            slotNo,
            vehicleType,
            userId,
            date,
            amount
        });

        await newParking.save();
        return res.status(200).json({
            status: 200,
            msg: "Parking added successfully!",
            data: newParking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to add parking.",
            error: error.message,
        });
    }
};

// Edit a parking entry by ID
const editParkingById = async (req, res) => {
    const parkingId = req.params.id;
    const { ticketId, slotNo, vehicleType, userId, date } = req.body;

    try {
        const existingParking = await Parking.findById(parkingId);
        if (!existingParking) {
            return res.status(404).json({
                status: 404,
                msg: "Parking entry not found!",
                data: null,
            });
        }

        const updatedParking = await Parking.findByIdAndUpdate(
            parkingId,
            {
                ticketId,
                slotNo,
                vehicleType,
                userId,
                date,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            msg: "Parking updated successfully!",
            data: updatedParking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to update parking.",
            error: error.message,
        });
    }
};



// Delete a parking entry by ID
const deleteParkingById = async (req, res) => {
    const parkingId = req.params.id;

    try {
        const deletedParking = await Parking.findByIdAndDelete(parkingId);

        if (!deletedParking) {
            return res.status(404).json({
                status: 404,
                msg: "Parking entry not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Parking entry deleted successfully!",
            data: deletedParking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to delete parking entry.",
            error: error.message,
        });
    }
};

// View a parking entry by ID
const viewParkingById = async (req, res) => {
    const parkingId = req.params.id;

    try {
        const parking = await Parking.findById(parkingId)
            .populate('ticketId userId');

        if (!parking) {
            return res.status(404).json({
                status: 404,
                msg: "Parking entry not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Parking entry fetched successfully!",
            data: parking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch parking entry.",
            error: error.message,
        });
    }
};

const viewParkingByTicketId = async (req, res) => {
    const ticketId = req.params.id;

    console.log('ticketid',ticketId);
    

    try {
        const parking = await Parking.findOne({ticketId:ticketId})
            .populate('ticketId')

        if (!parking) {
            return res.status(404).json({
                status: 404,
                msg: "Parking booking not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Parking booking fetched successfully!",
            data: parking,
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

// View all parking entries
const viewAllParking = async (req, res) => {
    try {
        const parkingEntries = await Parking.find()
        .populate({
            path: 'ticketId',
            populate: { path: 'showId' }, // Properly populating a nested field
        })
        .populate('userId')
        .exec();

        return res.status(200).json({
            status: 200,
            msg: "Parking entries fetched successfully!",
            data: parkingEntries,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch parking entries.",
            error: error.message,
        });
    }
};

module.exports = {
    addParking,
    editParkingById,
    deleteParkingById,
    viewParkingById,
    viewAllParking,
    viewParkingByTicketId
};
