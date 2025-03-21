const User = require('../models/userModel'); 
const multer = require("multer");
const nodemailer =require("nodemailer")
const Configue=require("../Configue")

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'prefix-';
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
        cb(null, filename);
    },
});



  //Mail configuration of resetpswd
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'supprot.web.application@gmail.com',
      pass: 'ukyw olqq kuql jnty'
    }
  });

  const testMail = (data) => {
    let email=data.email
    const mailOptions = {
      from: 'supprot.web.application@gmail.com',
      to: email,
      subject: 'Reset Password From Maxus Cinemas',
      text: `Dear ${data.name},${'\n'}please check this link : ${Configue.localUrl}${data._id} to reset your password`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }



const uploadSingle = multer({ storage: storage }).single('profilePic');
const registerUser = async (req, res) => {
    try {
        const { email, contact, password,name } = req.body;

        const newUser = new User({
            email,
            contact,
            password,
            profilePic: req.file, 
            name
        });

        // Check for existing users
        let existingUser = await User.findOne({ contact });
        if (existingUser) {
            return res.status(409).json({
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }

        existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        
       

        await newUser.save();
        return res.status(200).json({
            msg: "Inserted successfully",
            data: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// Update User by ID
const editUserById = async (req, res) => {
    const { email, contact ,name} = req.body;
    const userId = req.params.id;
console.log("here");

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                msg: "User not found",
                data: null
            });
        }
console.log(userId);

        const duplicateContact = await User.findOne({ contact });
        if (duplicateContact && duplicateContact._id.toString() !== userId) {
            return res.status(409).json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            email,
            contact,
            name,
            profilePic: req.file, // Optionally update profilePic if provided
        }, { new: true });

        return res.json({
            status: 200,
            msg: "Updated successfully",
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Data not Updated",
            Error: err
        });
    }
};

// View User by ID
const viewUserById = (req, res) => {
    User.findById(req.params.id)
        .exec()
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    status: 404,
                    msg: "User not found",
                });
            }
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Error fetching data",
                Error: err
            });
        });
};

// View all active Users
const viewAllUsers = (req, res) => {
    User.find({ })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};


// Login User
const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
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

// Delete Organizer by ID
const deleteUserById = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};


// Accept Organizer by ID
const approveUserById = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Accept Organizer by ID
const activateUserById = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Accept Organizer by ID
const deActivateUserById = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
// Reject Organizer by ID
const rejectUserById = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
// Forgot Password for Organizer
const forgotPassword = (req, res) => {
   
    User.findOneAndUpdate({ email: req.body.email }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
                });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};

// Reset Password for Organizer
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await User.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            return res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await User.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.password
        })
            .exec()
            .then(data => {
                if (data != null)
                    return res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    return res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        return res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};


//Reset pswd send mail

const forgotPWDsentMail = async (req, res) => {
    try {
      let data = await User.findOne({ email: req.body.email });
  
      console.log(req.body);
  
      if (data === null) {
        return res.json({
          status: 404,
          msg: "No user found",
        });
      }
  
      // Send email if user exists
      let id = data._id.toString();
      await testMail(data); // Ensure mail is sent before response
  
      return res.json({
        status: 200,
        msg: "Password reset email sent successfully",
      });
  
    } catch (err) {
      console.error("Error in forgotPWDsentMail:", err);
      return res.json({
        status: 500,
        msg: "Internal Server Error",
        error: err.message,
      });
    }
  };
  
//Reset pswd after mail

const resetPswdaftermail = (req, res) => {
   
    User.findByIdAndUpdate({ _id: req.params.id }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
                });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};


module.exports = {
    registerUser,
    uploadSingle,
    viewUserById,
    login,
    editUserById,
    deleteUserById,
    viewAllUsers,
        resetPassword,
    forgotPassword,
    activateUserById,
    approveUserById,
    deActivateUserById,
    rejectUserById,
    forgotPWDsentMail,
    resetPswdaftermail
};
