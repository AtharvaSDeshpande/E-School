import LandingPage from './components/LandingPage/LandingPage'
import CreateAccount from './components/CreateAccount/CreateAccount';
import Labs from './components/Labs/Labs'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from './components/Profile/Profile';
import { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import Classroom from './components/Classroom/Classroom';


function App() {
	const [{user},dispatch] = useStateValue();
	const [loading,setLoading] = useState(true);
	const signIn = async () => {
		await auth.onAuthStateChanged(user=>{
		   if (user && user?.emailVerified)
		   {
			   dispatch({
				type: actionTypes.SET_USER,
				user: user
			}) 
		   }
		})
			
		
	}
	useEffect(()=>{
			signIn().then(()=>{
				setTimeout(() => { setLoading(false);  }, 1000);
				
			});  
			
			
	   },[dispatch])
	
	if (!loading)
	{
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
					<Route path="/class">
						<Classroom />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
			</Router>
		</div>
	)
	}

	return 	null;
}
export default App


