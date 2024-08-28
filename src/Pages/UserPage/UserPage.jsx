import React from 'react'
import Sidebar from '../../Components/SideBar/SideBar'
import UserManagement from '../../Components/Usermanagement/Usermanagement'

function UserPage() {
  return (
      <>
          <div className="dashboard-container">
          <Sidebar />
              <UserManagement />
            </div>
    </>
  )
}

export default UserPage