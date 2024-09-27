import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './User.css';

const User = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userRollNumber, setUserRollNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [signIn, setSignIn] = useState(true);

    const toggle = () => {
        signIn ? setSignIn(false) : setSignIn(true);
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        const data = {
            userEmail,
            userPassword
        }

        const response = await axios.post("http://127.0.0.1:3000/signin", data, {
            withCredentials: true,
        });
        console.log(response);
        if (response.status === 200) {
            navigate("/");
        }
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const data = {
            userName,
            userRollNumber,
            userEmail,
            userPassword
        }

        const response = await axios.post("http://127.0.0.1:3000/signup", data);
        console.log(response);
        if (response.status === 201) {
            toggle();
        }
    }

    return (
        <div className="user-box">
            <form onSubmit={signIn ? handleSignIn : handleSignUp}>
                {!signIn &&
                    <div className="input-container">
                        <input 
                            type="text" 
                            name="userName" 
                            id="user-name" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            placeholder="Full Name" 
                        />
                        <label htmlFor="user-name">Full Name</label>
                    </div>
                }

                {!signIn &&
                    <div className="input-container">
                        <input 
                            type="number" 
                            name="userRollNumber" 
                            id="user-roll-number" 
                            value={userRollNumber} 
                            onChange={(e) => setUserRollNumber(e.target.value)} 
                            placeholder="Roll Number" 
                        />
                        <label htmlFor="user-roll-number">Roll Number</label>
                    </div>
                }
                
                <div className="input-container">
                    <input 
                        type="email" 
                        name="userEmail" 
                        id="user-email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        placeholder="Email Address" 
                    />
                    <label htmlFor="user-email">Email Address</label>
                </div>

                <div className="input-container">
                    <input 
                        type="password" 
                        name="userPassword" 
                        id="user-password" 
                        value={userPassword} 
                        onChange={(e) => setUserPassword(e.target.value)} 
                        placeholder="Password" 
                    />
                    <label htmlFor="user-password">Password</label>
                </div>

                {signIn ? (
                    <button type="submit">Sign In</button>
                ) : (
                    <button type="submit">Sign Up</button>
                )}
            </form>
            {signIn ? (
                <>
                    <p>Don't have an account?</p>
                    <button onClick={toggle}>Create One</button>
                </>
            ) : (
                <>
                    <p>Account Exist?</p>
                    <button onClick={toggle}>Sign In</button>
                </>
            )}
        </div>
    );
}

export default User;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import './User.css'

// const User = () => {
//     const navigate = useNavigate();
//     const [userName,setUserName] = useState("");
//     const [userRollNumber,setUserRollNumber] = useState("");
//     const [userEmail,setUserEmail] = useState("");
//     const [userPassword,setUserPassword] = useState("");
//     const [signIn, setSignIn] = useState(true);

//     const toggle = () => {
//         signIn ? setSignIn(false) : setSignIn(true);
//     }

//     const handleSignIn = async (event) => {
//         event.preventDefault();
//         const data = {
//             userEmail,
//             userPassword
//         }


//         const response = await axios.post("http://127.0.0.1:3000/signin",data,{
//             withCredentials: true,
//         });
//         console.log(response);
//         if(response.status == 200){
//             navigate("/");
//         }
//     }

//     const handleSignUp = async (event) => {
//         event.preventDefault();
//         const data = {
//             userName,
//             userRollNumber,
//             userEmail,
//             userPassword
//         }

//         const response = await axios.post("http://127.0.0.1:3000/signup",data);
//         console.log(response);
//         if(response.status == 201){
//             toggle();
//         }
//     }

//     return (
//         <div className="user-box">
//             <form onSubmit={signIn? handleSignIn : handleSignUp}>
//             {
//                 !signIn && 
//                 <div>
//                     <label htmlFor="user-name">Full Name</label>
//                     <input type="text" name="userName" id="user-name" value={userName} onChange={(e) => setUserName(e.target.value)} />
//                 </div>
//             }

//             {
//                 !signIn && 
//                 <div>
//                     <label htmlFor="user-roll-number">Roll Number</label>
//                     <input type="number" name="userRollNumber" id="user-roll-number" value={userRollNumber} onChange={(e) => setUserRollNumber(e.target.value)} />
//                 </div>
//             }
            
//             <div>
//                 <label htmlFor="user-email">Email Address</label>
//                 <input type="email" name="userEmail" id="user-email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
//             </div>

//             <div>
//                 <label htmlFor="user-password">Password</label>
//                 <input type="password" name="userPassword" id="user-password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
//             </div>

//             {
//                 signIn ? (
//                     <button  type="submit">SingIn</button>
//                 ) : (
//                     <button type="submit">SingnUP</button>
//                 )
//             }
//             </form>
//             {
//                 signIn ? (
//                     <>
//                     <p>Don't have an accout </p> 
//                     <button onClick={toggle}>Create One</button>
//                     </>
//                 ) :
//                 (   
//                     <>
//                     <p>Account Exist ?</p>
//                     <button onClick={toggle}>SingIn</button>
//                     </>
//                 )
//             }
//         </div>
//     )
// }

// export default User;