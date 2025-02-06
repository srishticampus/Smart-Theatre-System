const feedbackController=require("../models/feedbackModel")

const addFeedback = async (req, res) => {
    try {
        const { rating, comment, userId } = req.body;

        const newFeedback = new feedbackController({
            rating,
            comment,
            userId,
            date:new Date()
        });
        console.log(req.body.foodItems);
        
        await newFeedback.save();
        return res.status(200).json({
            status: 200,
            msg: "Feedback added successfully!",
            data: newFeedback,
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

const viewAllFeedbacks=((req,res)=>{
    feedbackController.find()
    .populate("userId")
    .then((result)=>{
        res.json({
            status:200,
            msg:"find Successfully",
            data:result
        })
    })
    .catch((err)=>{
        console.log(err);
        
    })
})

module.exports={addFeedback,viewAllFeedbacks}