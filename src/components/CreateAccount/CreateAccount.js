import React, { useState } from 'react'
import './CreateAccount.css'
import '../InputBlock.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { v4 as uuidv4 } from 'uuid';
import logo from "../../assets/images/logo.png"
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import db, { auth } from '../../firebase';

function CreateAccount() {
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
	const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
	const [confirmPasswordType, setConfirmPasswordType] = useState("password");
	const changeConfirmPasswordTypeVisible = () => {
		setConfirmPasswordType("text");
		setConfirmPasswordHidden(false);
	}
	const changeConfirmPasswordTypeHidden = () => {
		setConfirmPasswordType("password");
		setConfirmPasswordHidden(true);
	}
	


	const colors = ["black","red","purple","blue","violet","orange","pink","green","teal","yellow"]
	var color = colors[Math.ceil(Math.random()*(colors.length)) - 1];
	const addDataToDB = async (values) => {
		
		await db.collection("users").doc(values.email.toString()).set({
			"email": values.email,
			
		}).then(() => {
			console.log("Document successfully written!");
		})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	}
	const history = useHistory();
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
	const formik = useFormik({

		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			confirmPassword: '',
			mobile: ''
		},

		validationSchema: Yup.object({

			firstname: Yup.string()
				.min(3, 'Must be 3 character or more')
				.max(20, 'Must be 20 characters or less')
				.required('Required'),

			lastname: Yup.string()
				.min(3, 'Must be 3 character or more')
				.max(20, 'Must be 20 characters or less')
				.required('Required'),

			email: Yup.string().email('Invalid email address').required('Required'),
			mobile: Yup.string().matches(phoneRegExp,"Phone number is not valid").min(10,"10 digit mobile number required").max(10,"10 digit mobile number required").required('Required'),
			password: Yup.string()
				.min(8, 'Must be 8 characters or more')

				.required('Required'),
			confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')


		}),

		onSubmit: values => {

			auth.createUserWithEmailAndPassword(values.email, values.password).then((userCredential) => {
				// send verification mail.


				if (!userCredential.user.emailVerified) {
					userCredential.user.sendEmailVerification();
					// userCredential.user.displayName = values.firstname +" "+ values?.lastname;
					userCredential.user.updateProfile({
						displayName: values.firstname + " " + values?.lastname,
						photoURL: color
					})
					
					auth.signOut();
					alert("Verification Email is Sent");

				}

			})
				.catch(alert);
			db.collection("users").doc(values.email.toString()).get().then((doc) => {
				if (!doc.exists) {
					addDataToDB(values);
				} else {

				}
			}).catch((error) => {

			}).then(()=>{
				history.push('/')
			}
			)
		},

	});

	return (
		<div className="createAccount">
			{/* onChange={e => {setLangCode(e.target.value);}} */}
			<form action="/" className="createForm" onSubmit={formik.handleSubmit}>

				<img className="create_img" src={logo} alt="Logo" />
				<div className="create__header"><h1>Create Account</h1>or <Link to="/" className="link" color="secondary.main">Login</Link></div>
				{/* Name */}
				<div className="inputBlock">
					<p className="inputBlock__label"><b>First Name</b></p>
					<input className="inputBlock__input" type="text" id="firstname" required
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.firstname}
					/>
					{formik.touched.firstname && formik.errors.firstname ? (<p className="extraLabel" >{formik.errors.firstname}</p>) : (<p className="hidden"></p>)}
				</div>
				<div className="inputBlock">
					<p className="inputBlock__label"><b>Last Name</b></p>
					<input className="inputBlock__input" type="text" id="lastname"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.lastname}
					/>
					{formik.touched.lastname && formik.errors.lastname ? (<p className="extraLabel" >{formik.errors.lastname}</p>) : (<p className="hidden"></p>)}
				</div>
				{/* Email */}
				<div className="inputBlock">
					<p className="inputBlock__label"><b>Email</b></p>
					<input id="email" className="inputBlock__input" type="email" required
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? (<p className="extraLabel" >{formik.errors.email}</p>) : (<p className="hidden"></p>)}
				</div>
				{/* Mobile */}
				<div className="inputBlock">
					<p className="inputBlock__label"><b>Mobile</b></p>
					<input id="mobile" className="inputBlock__input" type = "tel" required
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.mobile}
					/>
					{formik.touched.mobile && formik.errors.mobile ? (<p className="extraLabel" >{formik.errors.mobile}</p>) : (<p className="hidden"></p>)}
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
				{/* Confirm Password */}
				<div className="inputBlock">
					<p className="inputBlock__label"><b>Confirm Password</b></p>
					<div>
						<div className="passwordInputBox">
							<input id="confirmPassword" className="inputBlock__input inputBlock__password" type={confirmPasswordType} required
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.confirmPassword}
							/>
							<div className="inputBlock__input__button" onMouseDown={changeConfirmPasswordTypeVisible} onMouseUp={changeConfirmPasswordTypeHidden}>
								{confirmPasswordHidden ? (
									<VisibilityOffIcon className="icon" />
								) : (
									<VisibilityIcon className="icon" />
								)}
							</div>

						</div>
						{formik.touched.confirmPassword && formik.errors.confirmPassword ? (<p className="extraLabel" >{formik.errors.confirmPassword}</p>) : (<p className="hidden"></p>)}
					</div>
				</div>

				<button type="submit" variant="contained" color="secondary" className="create_submit"   >
					Create Account
				</button>
				{/* </input> */}



			</form>

		</div>
	)
}

export default CreateAccount
