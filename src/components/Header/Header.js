import React, { useState } from 'react'
import { Avatar, Button, Input,  makeStyles, Modal, Tooltip } from '@material-ui/core';
import './Header.css'
import logo from "../../assets/images/logo.png"
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { Assessment } from '@material-ui/icons';
import { auth } from '../../firebase';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))
function Header() {
    const [{user},dispatch] = useStateValue();

    const color = user?.photoURL;
    const [addSchoolMenu, setAddSchoolMenu] = useState(null);
    const [profileNav, setProfileNav] = React.useState(null);

    const handleClick = (event) => {
      setProfileNav(event.currentTarget);
    };
  
    const handleClose = () => {
      setProfileNav(null);
    };
    const handleAddSchoolClick = (event) => {
        setAddSchoolMenu(event.currentTarget);
    };

    const handleAddSchoolClose = () => {
        setAddSchoolMenu(null);
    };

 const [OpenCreate, setOpenCreate] = useState(false);
    const [OpenJoin, setOpenJoin] = useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [className, setClassName] = useState();
    const [section, setSection] = useState();
    const [subject, setSubject] = useState();
    const [room, setRoom] = useState();
    const [joinClassCode,setJoinClassCode] =useState();
    // const [createDocId,setCreateDocId] = useState();
    const [classData,setClassData] = useState({});
    const handleModalClose = () => {
        setOpenCreate(false);
        setOpenJoin(false);
    }
    const logout = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: null,
        });
        auth.signOut()
    }

    return (
        <div className="header">
            <div className="header__left">
                <MenuIcon className="header__left_icon" />
                <Link to = "/"><img className="header__left_img" src={logo} alt="Logo" /></Link>
            </div>
            <div className="header__right">
                <Tooltip title = "Create/Join Class"><AddIcon className="header__right_icon" onClick={handleAddSchoolClick} /></Tooltip>
                <Tooltip title = "Dashboard"><Assessment className="header__right_icon"/></Tooltip>
                {
                    user?
                    (
                        <Avatar className={`header__right_avatar ${color} pointer`} onClick = {handleClick}>
                            {user.displayName.split(' ')[0][0]+ user?.displayName.split(' ')[1][0]}
                        </Avatar>
                   ):
                    (<Link className = "header__link" to = "/login">
                        <Avatar className={`header__right_avatar`} ></Avatar>
                    </Link>)
                }           
            </div>
            <Menu
                className = "addMenu"
                id="fade-menu"
                anchorEl={addSchoolMenu}
                keepMounted
                open={Boolean(addSchoolMenu)}
                onClose={handleAddSchoolClose}
            >
                <MenuItem  onClick={() => {handleAddSchoolClose(); setOpenCreate(true) }}>Create</MenuItem>
                <MenuItem onClick={() => {handleAddSchoolClose(); setOpenJoin(true) }}>Join</MenuItem>
            </Menu>
            <Menu
                className = "addMenu2"
                id="fade-menu"
                anchorEl={profileNav}
                keepMounted
                open={Boolean(profileNav)}
                onClose={handleClose}
            >
                <Link to = "/profile"  className = "header__link"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                <Link to = "/labs"  className = "header__link"><MenuItem onClick={handleClose}>Labs</MenuItem></Link>
                <Link to = "/login"  className = "header__link"><MenuItem onClick={logout}>Logout</MenuItem></Link>
            </Menu>
            <Modal className="modal"
                open={OpenCreate}
                onClose={handleModalClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="createClass">
                        <Input placeholder="Class Name (Required)" type="text" onChange={(e) => setClassName(e.target.value)} required />
                        <Input placeholder="Section" type="text" onChange={(e) => setSection(e.target.value)} />
                        <Input placeholder="Subject" type="text" onChange={(e) => setSubject(e.target.value)} />

                        <Input placeholder="Room" type="text" onChange={(e) => setRoom(e.target.value)} />


                        <Button  variant="contained" color="secondary" type="submit"  className="createButton">Create</Button>

                    </form>
                </div>
            </Modal>

            <Modal className="modal"
                open={OpenJoin}
                onClose={handleModalClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="joinClass">
                        
                        <Input placeholder="Enter Class Code (Required)" type="text" onChange={(e) => setJoinClassCode(e.target.value)}  required />
                        <Button  variant="contained" color="secondary" type="submit" className="joinButton">Create</Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Header
