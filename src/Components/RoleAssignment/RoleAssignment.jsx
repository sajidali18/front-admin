import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';

const RoleAssignment = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        // Fetch users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://backend-rvaz.onrender.com/users/users');
                setUsers(response.data.info);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users');
            }
        };
        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleRoleChange = (e) => {
        setNewRole(e.target.value);
    };

    const handleAssignRole = async (e) => {
        e.preventDefault();
        try {
            const info = await axios.put('https://backend-rvaz.onrender.com/users/assign', {
                user_name: selectedUser,
                role: newRole
          });
            console.log(info);
            toast.success('Role assigned successfully');
            // Optionally, refresh the user list
            const response = await axios.get('https://backend-rvaz.onrender.com/users/users');
            setUsers(response.data.info);
            setSelectedUser('');
            setNewRole('');

        } catch (error) {
            console.error('Error assigning role:', error);
            toast.error('Failed to assign role');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <header className="col-12 mb-4">
                    <h1 className="text-center">Role Assignment</h1>
                </header>

                {/* Main Content */}
                <main className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Assign Roles</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAssignRole}>
                                <div className="mb-3">
                                    <label htmlFor="userSelect" className="form-label">Select User</label>
                                    <select
                                        id="userSelect"
                                        className="form-select"
                                        value={selectedUser}
                                        onChange={handleUserChange}
                                        required
                                    >
                                        <option value="">Choose a user</option>
                                        {users.map((user) => (
                                            <option key={user._id} value={user.user_name}>
                                                {user.user_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="roleSelect" className="form-label">Assign Role</label>
                                    <select
                                        id="roleSelect"
                                        className="form-select"
                                        value={newRole}
                                        onChange={handleRoleChange}
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="superadmin">SuperAdmin</option>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="normaluser">Normal User</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Assign Role</button>
                            </form>
                        </div>
                    </div>

                    {/* Users List */}
                    <div className="card mt-4">
                        <div className="card-header">
                            <h4>Users List</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.user_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default RoleAssignment;
