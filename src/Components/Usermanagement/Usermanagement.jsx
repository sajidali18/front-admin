import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

const UserManagement = () => {
    const [users, setUsers] = useState({
        user_name: '',
        email: '',
        password: '',
        phone_number: '',
        role:''
    });;
    const [customer, setCustomers] = useState([{}]);
    // const [delayedRender, setDelayedRender] = useState(false);
    const handleclick = (e) => {
        setUsers({
            ...users,
            [e.target.id]: e.target.value
        });
    }
    // Function to create a user
    const createUser = async (e) => {
        e.preventDefault();
        const { user_name, email, password, phone_number, role } = users;
        if (!user_name || !email || !password || !phone_number || !role) {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/users/signup', users, {
                withCredentials:true
            })
            console.log("signup successfull", response.data);
            toast.success("User Added Successfully");
            const updatedUsers = await axios.get('http://localhost:5000/users/users');
            setCustomers(updatedUsers.data.info);
            setUsers({
                user_name: '',
                email: '',
                password: '',
                phone_number: '',
                role: ''
            })

        }
        catch (error) {
            console.log('error in signup', error.response.data.message);
            toast.error(error.response.data.message);

        }
        
    };

    useEffect(() => {
        const fetchuser = async () => {
            const info = await axios.get('http://localhost:5000/users/users');
            setCustomers(info.data.info);
        }
        fetchuser();
    }, [])
    
    

    // Function to delete a user
    const deleteUser = async (index) => {
        try {
            const fetchid = await axios.delete(`http://localhost:5000/users/getuserbyid/${index}`);
            toast.success(fetchid.data.message);
            const updatedUsers = await axios.get('http://localhost:5000/users/users');
            setCustomers(updatedUsers.data.info);
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    };

    const renderUsers = () => {
        if (!Array.isArray(customer) || customer.length === 0) {
            return (
                <tr>
                    <td colSpan="5">No users available</td>
                </tr>
            );
        }
        return customer.map((user, index) => (
            <tr key={index}>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.role}</td>
                <td>
                    <button className="btn" id='user' onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Header />
                {/* Main Content */}
                <main className="col-md-9  col-lg-10 px-md-4">
                    {/* User Management Section */}
                    <div id="user-management" className="dashboard-section">
                        <h2>User Management</h2>
                        <form id="create-user-form" className="mb-4">
                            <div className="mb-3">
                                <label htmlFor="user_name" className="form-label">UserName</label>
                                <input type="text" className="form-control" id="user_name" placeholder="Enter username" value={users.user_name} onChange={handleclick} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={users.email} onChange={handleclick} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password" value={users.password} onChange={handleclick} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone_number" className="form-label">Mobile Number</label>
                                <input type="number" className="form-control" id="phone_number" placeholder="Enter Mobile number" value={users.phone_number} onChange={handleclick} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" value={users.role} onChange={handleclick} >
                                    <option value="">Select a role</option>
                                    <option value="superadmin">SuperAdmin</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="normaluser">Normal User</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={createUser}>Create User</button>
                        </form>

                        <h3>Users List</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Mobile number</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody id="users-list">
                                {renderUsers()}
                            </tbody>
                        </table>
                    </div>

                    {/* Role Assignment Section */}
                    <div id="role-assignment" className="dashboard-section" style={{ display: 'none' }}>
                        <h2>Role Assignment</h2>
                        {/* Content for role assignment */}
                    </div>

                    {/* System Settings Section */}
                    <div id="system-settings" className="dashboard-section" style={{ display: 'none' }}>
                        <h2>System Settings</h2>
                        {/* Content for system settings */}
                    </div>
                </main>
                <ToastContainer position="top-center" className="custom-toast" />
            </div>
        </div>
    );
};

export default UserManagement;
