import React from 'react'
import { NavLink } from 'react-router-dom';

//Styles
import './Navbar.scoped.scss';

const Navbar = () => {
    return (
        <nav className="nav-bar flex flex-jc-c flex-ai-c">
            <NavLink to="/home" className="mr-xxl">My Exercises</NavLink>
            <NavLink to="/create-exercise" activeclassname="active" >Create Exercise</NavLink>
        </nav>
    )
}

export default Navbar
