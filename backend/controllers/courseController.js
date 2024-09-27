const model = require('../models/courseModel');
const course = model.course;
const File = model.File;
const Review = model.Review;

// gets all course
exports.allCourse = async (req,res) => {
    const allCourse = await course.find();
    res.send(allCourse);
}

// add new course
exports.addCourse = async(req,res) =>{
    const {courseInfo,courseTimeTable} = req.body;

    const newCourse = new course({
        courseNumber: courseInfo.courseNumber,
        courseCredits: courseInfo.courseCredits,
        courseInstructor: courseInfo.courseInstructor,
        courseName: courseInfo.courseName,
        courseDescription: courseInfo.courseDescription,
        courseL: courseInfo.courseL,
        courseP: courseInfo.courseP,
        courseT: courseInfo.courseT,
        courseTimeTable: courseTimeTable,
    })
    try {
        await newCourse.save();
        res.status(200).json({"message": "data submitted successfully"});
    } catch (error) {
        res.status(401).json({"message": "error in saving data"})
    }
}

// get a particular course
exports.getCourse = async (req,res)=>{
    const id = req.params.id;   // course number
    const courseContent = await course.findOne({courseNumber:id});
    const courseMaterial = await File.findOne({courseNumber:id});
    const courseReview = await Review.findOne({courseNumber:id});
    res.status(200).json(
    {
        courseContent: courseContent, 
        courseMaterial: courseMaterial, 
        courseReview: courseReview ? courseReview.userReview : null
    });
}

