import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Course.css'
const Course = ()=>{
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [courseMaterial, setCourseMaterial] = useState(null);
    const [courseReview, setCourseReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        userReview: '',
        userRating: ''
    });

    useEffect(()=>{
        const getCourse = async () =>{
            const response = await axios.get(`http://127.0.0.1:3000/course/${id}`, {
                withCredentials: true
            });
            console.log(response);
            setCourse(response.data.courseContent);
            setCourseMaterial(response.data.courseMaterial);
            setCourseReview(response.data.courseReview);
            setLoading(false);
            console.log(courseReview);
        }
        getCourse();
    },[id])

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;

    // setting title and favicon corresponding to course number
    document.title = course.courseNumber;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        const dataSubmit = {...formData, courseNumber: id};
        console.log(dataSubmit);
        try {
            const response = await axios.post('http://127.0.0.1:3000/add/review/',dataSubmit,{
                withCredentials: true
            })
            console.log(response.data);
            setFormData({
                userReview: '',
                userRating: ''
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <div className="courseInfo">
            <h2>{course.courseNumber}</h2>
            <p>Credits - {course.courseCredits}</p>
            <p>Instructor - {course.courseInstructor}</p>
            <h3>{course.courseName}</h3>
            <p>{course.courseDescription}</p>

            <h3>Time ⌚</h3>
            <p>L - {course.courseL} T - {course.courseT} P - {course.courseP}</p>
            
            {
                course.courseTimeTable.map((item) =>{
                    return <p>{item.day} {item.time} ({item.type})</p>;
                })
            }
            <h3>Course Material 📚</h3>
            {
                courseMaterial == null && <p>No Course Material</p>
            }
            {/* <ul>
            {
                courseMaterial?.files.map((item, index) => {
                    console.log(item);
                    return <li key={index}>{item.fileName} <a href={item.link} target="_blank">View</a> {item.date}</li>
                })
            }
            </ul> */}

            {
                courseMaterial && 
                <table className="course-material">
                    <thead>
                    <tr>
                        <th>File Name</th>
                        <th>View/Download</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                       courseMaterial?.files.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.fileName}</td>  
                            <td><a href={item.link} target="_blank">View</a></td>
                            <td>{item.date}</td>
                            </tr>
                    }) 
                    }
                    </tbody>
                </table>
            }

            <div className="course-review">
                <h3>Review 💬</h3>
                <div className="create-review">
                    <form onSubmit={handleReviewSubmit}>
                        <div className="input-rating">
                            <label htmlFor="courseRating">Rate(1-5) </label>
                            <input type="number" name="userRating" id="course-rating" min="1" max="5" required value={formData.userRating} onChange={handleChange}/>  
                        </div>

                        <div className="input-review">
                            <textarea name="userReview" id="course-review" required value={formData.userReview} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className="review-submit">Submit Review</button>
                    </form>
                </div>

                <div className="show-review">
                <h3>User's Review</h3>
                    {
                        courseReview == null && <p>No Review available , you can write one</p>
                    }
                    {
                        courseReview?.map((item, index) => {
                            return <div className="user-review" key={index}>
                                {console.log(item)}
                                <h4>{item.userName}</h4>
                                <p>{item.userRating} ⭐</p>
                                <p>{item.userReview}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Course;