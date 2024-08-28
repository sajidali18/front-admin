import React from 'react'
import AdminUserManagement from '../../Components/AdminUser/AdminUser'
import Sidebar from '../../Components/SideBar/SideBar'

function Adminpage() {
  return (
      <>
          <div className="dashboard-container">
          <Sidebar/>
            <AdminUserManagement />
          </div>
    </>
  )
}

export default Adminpage