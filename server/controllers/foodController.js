const Food = require('../models/foodModel'); // Import food model
const multer = require('multer');

// Set up multer storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './upload'); // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'food-';
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
        cb(null, filename); // Save the file with a unique name
    },
});

// Set up multer for single file upload
const uploadSingle = multer({ storage: storage }).single('image');

// Register Food
const registerFood = async (req, res) => {
    try {
        const { foodItem, category, type, amount } = req.body;

   const exFood=await Food.findOne({foodItem:foodItem})

        const newFood = new Food({
            foodItem,
            category,
            type,
            amount,
            image: req.file,
        });

        if(exFood){
            return res.status(409).json({
                msg: "Food Already Added",
            })
        }
        await newFood.save();

        return res.status(200).json({
            msg: "Food added successfully",
            data: newFood
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding food item" });
    }
};

// View all food items
const viewAllFood = (req, res) => {
    Food.find({})
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "No data obtained", Error: err });
        });
};
// View all food items
const viewFoodByCategory = (req, res) => {
    Food.find({})
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "No data obtained", Error: err });
        });
};
// View food item by ID
const viewFoodById = (req, res) => {
    Food.findById(req.params.id)
        .exec()
        .then(data => {
            if (!data) {
                return res.status(404).json({ msg: "Food not found" });
            }
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "Error fetching data", Error: err });
        });
};

// Update food item by ID
const editFoodById = async (req, res) => {
    const { foodItem, category, type, amount } = req.body;
    const foodId = req.params.id;

    try {
        const existingFood = await Food.findById(foodId);
        if (!existingFood) {
            return res.status(404).json({ msg: "Food not found" });
        }

        const updatedFood = await Food.findByIdAndUpdate(foodId, {
            foodItem,
            category,
            type,
            amount,
            image: req.file,
        }, { new: true });

        return res.status(200).json({ msg: "Food updated successfully", data: updatedFood });
    } catch (err) {
        res.status(500).json({ msg: "Data not updated", Error: err });
    }
};

// Delete food item by ID
const deleteFoodById = (req, res) => {
    Food.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Food item removed successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "Error deleting food item", Error: err });
        });
};

module.exports = {
    registerFood,
    uploadSingle,
    viewAllFood,
    viewFoodById,
    editFoodById,
    deleteFoodById,
};
