import React from 'react'
import './Header.css'


function Header(props) {
    return (
        <div className='header'>
            <h1 className="logo">Quiz app</h1>
            <div className="buttons">
                {props.back && <button className="header-back" onClick={props.backCallBack}>Back</button>}
            <button className="btn" onClick={props.handleLogout}>Logout</button>
        </div></div>
    )
}

export default Header
