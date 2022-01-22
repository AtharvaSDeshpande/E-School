import React, { Fragment, useState } from 'react'
import clsx from 'clsx';
import { Avatar, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Tooltip } from '@material-ui/core';
import './Header.css'
import logo from "../../../assets/images/logo_small.png"
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';
import { Assessment, Home } from '@material-ui/icons';
import { auth } from '../../../firebase';

const useStyles = makeStyles((theme) => ({
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
    const setClass = (myClass) => {
        // console.log(myClass)
        dispatch({
            type: actionTypes.SET_CLASS,
            selectedClass: myClass,
        })
    }
    const [{ user, selectedClass, allClasses }, dispatch] = useStateValue();
    const classes = useStyles();

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
                {allClasses.map((i) => {

                    if (i.isTeacher)
                        return (
                            <Link to="/class" className="listLink" onClick={()=>{setClass(i)}} >
                                <ListItem button key="Home">
                                    <ListItemIcon><Avatar className='pink' >{i.data.name[0]}</Avatar></ListItemIcon>
                                    <ListItemText primary={i?.data.name} />
                                </ListItem>
                            </Link>)
                    return null
                })}
                <Divider />
                <ListItem>
                    <p style={{ color: "#5F6368", fontWeight: "500", margin: "5px", }}>Enrolled</p>
                </ListItem>
                {allClasses.map((i) => {

                    if (!i.isTeacher)
                        return (
                            <Link to="/class" className="listLink" onClick={()=>{setClass(i)}} >
                                <ListItem button key="Home">
                                    <ListItemIcon><Avatar className='pink' >{i.data.name[0]}</Avatar></ListItemIcon>
                                    <ListItemText primary={i?.data.name} />
                                </ListItem>
                            </Link>)
                    return null
                })}

            </List>

        </div>
    );
    const [anchor, setAnchor] = useState("left")



    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const color = user?.photoURL;
    const [profileNav, setProfileNav] = React.useState(null);

    const handleClick = (event) => {
        setProfileNav(event.currentTarget);
    };

    const handleClose = () => {
        setProfileNav(null);
    };

    const logout = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: null,
        });
        auth.signOut()
    }

    return (
        <div className="cheader">
            <div className="cheader__1">
                <div className="cheader__left">
                    <Fragment>
                        <Tooltip title="Menu">
                            <MenuIcon className="header__left_icon" onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
                        </Tooltip>

                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </Fragment>

                    <Link className="cheader__left_link" to="/">
                        <img className="cheader__left_img" src={logo} alt="Logo" />
                        <p className="cheader__left_name">{selectedClass.data.name}</p>
                    </Link>
                </div>
                <div className="cheader__middle">
                    <NavLink exact to="/class/" className="streamLink" activeClassName="streamLink_active">Stream</NavLink>
                    <NavLink to="/class/classwork" className="streamLink" activeClassName="streamLink_active">Classwork</NavLink>
                    {selectedClass.isTeacher ? (
                        <NavLink to="/class/doubts" className="streamLink" activeClassName="streamLink_active">Doubts</NavLink>
                    ) : (
                        <NavLink to="/class/dashboard" className="streamLink" activeClassName="streamLink_active">Dashboard</NavLink>
                    )}
                    {selectedClass.isTeacher ? (
                        <NavLink to="/class/evaluate" className="streamLink" activeClassName="streamLink_active">Evaluate</NavLink>
                    ) : null}
                    <NavLink to="/class/people" className="streamLink" activeClassName="streamLink_active">People</NavLink>

                </div>
                <div className="cheader__right">
                    <Tooltip title="Dashboard"><Assessment className="cheader__right_icon" /></Tooltip>

                    <Avatar className={`header__right_avatar ${color} pointer`} onClick={handleClick}>
                        {user.displayName.split(' ')[0][0] + user?.displayName.split(' ')[1][0]}
                    </Avatar>

                </div>

                <Menu
                    className="addMenu2"
                    id="fade-menu"
                    anchorEl={profileNav}
                    keepMounted
                    open={Boolean(profileNav)}
                    onClose={handleClose}
                >
                    <Link to="/profile" className="cheader__link"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
                    <Link to="/labs" className="cheader__link"><MenuItem onClick={handleClose}>Labs</MenuItem></Link>
                    <Link to="/" className="cheader__link"><MenuItem onClick={logout}>Logout</MenuItem></Link>
                </Menu>

            </div>
            <div className="nav_buttons">

                <NavLink exact to="/class/" className="streamLink" activeClassName="streamLink_active">Stream</NavLink>
                <NavLink to="/class/classwork" className="streamLink" activeClassName="streamLink_active">Classwork</NavLink>
                {selectedClass.isTeacher ? (
                    <NavLink to="/class/doubts" className="streamLink" activeClassName="streamLink_active">Doubts</NavLink>
                ) : (
                    <NavLink to="/class/dashboard" className="streamLink" activeClassName="streamLink_active">Dashboard</NavLink>
                )}
                {selectedClass.isTeacher ? (
                    <NavLink to="/class/evaluate" className="streamLink" activeClassName="streamLink_active">Evaluate</NavLink>
                ) : null}
                <NavLink to="/class/people" className="streamLink" activeClassName="streamLink_active">People</NavLink>

            </div>
        </div>
    )
}

export default Header
