import React from 'react'
import Sidebar from '../../Components/SideBar/SideBar'
import RoleAssignment from '../../Components/RoleAssignment/RoleAssignment'

function RolePage() {
  return (
      <>
          <div className="dashboard-container">
              <Sidebar />
              <RoleAssignment/>
          </div>
      </>
  )
}

export default RolePage