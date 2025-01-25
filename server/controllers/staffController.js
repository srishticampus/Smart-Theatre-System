const Staff=require('../models/staffModel')

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'staff-';
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
        cb(null, filename);
    },
});

const uploadSingle = multer({ storage: storage }).single('profilePic');

// Register Staff
const registerStaff = async (req, res) => {
    try {
        const { email, contact, password, fname, lname, role, doj, address } = req.body;

        const newStaff = new Staff({
            email,
            contact,
            address,
            password,
            fname,
            lname,
            role,
            doj,
            profilePic: req.file,
        });

        // Check for existing staff
        let existingStaff = await Staff.findOne({ contact });
        if (existingStaff) {
            return res.status(409).json({
                msg: "Contact Number Already Registered",
                data: null
            });
        }

        existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(409).json({
                msg: "Email Already Registered",
                data: null
            });
        }

        await newStaff.save();
        return res.status(200).json({
            msg: "Inserted successfully",
            data: newStaff
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update Staff by ID
const editStaffById = async (req, res) => {
    const { email, contact,fname,lname,role,doj} = req.body;
    const staffId = req.params.id;
console.log(staffId);

    try {
        const existingStaff = await Staff.findById(staffId);
        if (!existingStaff) {
            return res.status(404).json({ msg: "Staff not found" });
        }

        const duplicateContact = await Staff.findOne({ contact });
        if (duplicateContact && duplicateContact._id.toString() !== staffId) {
            return res.status(409).json({ msg: "Contact Number Already Registered" });
        }

        const updatedStaff = await Staff.findByIdAndUpdate(staffId, {
            email,
            contact,
            profilePic: req.file,
            fname,
            lname,
            role,
            doj,

        }, { new: true });
console.log(updatedStaff);

        return res.status(200).json({ msg: "Updated successfully", data: updatedStaff });
    } catch (err) {
        res.status(500).json({ msg: "Data not Updated", Error: err });
    }
};

// View Staff by ID
const viewStaffById = (req, res) => {
    Staff.findById(req.params.id)
        .exec()
        .then(data => {
            if (!data) {
                return res.status(404).json({ msg: "Staff not found" });
            }
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "Error fetching data", Error: err });
        });
};

// View all active Staff
const viewAllStaff = (req, res) => {
    Staff.find({})
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Data obtained successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "No Data obtained", Error: err });
        });
};

// Activate Staff by ID
const activateStaffById = (req, res) => {
    Staff.findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Data updated successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "No Data obtained", Error: err });
        });
};

// Deactivate Staff by ID
const deActivateStaffById = (req, res) => {
    Staff.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Data updated successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "No Data obtained", Error: err });
        });
};

// Delete Staff by ID
const deleteStaffById = (req, res) => {
    Staff.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.status(200).json({ msg: "Data removed successfully", data: data });
        })
        .catch(err => {
            res.status(500).json({ msg: "No Data obtained", Error: err });
        });
};

// Forgot Password for Staff
const forgotPassword = (req, res) => {
    Staff.findOneAndUpdate({ email: req.body.email }, { password: req.body.password })
        .exec()
        .then(data => {
            res.status(200).json(data ? { msg: "Updated successfully" } : { msg: "Staff Not Found" });
        })
        .catch(err => {
            res.status(500).json({ msg: "Data not Updated", Error: err });
        });
};

// Reset Password for Staff
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Staff.findById(req.params.id)
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            return res.status(500).json({ msg: "Data not Updated", Error: err });
        });

    if (pwdMatch) {
        await Staff.findByIdAndUpdate(req.params.id, { password: req.body.password })
            .exec()
            .then(data => {
                return res.json(data ? { msg: "Updated successfully" } : { msg: "Staff Not Found" });
            })
            .catch(err => {
                return res.status(500).json({ msg: "Data not Updated", Error: err });
            });
    } else {
        return res.status(200).json({ msg: "Old Password doesn't match" });
    }
};
const login = (req, res) => {
    const { email, password } = req.body;

    Staff.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: 'Staff not found' });
        }

        if (user.password !== password) {
            return res.status(403).json({ msg: 'Password Mismatch !!' });
        }

        
        if (!user.isActive) {
            return res.status(403).json({ msg: 'You are currently deactivated By Admin !!' });
        }

      

        res.json({
            status: 200,
            data: user,
           
        });
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ msg: 'Something went wrong' });
    });
};

module.exports = {
    registerStaff,
    uploadSingle,
    viewStaffById,
    editStaffById,
    deleteStaffById,
    viewAllStaff,
    resetPassword,
    forgotPassword,
    activateStaffById,
    deActivateStaffById,
    login
};
