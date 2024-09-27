const mongoose = require('mongoose');

// time table schema
const timeTableSchema = new mongoose.Schema({
    day:{
        type: String,
    },
    type:{
        type: String,
    },
    time:{
        type: String,
    },
})

// course schema
const courseSchema = new mongoose.Schema({
    courseNumber: {
        type: String,
        required: true,
        unique: true,
      },
      courseCredits: {
        type: Number,
        required: true,
      },
      courseInstructor: {
        type: String,
        required: true,
      },
      courseName: {
        type: String,
        required: true,
      },
      courseDescription: {
        type: String,
        required: true,
      },
      courseL: {
        type: String,
      },
      courseT: {
        type: String,
      },
      courseP: {
        type: String,
      },
      courseTimeTable: [timeTableSchema],
})

exports.course = mongoose.model('course',courseSchema);


// file modules
const fileSchema = new mongoose.Schema({
  fileName : String,
  link: String,
  date: String,
})
const uploadSchema = new mongoose.Schema({
    courseNumber : String,
    files: [fileSchema],
})

exports.File = mongoose.model('File',uploadSchema);


// signup schema
const userSchema = new mongoose.Schema({
  userName:{ 
    type: String,
    required: true,
  },
  userRollNumber:{
    type: Number,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true,
    },
})

exports.User = mongoose.model('User',userSchema);

// review model
const userReviewSchema = new mongoose.Schema({
  userEmail: String,
  userName: String,
  userReview: String,
  userRating: Number,
})

const reviewSchema = new mongoose.Schema({
  courseNumber:String,
  userReview : [userReviewSchema],
})

exports.Review = mongoose.model('Review',reviewSchema);





