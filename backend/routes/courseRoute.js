const express = require('express');
const multer = require('multer');
const router = express.Router();

// import middlewares
const middleware = require('../middleware/authMiddleware');
const authMiddleware = middleware.auth;

// import controller functions
const courseController = require('../controllers/courseController');
const uploadController = require('../controllers/uploadController');
const userController = require('../controllers/UserController');
const profileController = require('../controllers/profileController');
const reviewController = require('../controllers/reviewsController')

// get all course,  add course, get particular course
router.get('/',courseController.allCourse);
router.post('/add-course',courseController.addCourse);
// router.get('/course/:id',courseController.getCourse);

// course material upload
const upload = multer({dest:'uploads/'});
router.post('/upload/course-material',upload.array("files"),uploadController.upload);

// singin and singup
router.post('/signin',userController.signIn);
router.post('/signup',userController.signUp);
router.post('/logout',userController.logOut);

// _________________ Protected Routes below  _________________

// get profile
router.get('/profile',authMiddleware, profileController.profile);

// add review
router.post('/add/review/', authMiddleware, reviewController.review)

router.get('/course/:id', authMiddleware, courseController.getCourse);

module.exports = router;