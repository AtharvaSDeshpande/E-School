import React, { useState } from 'react'
import './Login.css'
import logo from "../../assets/images/logo.png"
import '../InputBlock.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
    const [forgot, setForgot] = useState(false);
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [passwordType, setPasswordType] = useState("password");
    const changePasswordTypeVisible = () => {
        setPasswordType("text");
        setPasswordHidden(false);
    }

    const changePasswordTypeHidden = () => {
        setPasswordType("password");
        setPasswordHidden(true);
    }

    const [{ user }, dispatch] = useStateValue();

    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({



            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')

                .required('Required'),


        }),

        onSubmit: values => {
            auth.signInWithEmailAndPassword(values.email, values.password).then((userCredential) => {
                // Signed in

                if (userCredential.user.emailVerified) {
                    console.log(userCredential.user);
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: userCredential.user,
                    });
                }

                else {
                    dispatch({
                        type: actionTypes.SET_USER,
                        user: null,
                    });
                    auth.signOut()

                    alert("Email not Verified")


                }
                // ...
            })
                .catch(alert);

        },

    });
   const [forgotEmail,setForgotEmail] = useState(null);
    const changePassword = (e) => {
        
            e.preventDefault();
            auth.sendPasswordResetEmail(forgotEmail).then(()=>{
                      alert("Change password link successfully sent to the email ID") 
                   }).catch(alert);
            setForgotEmail(null)
      
        
    }

    return (
        <div className="login">
            {!forgot ? (
                <form className="loginForm" onSubmit={formik.handleSubmit}>

                    <img className="login_img" src={logo} alt="Logo" />
                    <div className="login__header"><h1>Login</h1>or <Link to="/createaccount" className="link">Create Account</Link></div>

                    {/* Email */}
                    <div className="inputBlock">
                        <p className="inputBlock__label"><b>Email</b></p>
                        <input id="email" className="inputBlock__input inputBlock__border" type="email"   required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (<p className="extraLabel" >{formik.errors.email}</p>) : (<p className="hidden"></p>)}
                    </div>
                    {/* Password */}

                    <div className="inputBlock">
                        <p className="inputBlock__label"><b>Password</b></p>
                        <div>
                            <div className="passwordInputBox">
                                <input id="password" className="inputBlock__input inputBlock__password" type={passwordType} required

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                <div className="inputBlock__input__button" onMouseDown={changePasswordTypeVisible} onMouseUp={changePasswordTypeHidden}>
                                    {passwordHidden ? (
                                        <VisibilityOffIcon className="icon" />
                                    ) : (
                                        <VisibilityIcon className="icon" />
                                    )}
                                </div>

                            </div>
                            {formik.touched.password && formik.errors.password ? (<p className="extraLabel" >{formik.errors.password}</p>) : (<p className="hidden"></p>)}
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" variant="contained" color="secondary" className="login_submit">
                            Login
                        </button>
                        <p className="link" onClick = {()=>{setForgot(true)}}>Forgot password?</p>

                    </div>




                </form>
            ) : (<div className="login">
                <form className="loginForm" >

                    <img className="login_img" src={logo} alt="Logo" />
                    <div className="login__header"><h1>Login</h1>or <Link to="/createaccount" className="link">Create Account</Link></div>

                    {/* Email */}
                    <div className="inputBlock">
                        <p className="inputBlock__label"><b>Email</b></p>
                        <input id="email" className="inputBlock__input" type="email" value ={forgotEmail} required
                            onChange={(e) => {setForgotEmail(e.target.value)}}
                            
                        />
                        {/* {forgotFormik.touched.email && forgotFormik.errors.email ? (<p className="extraLabel" >{forgotFormik.errors.email}</p>) : (<p className="hidden"></p>)} */}
                    </div>
                   
                    <div className="buttons">
                        <button type="submit" variant="contained" color="secondary" className="login_submit" onClick = {changePassword}>
                            CHANGE PASSWORD
                        </button>
                        <p className="link" onClick = {()=>{setForgot(false)}}>Login?</p>

                    </div>




                </form>
            </div>)}

        </div>
    )
}

export default Login
