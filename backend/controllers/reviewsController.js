    const model = require('../models/courseModel');
    const Review = model.Review;
    const User = model.User;

    exports.review = async (req, res) => {
        const {userEmail}= req.user;
        const {courseNumber, userRating, userReview} = req.body;

        try {
        // check review exist
        let review = await Review.findOne({"courseNumber": courseNumber});

        // if not then create one
        if(!review){
            review = new Review({
                courseNumber: courseNumber,
                userReview: []
            })
        }

        // finds user name
        const {userName} = await User.findOne({"userEmail": userEmail})

        // add review
        review.userReview.push({
            userEmail: userEmail,
            userName: userName,
            userRating: userRating,
            userReview: userReview
        })

        // save review
        await review.save();

        res.status(200).json({message:"review added succussfully"})

        } catch (error) {
            res.status(500).json({error:"Error in saving review"});
        }
    }
