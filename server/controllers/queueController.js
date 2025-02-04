const Queue = require("../models/queueBooking");
// const Queue = require("../models/queueModel");

// Add a new queue entry
const addQueue = async (req, res) => {
    try {
        const { movieId, screenId, showId, userId, date, paymentStatus,seatCount } = req.body;

        const newQueue = new Queue({
            movieId,
            screenId,
            showId,
            userId,
            date,
            paymentStatus,
            seatCount
        });

        await newQueue.save();
        return res.status(200).json({
            status: 200,
            msg: "Queue entry added successfully!",
            data: newQueue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to add queue entry.",
            error: error.message,
        });
    }
};

// Edit a queue entry by ID
const editQueueById = async (req, res) => {
    const queueId = req.params.id;
    const { movieId, screenId, showId, userId, date, paymentStatus } = req.body;

    try {
        const existingQueue = await Queue.findById(queueId);
        if (!existingQueue) {
            return res.status(404).json({
                status: 404,
                msg: "Queue entry not found!",
                data: null,
            });
        }

        const updatedQueue = await Queue.findByIdAndUpdate(
            queueId,
            {
                movieId,
                screenId,
                showId,
                userId,
                date,
                paymentStatus,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            msg: "Queue entry updated successfully!",
            data: updatedQueue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to update queue entry.",
            error: error.message,
        });
    }
};

// Delete a queue entry by ID
const deleteQueueById = async (req, res) => {
    const queueId = req.params.id;

    try {
        const deletedQueue = await Queue.findByIdAndDelete(queueId);

        if (!deletedQueue) {
            return res.status(404).json({
                status: 404,
                msg: "Queue entry not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Queue entry deleted successfully!",
            data: deletedQueue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to delete queue entry.",
            error: error.message,
        });
    }
};

// View a queue entry by ID
const viewQueueById = async (req, res) => {
    const queueId = req.params.id;

    try {
        const queue = await Queue.findById(queueId)
            .populate("movieId screenId showId userId");

        if (!queue) {
            return res.status(404).json({
                status: 404,
                msg: "Queue entry not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Queue entry fetched successfully!",
            data: queue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch queue entry.",
            error: error.message,
        });
    }
};

// View all queue entries
const viewAllQueues = async (req, res) => {
    try {
        const queues = await Queue.find().populate("movieId screenId showId userId");

        return res.status(200).json({
            status: 200,
            msg: "Queue entries fetched successfully!",
            data: queues,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch queue entries.",
            error: error.message,
        });
    }
};

//view queue by show id
const viewQueueByShowId = async (req, res) => {
    const showId = req.body.id;

    try {
        const queue = await Queue.find(showId)
            // .populate("movieId screenId showId userId");

        if (!queue) {
            return res.status(404).json({
                status: 404,
                msg: "Queue entry not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Queue entry fetched successfully!",
            data: queue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch queue entry.",
            error: error.message,
        });
    }
};

const viewQueueByMovieId = async (req, res) => {
    const movieId = req.body.id;

    try {
        const queue = await Queue.find(movieId)
            // .populate("movieId screenId showId userId");

        if (!queue) {
            return res.status(404).json({
                status: 404,
                msg: "Queue entry not found!",
                data: null,
            });
        }

        return res.status(200).json({
            status: 200,
            msg: "Queue entry fetched successfully!",
            data: queue,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: "Failed to fetch queue entry.",
            error: error.message,
        });
    }
};



module.exports = {
    addQueue,
    editQueueById,
    deleteQueueById,
    viewQueueById,
    viewAllQueues,
    viewQueueByShowId,
    viewQueueByMovieId
};
