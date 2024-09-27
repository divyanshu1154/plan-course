import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Home.css'
const Home = () =>{
    const navigate = useNavigate();
    const [allCourse, setAllCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchCourse, setSearchCourse] = useState("");

    useEffect(() => {
        const getAllCourse = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/");
                setAllCourse(response.data);
                console.log(response);
                setLoading(false);   
            } catch (error) {
                setError(error);
            }
        }
        getAllCourse();
    }, [])

    if (loading) return <p>Loading ...</p>;
    if(error) return <p>error</p>;

    const handleChange = (event) => {
        setSearchCourse(event.target.value);
    }

    const filterCourse = allCourse.filter((item) => 
        item.courseNumber.toLowerCase().includes(searchCourse.trim().toLowerCase()) ||
        item.courseCredits.toString().toLowerCase().includes(searchCourse.trim().toLowerCase()) ||
        item.courseInstructor.toLowerCase().includes(searchCourse.trim().toLowerCase()) ||
        item.courseName.toLowerCase().includes(searchCourse.trim().toLowerCase()) 
    )

    return(
        <div className="all-courses">

            <div className="search-box">
                <input type="text" name="searchCourse" id="search-course" placeholder="Search Course ..." value={searchCourse} onChange={handleChange} />
            </div>
            <div className="course-box">
                {
                    filterCourse.map((item,index) =>{
                        return (
                            <div key={index} className="each-course" onClick={() => {navigate(`/course/${item.courseNumber}`)}}>
                                {/* <Link to={`/course/${item.courseNumber}`}><h4>{item.courseNumber}</h4></Link> */}
                                <h4>🌟{item.courseNumber}</h4>
                                <p>⌚ {item.courseCredits} Credits</p>
                                <p>🧑‍🏫 {item.courseInstructor}</p>
                                <p>📝 {item.courseName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;