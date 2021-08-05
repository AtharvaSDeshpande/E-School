import LandingPage from './components/LandingPage/LandingPage'
import CreateAccount from './components/CreateAccount/CreateAccount';
import Labs from './components/Labs/Labs'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from './components/Profile/Profile';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { actionTypes } from './reducer';


function App() {
	const [{user},dispatch] = useStateValue();
	useEffect(()=>{
		auth.onAuthStateChanged(user=>{
		   if (user && user?.emailVerified)
		   {
			   dispatch({
				type: actionTypes.SET_USER,
				user: user
			}) 
		   }
				  
	   })
	   
			
	   },[dispatch])
	return (
		<div className="app">

			<Router>
				<Switch>
					<Route path="/createaccount">
						<CreateAccount />
					</Route>
					<Route path="/labs">
						<Labs />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}
export default App


