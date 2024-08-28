import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar';
import './Dashboard.css'
import DashboardPage from '../../Components/DashboardPage/DashboardPage';

function Dashboard() {
    const [userid, setUserid] = useState(null);
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
    return (
        <>
            <div className="dashboard-container">
                <Sidebar />
                <DashboardPage id = {userid} />
            </div>
        </>
    )
}

export default Dashboard;
