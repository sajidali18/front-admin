// src/components/ProtectedRoute.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userid, setUserid] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const tokenParts = jwtToken.split('.');
            const encodedPayload = tokenParts[1];
            const decodedPayload = atob(encodedPayload);
            const user = JSON.parse(decodedPayload);
            setUserid(user.id);
        } else {
            console.log('JWT token not found in local storage');
            
        }
    }, []);
    // console.log(userid)

    useEffect(() => {
        if (userid) { // Check if id is available
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`https://backend-rvaz.onrender.com/users/getuser/${userid}`);
                    setInfo(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [userid]);

    if (loading) {
        return <div>Loading...</div>; 
    }
    const userRole = info.role;
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Component {...rest} />;
};

export default ProtectedRoute;
