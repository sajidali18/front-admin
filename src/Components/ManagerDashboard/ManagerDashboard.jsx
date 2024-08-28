import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';

const ManagerDashboard = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://backend-rvaz.onrender.com/users/users');
                setCustomers(response.data.info);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <Header/>
                <header className="col-12 mb-4">
                    <h1 className="text-center">Manager Dashboard</h1>
                </header>

                {/* Main Content */}
                <main className="col-md-12">
                    <div className="row">
                        {/* Reports Section */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Reports</h4>
                                </div>
                                <div className="card-body">
                                    <p>View and generate reports.</p>
                                    <button className="btn btn-primary">View Reports</button>
                                </div>
                            </div>
                        </div>
                        {/* Team Management Section */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Team Management</h4>
                                </div>
                                <div className="card-body">
                                    <p>Manage your team members and their tasks.</p>
                                    <button className="btn btn-primary">Manage Team</button>
                                </div>
                            </div>
                        </div>

                        {/* Data Entry Section */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Data Entries</h4>
                                </div>
                                <div className="card-body">
                                    <p>View and manage data entries related to your team.</p>
                                    <button className="btn btn-primary">Manage Data Entries</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Members List */}
                    <div className="card mt-4">
                        <div className="card-header">
                            <h4>Team Members</h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.filter(customer => customer.role === 'normaluser').map((customer) => (
                                        <tr key={customer._id}>
                                            <td>{customer.user_name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.role}</td>
                                            <td>
                                                <button className="btn btn-secondary">View Profile</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManagerDashboard;
