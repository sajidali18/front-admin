import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';

const NormalUserDashboard = ({ id }) => {
    const [user, setUser] = useState({
        user_name: '',
        phone_number:'',
        role: 'normaluser',
    });

    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        if (id) { // Check if id is available
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/users/getuser/${id}`);
                    // console.log(response.data);
                    setUser(response.data);
                    setLoading(false); // Set loading to false after data is fetched
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Failed to fetch user data');
                    setLoading(false); // Set loading to false even if there is an error
                }
            };
            fetchUser();
        }
    }, [id]);
    // console.log(user);

    const handleInputChange = (e) => {
        const { name, value, } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
            try {
                const res = await axios.put('http://localhost:5000/users/updateuser', { ...user, id });
                toast.success(res.data.message);
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('Failed to update profile');
            }
        };

        if (loading) {
            return <div>Loading...</div>; // Show a loading message or spinner while data is being fetched
        }


    return (
        <div className="container-fluid">
            <div className="row">
                <Header />
                <header className="col-12 mb-4">
                    <h1 className="text-center">My Profile</h1>
                </header>

                {/* Main Content */}
                <main className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>View and Edit Profile</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleProfileUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input type="text" id="userName" name="user_name" className="form-control" value={user.user_name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <input type="number" id="phone_number" name="phone_number" className="form-control" value={user.phone_number} onChange={handleInputChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Profile</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <ToastContainer position="top-center" />
        </div>
);
}

export default NormalUserDashboard;
