import React from 'react'
import { Avatar, Tooltip } from '@material-ui/core';
import './Header.css'
import logo from "../../../assets/images/logo_small.png"
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, NavLink } from 'react-router-dom';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';
import { Assessment } from '@material-ui/icons';
import  { auth } from '../../../firebase';


function Header() {
    const [{ user, selectedClass }, dispatch] = useStateValue();

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
                    <MenuIcon className="cheader__left_icon" />
                    <Link className = "cheader__left_link" to="/">
                        <img className="cheader__left_img" src={logo} alt="Logo" />
                        <p className = "cheader__left_name">{selectedClass.data.name}</p>
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
