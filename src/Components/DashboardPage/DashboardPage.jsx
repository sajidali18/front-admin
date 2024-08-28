import React, { useEffect, useState } from 'react'
import './DashboardPage.css'
import Header from '../Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function DashboardPage({ id }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handleclick = async () => {
        if (user.role === 'superadmin') {
            navigate('/role');
        }
        else {
            navigate('/admin');
        }
    }
    useEffect(() => {
        if (id) { // Check if id is available
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`https://backend-rvaz.onrender.com/users/getuser/${id}`);
                    setUser(response.data);
                    setLoading(false); // Set loading to false after data is fetched
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false); // Set loading to false even if there is an error
                }
            };
            fetchUser();
        }
    }, [id]);
  return (
      <>
          <div className="main-content">
              <Header userid ={id}/>
              <div className="content-sections">
                  <div className="col-lg-3">
                      <div className="card mb-4 shadow-sm">
                          <div className="card-body">
                              <h5 className="card-title">User Management</h5>
                              <p className="card-text">Manage all users in the system.</p>
                              <Link to='/Usermanage'><a id='user' className="btn btn-primary">Go to User Management</a></Link>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="card mb-4 shadow-sm">
                          <div className="card-body">
                              <h5 className="card-title">Role Assignment</h5>
                              <p className="card-text">Assign roles to users.</p>
                              <a id='user' className="btn btn-primary" onClick={handleclick}>Go to Role Assignment</a>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="card mb-4 shadow-sm">
                          <div className="card-body">
                              <h5 className="card-title">Manager Dashboard</h5>
                              <p className="card-text">Configure their team members</p>
                              <Link to='/manager'><a id='user' className="btn btn-primary">Go to Manager Dashboard</a></Link>   
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-3">
                      <div className="card mb-4 shadow-sm">
                          <div className="card-body">
                              <h5 className="card-title">Profile</h5>
                              <p className="card-text">Edit Their Profile.</p>
                              <Link to='/normaluser'><a id='user' className="btn btn-primary">Go to Profile Settings</a></Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default DashboardPage