const model = require("../models/courseModel");
const User = model.User;

exports.profile = async (req, res) => {
    const {userEmail}= req.user;
    const {userName, userRollNumber} = await User.findOne({"userEmail": userEmail});

    const userProfile = {userName, userRollNumber, userEmail}
    res.status(200).json(userProfile);
}