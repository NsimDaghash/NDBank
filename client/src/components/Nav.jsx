import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
export default function Nav() {
    return (
        <div className="topnav">
            <div className="leftside">
                <Link to="/" >Home</Link>
                <Link to="/addUser">Add User</Link>
                <Link to="/addTransaction">Create Transaction</Link>
            </div>
            <div className="rightside">
                <Link to="/" >NDBank</Link>
            </div>
        </div>
    )
}
