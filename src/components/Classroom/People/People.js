import { PersonAddOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import { useEffect } from 'react';
import db from '../../../firebase';
import { useStateValue } from '../../../StateProvider'
import LandingPage from '../../LandingPage/LandingPage';
import Login from '../../Login/Login';
import'./People.css'
function People() {
    const [{user,selectedClass},dispatch] = useStateValue();
    const [teachers,setTeachers] = useState([]);
    const [students,setStudents] = useState([]);
    useEffect(()=>{
         // setClassIDs([])
        
         setTeachers([]);
         db.collection("classes").doc(selectedClass?.id).collection("users").where("isTeacher","==",true).onSnapshot((snapshot)=>{
             // setClassIDs(
                
                     setTeachers([]);
                 snapshot.docs.map((doc) =>{ 
                     
                     db.collection("users").doc(doc.id).get().then((result) => {
                         // alert(result.id);
                         setTeachers ( teacher => [...teacher, {
                             id: result.id,
                             data: result.data(),
                             // isTeacher: doc.data().isTeacher,
                         }]
                         )
                     })
                 })
        })   

          // setClassIDs([])
        
          setStudents([]);
          db.collection("classes").doc(selectedClass?.id).collection("users").where("isTeacher","==",false).onSnapshot((snapshot)=>{
              // setClassIDs(
                 
                      setStudents([]);
                  snapshot.docs.map((doc) =>{ 
                      
                      db.collection("users").doc(doc.id).get().then((result) => {
                          // alert(result.id);
                          setStudents ( student => [...student, {
                              id: result.id,
                              data: result.data(),
                              // isTeacher: doc.data().isTeacher,
                          }]
                          )
                      })
                  })
         })   
   },[])
    return (
        <div >
             {user != null&&selectedClass != null?(
                 <div className = "people">
                   <div className = "people__teachers">
                        <div className = "people__title">
                            <h1 className = "people__title__header">Teachers</h1>
                            <PersonAddOutlined className = "people__title__icon"/>
                        </div>
                        <div>
                            {teachers.map(teacher => 
                                (<p> {teacher.data.email} </p>)
                        )}    
                        </div>
                   </div>
                   <div className = "people__teachers">
                        <div className = "people__title">
                            <h1 className = "people__title__header">Students</h1>
                            <PersonAddOutlined className = "people__title__icon"/>
                        </div>
                        <div>
                            {students.map(student => 
                                (<p> {student.data.email} </p>)
                        )}    
                        </div>
                   </div>
                   <div className = "people__parents">

                   </div>
                 </div>
             ):(
                <div>
                    {user == null?(
                        <Login/>
                    ):(
                        <LandingPage/>
                    )}
                </div>
             )
                }
        </div>
    )
}

export default People
