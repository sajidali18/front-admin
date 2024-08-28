import React, { useState } from 'react'
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

function LoginPage() {
    // Define state variables for email and password
    const navigate = useNavigate(); // Get navigate function from React Router/

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    // Update state when input values change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Log form data when submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email, password } = formData;
            if (!formData.email || !formData.password) {
                console.error("Error: Email or password is missing.");
                return;
            }
            const response = await axios.post('https://backend-rvaz.onrender.com/users/login', formData, {
                withCredentials: true
            });
            console.log("Login Success", response.data);

            // Check if response indicates success
            if (response.data.success) {
                toast.success("Login successfully");
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000)
            }
            else {
                console.log('server error please try again')
                navigate('/signup');
            }

            setFormData({
                email: '',
                password: ''
            });
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <>
            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <h2 >Login</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" id='btns'> Login</button>
                            <p className="mt-3">Don't have an account? <Link to='/'><a href="#" id='register'>Register</a></Link></p>
                        </form>
                    </div>
                    <ToastContainer position="top-center" className="custom-toast" />
                </div>
            </div>
        </>
    )
}

export default LoginPage
