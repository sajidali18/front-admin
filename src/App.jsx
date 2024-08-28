import React from "react"
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import SignupPage from "./Pages/SignupPages/SignupPage"
import LoginPages from "./Pages/LoginPages/LoginPages"
import Dashboard from "./Pages/Dashboard/Dashboard"
import UserPage from "./Pages/UserPage/UserPage"
import RolePage from "./Pages/RolePage/RolePage"
import Adminpage from "./Pages/Adminpage/Adminpage"
import ManagerPage from "./Pages/ManagerPage/ManagerPage"
import NormalPage from "./Pages/NormalPage/NormalPage"
import ProtectedRoute from "./Components/Route/protectedRoutes"
import Unauthorized from "./Components/Route/unautorized"

function App() {


  return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/usermanage" element={<ProtectedRoute element={UserPage} allowedRoles={['superadmin']}/>}/>
          <Route path="/role" element={<ProtectedRoute element={RolePage} allowedRoles={['superadmin']}/>}/>
          <Route path="/admin" element={<ProtectedRoute element={Adminpage} allowedRoles={['admin']}/>}/>
          <Route path="/manager" element={<ProtectedRoute element={ManagerPage} allowedRoles={['manager']}/>}/>
          <Route path="/normaluser" element={<ProtectedRoute element={NormalPage} allowedRoles={['normaluser', 'manager', 'superadmin', 'admin']}/>}/>
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} allowedRoles={['normaluser','manager','superadmin','admin']} />} />
          <Route path="/" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPages/>}/>
          <Route path="/unauthorized" element={<Unauthorized />}/>
          {/* <Route path="/" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPages/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/Usermanage" element={<UserPage/>} />
          <Route path="/Role" element={<RolePage/>} />
          <Route path="/admin" element={<Adminpage/>} />
          <Route path="/manager" element={<ManagerPage/>} />
          <Route path="/normaluser" element={<NormalPage/>} /> */}
        </Routes>
       </BrowserRouter>
     </>
  )
}

export default App





// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import SuperadminDashboard from './pages/SuperadminDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ManagerDashboard from './pages/ManagerDashboard';
// import NormalUserDashboard from './pages/NormalUserDashboard';
// import Unauthorized from './pages/Unauthorized';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Protected Routepath="/usermanage"  allowedRoles={['superadmin admin']} />
//         {/* <ProtectedRoute
//           path="/admin"
//           component={AdminDashboard}
//           allowedRoles={['superadmin', 'admin']}
//         />
//         <ProtectedRoute
//           path="/manager"
//           component={ManagerDashboard}
//           allowedRoles={['superadmin', 'manager']}
//         />
//         <ProtectedRoute
//           path="/normaluser"
//           component={NormalUserDashboard}
//           allowedRoles={['superadmin', 'admin', 'manager', 'normaluser']}
//         />
//         <Route path="/unauthorized" component={Unauthorized} /> */}
//       </Switch>
//     </Router>
//   );
// }

// export default App;

