import React, { useEffect, useState } from 'react'
import './LandingPage.css'
import Header from '../Header/Header'
import { useStateValue } from '../../StateProvider'
import Login from '../Login/Login';
import Block from '../Block/Block';
import db from '../../firebase';
import { actionTypes } from '../../reducer';

function LandingPage() {
    const [{user,selectedClass},dispatch] = useStateValue();
    const [classIDs,setClassIDs] = useState([]);
    // var classIDs = [];
    // const [classes,setClasses] = useState();
    var a = true;
    useEffect(()=>{
        dispatch({
            action: actionTypes.SET_CLASS,
            selectedClass: null
        })
    },[dispatch])
    useEffect(()=>{
        // setClassIDs([])
        
                    setClassIDs([]);
        db.collection("users").doc(user?.email).collection("classes").onSnapshot((snapshot)=>{
            // setClassIDs(
               
                    setClassIDs([]);
                snapshot.docs.map((doc) =>{ 
                    
                    db.collection("classes").doc(doc.id).get().then((result) => {
                        
                        setClassIDs ( classID => [...classID, {
                            id: result.id,
                            data: result.data(),
                            isTeacher: doc.data().isTeacher,
                            }]
                        )
                    })
                })
       })   
   },[user?.email])
//    
    
    return (
        <div className = "landingPage">
            
            {user?(<div>
                <Header/>
                <div className= "blocks">
                   
                  {
                  classIDs.map(classID => 
                (<Block id = {classID.id} myClassName = {classID?.data.name} semester = {classID?.data?.semester} acadamicYear = {classID?.data?.acadamicYear}  displayName = {classID?.data?.displayName} isTeacher = {classID?.isTeacher} active = {a} myClass = {classID}/>)
                  )}
                </div>
            </div>):(<div>
                <Login/>
            </div>)}
        </div>
    )
}

export default LandingPage
