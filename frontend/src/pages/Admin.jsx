import { useState } from "react";
import axios from "axios";
import CourseMaterial from "./CourseMaterial";
import "./Admin.css";

function Admin(){
    const [formData,setFormData] = useState({
        courseNumber: "",
        courseCredits: "",
        courseInstructor: "",
        courseName: "",
        courseDescription: "",
        courseL: "",
        courseP: "",
        courseT: ""
    })
    const [timeTable,setTimeTable] = useState([{"day":" ","time":" ","type": " "}]);    
    
    // sets the title
    document.title = "Add Course";

    const handleChange = (event) =>{
        setFormData((prev) =>{
            return {...prev,[event.target.name]:event.target.value}
        })
    }

    const addTimeTable = (event)=>{
        event.preventDefault();
        setTimeTable((prev)=>{
            return [...prev,{"day":" ","time":" ","type": " "}]
        })
    }

    const cancelTimeTable = (event,index)=>{
        event.preventDefault();
        setTimeTable((prev)=>{
            const newTimeTable = [...prev];
            newTimeTable.splice(index,1);
            return newTimeTable;
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log({courseInfo:formData,courseTimeTable:timeTable});
        const courseData = {courseInfo:formData,courseTimeTable:timeTable};
        try {
            const response = await axios.post("http://127.0.0.1:3000/add-course",courseData);
            console.log(response.data);
            alert("submitted successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="add-course-div">
            <form onSubmit={handleSubmit} className="add-course">
                <h2>Admin</h2>

                <div className="course-number"> 
                    <input type="text" name="courseNumber" id="course-number " placeholder="Course number" value={formData.courseNumber} onChange={handleChange}></input> 
                </div>

                <div className="course-credits">    
                    <label htmlFor="courseCredits">Credits - </label>     
                    <input type="number" name="courseCredits" id="course-credits" value={formData.courseCredits} onChange={handleChange}/>                   
                </div>

                <div className="course-instructor"> 
                    <label htmlFor="courseInstructor">Instructor - </label>      
                    <input type="text" name="courseInstructor" id="course-instructor" value={formData.courseInstructor} onChange={handleChange}/>
                </div>

                <div className="course-name">   
                    {/* <label htmlFor="courseName">Course Name</label>         */}
                    <input type="text" name="courseName" id="course-name" placeholder="Course Name" value={formData.courseName} onChange={handleChange}/>
                </div>

                <div className="course-description"> 
                <textarea name="courseDescription" id="course-description" placeholder="Course Description" value={formData.courseDescription} onChange={handleChange}></textarea> 
                </div>
                    
                <div className="course-time">  
                    <h4>Time</h4>
                    
                    <label htmlFor="courseL">L - </label>
                    <input type="text" name="courseL" id="course-l" value={formData.courseL} onChange={handleChange}/>

                    <label htmlFor="courseT">T - </label>
                    <input type="text" name="courseT" id="course-t" value={formData.courseT} onChange={handleChange}/>

                    <label htmlFor="courseP">P - </label>
                    <input type="text" name="courseP" id="course-p" value={formData.courseP} onChange={handleChange}/>
                </div>

                <div className="course-timeTable">
                    {timeTable.map((item,index)=>{
                        return <div key={index}>
                            <select name="course-day" id="course-day"  value={item.day} onChange={(event)=>{
                                setTimeTable((prev) => {
                                    const newTimeTable = [...prev];
                                    newTimeTable[index] = {...newTimeTable[index],"day":event.target.value};
                                    return newTimeTable;
                                })
                            }}>
                                <option value="Day">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sonday</option>
                            </select>

                            <select name="course-type" id="course-type" value={item.type} onChange={(event)=>{
                                setTimeTable((prev) => {
                                    const newTimeTable = [...prev];
                                    newTimeTable[index] = {...newTimeTable[index],"type":event.target.value};
                                    return newTimeTable;
                                })
                            }}>
                                <option value="type">Select Type</option>
                                <option value="L">L</option>
                                <option value="T">T</option>
                                <option value="P">P</option>
                            </select>

                            <select name="course-time" id="course-time" value={item.time} onChange={(event)=>{
                                setTimeTable((prev) => {
                                    const newTimeTable = [...prev];
                                    newTimeTable[index] = {...newTimeTable[index],"time":event.target.value};
                                    return newTimeTable;
                                })
                            }}>
                                <option value="type">Select Time</option>
                                <option value="08:30 - 09:25">08:30 - 09:25</option>
                                <option value="09:30 - 10:25">09:30 - 10:25</option>
                                <option value="10:30 - 11:25">10:30 - 11:25</option>
                                <option value="11:30 - 12:25">11:30 - 12:25</option>
                                <option value="12:30 - 01:25">12:30 - 01:25</option>
                                <option value="01:30 - 02:25">01:30 - 02:25</option>
                                <option value="02:30 - 03:25">02:30 - 03:25</option>
                                <option value="03:30 - 04:25">03:30 - 04:25</option>
                                <option value="04:30 - 05:25">04:30 - 05:25</option>
                            </select>
                            <button type="button" className="cancel-timeTable" onClick={(event)=>{cancelTimeTable(event,index)}}>Cancel</button>
                        </div>
                    })}
                    <button type="button" className="add-timeTable" onClick={addTimeTable}>Add</button>
                </div>

                <button type="submit" className="add-course-btn">Add Course</button>
            </form>

            <CourseMaterial courseNumber = {formData.courseNumber}/>
        </div>
    )
}

export default Admin;