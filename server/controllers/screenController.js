const Screen = require("../models/screenModel");

// Add a new screen
const addScreen = async (req, res) => {
    try {
        const { screenSize, screenName, screenFormat, gold,platinum,silver } = req.body;
console.log(req.body);

        const existingScreen = await Screen.findOne({ screenName });
        if (existingScreen) {
            return res.status(409).json({
              status:409,
                msg: "Screen name already exists!",
                data: null,
            });
        }

        const newScreen = new Screen({
            screenSize,
            screenName,
            screenFormat,
            gold,platinum,silver,
        });

        await newScreen.save();
        return res.status(200).json({
          status:200,
            msg: "Screen added successfully!",
            data: newScreen,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          status:500,
            msg: "Failed to add screen.",
            error: error.message,
        });
    }
};

// Edit a screen by ID
const editScreenById = async (req, res) => {
    const { screenSize, screenName, screenFormat, gold,silver,platinum } = req.body;
    const screenId = req.params.id;
console.log("req.body",req.body);

    try {
        const existingScreen = await Screen.findById(screenId);
        if (!existingScreen) {
            return res.status(404).json({
              status:404,
                msg: "Screen not found!",
                data: null,
            });
        }

        const duplicateScreen = await Screen.findOne({ screenName });
        if (duplicateScreen && duplicateScreen._id.toString() !== screenId) {
            return res.status(409).json({
              status:409,
                msg: "Screen name already exists!",
                data: null,
            });
        }

        const updatedScreen = await Screen.findByIdAndUpdate(
            screenId,
            {
                screenSize,
                screenName,
                screenFormat,
                gold,
                silver,
                platinum,
            },
            { new: true }
        );

        return res.status(200).json({
          status:200,
            msg: "Screen updated successfully!",
            data: updatedScreen,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          status:500,
            msg: "Failed to update screen.",
            error: error.message,
        });
    }
};

// Delete a screen by ID
const deleteScreenById = async (req, res) => {
    const screenId = req.params.id;

    try {
        const deletedScreen = await Screen.findByIdAndDelete(screenId);

        if (!deletedScreen) {
            return res.status(404).json({
              status:404,
                msg: "Screen not found!",
                data: null,
            });
        }

        return res.status(200).json({
          status:200,
            msg: "Screen deleted successfully!",
            data: deletedScreen,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          status:500,
            msg: "Failed to delete screen.",
            error: error.message,
        });
    }
};


// View a screen by ID
const viewScreenById = async (req, res) => {
    const screenId = req.params.id;

    try {
        const screen = await Screen.findById(screenId);

        if (!screen) {
            return res.status(404).json({
              status:500,
                msg: "Screen not found!",
                data: null,
            });
        }

        return res.status(200).json({
          status:200,
            msg: "Screen fetched successfully!",
            data: screen,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          status:500,
            msg: "Failed to fetch screen.",
            error: error.message,
        });
    }
};



// View all screens
const viewAllScreens = async (req, res) => {
    try {
        const screens = await Screen.find();

        return res.status(200).json({
          status:200,
            msg: "Screens fetched successfully!",
            data: screens,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          status:500,
            msg: "Failed to fetch screens.",
            error: error.message,
        });
    }
};

module.exports = {
    addScreen,
    editScreenById,
    deleteScreenById,
    viewScreenById,
    viewAllScreens,
};
