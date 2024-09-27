import { useState } from "react";
import axios from "axios";
import './CourseMaterial.css'

const CourseMaterial = ({courseNumber}) =>{
    const [files,setFiles] = useState([]);
    
    const handleFileChange = (event) =>{
        // console.log(event.target.files.lastModifiedDate)
        setFiles([...event.target.files]);
    }

    const handleFileSubmit = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        files.forEach((file,index)=>{
            formData.append(`files`,file);
        })
        
        // adding courseNumber
        formData.append("courseNumber", courseNumber);

        // files to upload
        console.log("Files:", files);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        try {
            const response = await axios.post("http://127.0.0.1:3000/upload/course-material",formData,
                {
                    headers:{
                    "content-type": "multipart/form-data"
                    }
                }
            )
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div>
            <form onSubmit={handleFileSubmit} className="add-course-material">
                <h3>Course Material</h3>
                {/* <label htmlFor="file" className="file-label">Choose Files</label> */}
                <input type="file" name="files" id="file-input" multiple onChange={handleFileChange} />
                <ol>
                    {
                        files.map((item, index) => {
                            return <li key={index}>{item.name} - {item.type}</li>
                        })
                    }
                </ol>
                <button type="submit" className="add-files">Add Files</button>
            </form>
        </div>
    )
}

export default CourseMaterial;