import React, { Fragment, useState } from 'react'
import clsx from 'clsx';
import { Avatar, Button, Divider, Drawer, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, Modal, Tooltip } from '@material-ui/core';
import './Header.css'
import logo from "../../assets/images/logo.png"
import logo_small from "../../assets/images/logo_small.png"
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { Assessment, Home } from '@material-ui/icons';
import db, { auth } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
const getModalStyle = () => {
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
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    col: {
        color: "white"
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

}));
function Header() {
    const classes = useStyles();
    const setClass = (myClass) => {
        // console.log(myClass)
        dispatch({
            type: actionTypes.SET_CLASS,
            selectedClass: myClass,
        })
    }


    const [{ user, selectedClass, allClasses }, dispatch] = useStateValue();
   
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link className="listLink" to="/">
                    <ListItem button key="Home">
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>

                {/* <Link className = "listLink" to = "/"> */}
                <ListItem button key="Dashboard">
                    <ListItemIcon><Assessment /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                {/* </Link> */}

                <Divider />
                <ListItem>
                    <p style={{ color: "#5F6368", fontWeight: "500", margin: "5px", }}>Teaching</p>
                </ListItem>
                {allClasses?.map((i) => {

                    if (i?.isTeacher)
                        return (
                            <Link to="/class" className="listLink" onClick={() => { setClass(i) }} >
                                <ListItem button key="Home">
                                    <ListItemIcon><Avatar className='pink' >{i?.data.name[0]}</Avatar></ListItemIcon>
                                    <ListItemText primary={i?.data.name} />
                                </ListItem>
                            </Link>)
                    return null
                })}
                <Divider />
                <ListItem>
                    <p style={{ color: "#5F6368", fontWeight: "500", margin: "5px", }}>Enrolled</p>
                </ListItem>
                {allClasses?.map((i) => {

                    if (!i?.isTeacher)
                        return (
                            <Link to="/class" className="listLink" onClick={() => { setClass(i) }} >
                                <ListItem button key="Home">
                                    <ListItemIcon><Avatar className='pink' >{i?.data.name[0]}</Avatar></ListItemIcon>
                                    <ListItemText primary={i?.data.name} />
                                </ListItem>
                            </Link>)
                    return null
                })}

            </List>

        </div>
    );
    const [anchor, setAnchor] = useState("left")

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

    const [modalStyle] = React.useState(getModalStyle);
    const [className, setClassName] = useState();
    const [section, setSection] = useState("");
    const [semester, setSemester] = useState("");
    const [acadamicYear, setAcadamicYear] = useState("");
    const [joinClassCode, setJoinClassCode] = useState();
    const salt = "311f954e-7fee-4f4c-8ed8-7079d0ed2cd0";
    // const [createDocId,setCreateDocId] = useState();

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
    const createClass = (e) => {
        e.preventDefault()
        if (className) {
            // alert (salt)
            var displayID = uuidv4();
            displayID = displayID[0] + displayID[1] + displayID[2] + displayID[3] + displayID[4] + displayID[5];
            const id = crypto.createHmac('sha256', salt).update(displayID).digest('hex');
            db.collection("users").doc(user.email).collection("classes").doc(id).set({
                "id": id,
                "isTeacher": true,
            });
            db.collection("classes").doc(id).set({
                "name": className,
                "section": section,
                "semester": semester,
                "acadamicYear": acadamicYear,
                "displayID": displayID,
                "displayName": user.displayName,
            });
            db.collection("classes").doc(id).collection("users").doc(user.email).set({
                "id": user.email,
                "isTeacher": true,
            });
            handleModalClose();
        }

    }
    const joinClass = (e) => {
        e.preventDefault();
        if (joinClassCode) {
            const id = crypto.createHmac('sha256', salt).update(joinClassCode).digest('hex');
            db.collection("classes").doc(id).get().then((result) => {
                console.log(result)
                if (result.exists) {
                    db.collection("users").doc(user.email).collection("classes").doc(id).get().then((res) => {
                        if (!res.exists) {
                            db.collection("users").doc(user.email).collection("classes").doc(id).set({
                                "id": id,
                                "isTeacher": false,

                            })
                            db.collection("classes").doc(id).collection("users").doc(user.email).set({
                                "id": user.email,
                                "isTeacher": false,

                            })
                            handleModalClose();
                        }
                        else {
                            alert("Alrady Enrolled in class");
                        }
                    })

                }
                else {
                    alert("Please Enter a valid code")
                }
            }).catch(alert);
        }

    }
    return (
        <div className="header">
            <div className="header__left">
                <Fragment>
                    <Tooltip title="Menu">
                        <MenuIcon className="header__left_icon" onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
                    </Tooltip>

                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </Fragment>
                <Link to="/"><img className="header__left_img" src={logo} alt="Logo" /></Link>
                <Link to="/"><img className="header__left_img_small" src={logo_small} alt="Logo" /></Link>
            </div>
            <div className="header__right">
                <Tooltip title="Create/Join Class"><AddIcon className="header__right_icon" onClick={handleAddSchoolClick} /></Tooltip>
                <Tooltip title="Dashboard"><Assessment className="header__right_icon" /></Tooltip>
                {
                    user ?
                        (
                            <Avatar className={`header__right_avatar ${color} pointer`} onClick={handleClick}>
                                {user.displayName.split(' ')[0][0] + user?.displayName.split(' ')[1][0]}
                            </Avatar>
                        ) :
                        (<Link className="header__link" to="/login">
                            <Avatar className={`header__right_avatar`} ></Avatar>
                        </Link>)
                }
            </div>
            <Menu
                className="addMenu"
                id="fade-menu"
                anchorEl={addSchoolMenu}
                keepMounted
                open={Boolean(addSchoolMenu)}
                onClose={handleAddSchoolClose}
            >
                <MenuItem onClick={() => { handleAddSchoolClose(); setOpenCreate(true) }}>Create</MenuItem>
                <MenuItem onClick={() => { handleAddSchoolClose(); setOpenJoin(true) }}>Join</MenuItem>
            </Menu>
            <Menu
                className="addMenu2"
                id="fade-menu"
                anchorEl={profileNav}
                keepMounted
                open={Boolean(profileNav)}
                onClose={handleClose}
            >
                <Link to="/profile" className="header__link"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                <Link to="/labs" className="header__link"><MenuItem onClick={handleClose}>Labs</MenuItem></Link>
                <Link to="/" className="header__link"><MenuItem onClick={logout}>Logout</MenuItem></Link>
            </Menu>
            <Modal className="modal"
                open={OpenCreate}
                onClose={handleModalClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="createClass">
                        <Input placeholder="Class Name (Required)" type="text" onChange={(e) => setClassName(e.target.value)} required />
                        <Input placeholder="Section" type="text" onChange={(e) => setSection(e.target.value)} />
                        <Input placeholder="Semester" type="text" onChange={(e) => setSemester(e.target.value)} />

                        <Input placeholder="Acadamic Year" type="text" onChange={(e) => setAcadamicYear(e.target.value)} />


                        <Button variant="contained" color="secondary" type="submit" className="createButton" onClick={createClass}>Create</Button>

                    </form>
                </div>
            </Modal>

            <Modal className="modal"
                open={OpenJoin}
                onClose={handleModalClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="joinClass">

                        <Input placeholder="Enter Class Code (Required)" type="text" onChange={(e) => setJoinClassCode(e.target.value)} required />
                        <Button variant="contained" color="secondary" type="submit" className="joinButton" onClick={joinClass}>Join</Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Header
