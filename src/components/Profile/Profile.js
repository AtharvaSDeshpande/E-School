import React from 'react'
import { useStateValue } from '../../StateProvider'
import Header from '../Header/Header'
import Login from '../Login/Login';
import profile from '../../assets/images/profile.png'
import './Profile.css'
import { auth } from '../../firebase';
function Profile() {
    const [{user},dispatch] = useStateValue();
    const changePassword = () => {
        auth.sendPasswordResetEmail(user.email);
        alert("Password Reset Link sent successfully of Registered Email ID")
    }

    const update = () => {

    }
    return (
        <div >
            {user?(
                <div >
                    <Header/>
                    <h1 className = "profile__left__title">My Profile</h1>
                    <div className = "profile">
                        <div className = "profile__left">
                            
                            <div className = "profile__left__field">
                                <label className = "field__label">First Name</label>
                                <input type = "text" className = "field__input" value = {user.displayName.split(' ')[0]}/>
                            </div>
                            <div className = "profile__left__field">
                                <label className = "field__label">Last Name</label>
                                <input type = "text" className = "field__input" value= {user.displayName.split(' ')[1]}/>
                            </div>
                            <div className = "profile__left__field">
                                <label className = "field__label">Email</label>
                                <input type = "email" className = "field__input disabled" value= {user.email} disabled/>
                            </div>
                           
                            <div className = "profile__left__field">
                                <label className = "field__label">Mobile</label>
                                <input type = "text" className = "field__input" value= {user?.phoneNumber} placeholder = "Enter Mobile Number(Optional)"/>
                            </div>
                           
                            <div className = "profile__left__field">
                                {/* <button type="submit" variant="contained" color = "secondary" className="profile__update" onClick = {update} >
                                    Update
                                </button> */}
                                 <label className = "field__label none">Mobile</label>
                                <button type="submit" variant="contained" color = "secondary" className="profile__update" onClick = {changePassword} >
                                    Change Passwod
                                </button>
                            </div>
                            
                        </div>
                        <div className = "profile__right">
                            <img src = {profile} alt = "logo"/>
                        </div>
                    </div>
                </div>
            ):(
                <Login/>
            )}
                    
        </div>
    )
}
export default Profile
