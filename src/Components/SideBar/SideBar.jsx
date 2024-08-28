import React from 'react';
import './SideBar.css'
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky" id='btn'>
                <ul className="nav flex-column">
                    <li className="nav-item">
                       <Link to='/dashboard'><a className="nav-link active" aria-current="page" >
                            <i className="bi bi-speedometer2"></i> Dashboard
                        </a></Link> 
                    </li>
                    <li className="nav-item">
                        <Link to='/Usermanage'><a className="nav-link" >
                            <i className="bi bi-people"></i> User Management
                        </a></Link>
                    </li>
                    <li className="nav-item">
                       <Link to='/role'><a className="nav-link" >
                            <i className="bi bi-person-check"></i> Role Assignment
                        </a>
                        </Link> 
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" >
                            <i className="bi bi-gear"></i> System Settings
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;
