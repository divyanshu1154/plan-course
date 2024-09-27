import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/profile',{
                        withCredentials: true,
                    })
                console.log(response);
                if(response.status === 401){
                    navigate('/signin');
                }
                setUserProfile(response.data);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
        getProfile();
    }, [])

    const logOut = async() => {
        const response = await axios.post('http://127.0.0.1:3000/logout', {
                withCredentials: true
            });
        console.log(response);

    }

    if(loading) return <p>Loading ...</p>
    if(error) return <p>{error}</p>

    return(
        <div className="user-profile">
            <div className="user-info">
                <h3>{userProfile.userName}</h3>
                <p>{userProfile.userRollNumber}</p>
                <p>{userProfile.userEmail}</p>
            </div>
            <div className="logout">
                <button className="logout-btn" onClick={logOut}>Logout</button>
            </div>
        </div>
    )
}   

export default Profile;