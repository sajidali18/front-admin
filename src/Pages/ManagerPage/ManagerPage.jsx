import React from 'react'
import Sidebar from '../../Components/SideBar/SideBar'
import ManagerDashboard from '../../Components/ManagerDashboard/ManagerDashboard'

function ManagerPage() {
  return (
      <>
          <div className="dashboard-container">
              <Sidebar />
              <ManagerDashboard/>
          </div>
    </>
  )
}

export default ManagerPage