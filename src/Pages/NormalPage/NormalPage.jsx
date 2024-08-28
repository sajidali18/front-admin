import React, { useEffect, useState } from 'react'
import NormalUserDashboard from '../../Components/NormalUser/NormalUser'
import Sidebar from '../../Components/SideBar/SideBar'

function NormalPage() {
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
    // console.log(userid)
  return (
      <><div className="dashboard-container">
          <Sidebar/>
          <NormalUserDashboard id={userid} />
      </div>
    </>
  )
}

export default NormalPage