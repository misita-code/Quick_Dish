import React from 'react'
import AdminDashboard from './components/AdminDashboard'
import UserProfile from './components/UserProfile'

function App() {
  return (
    <div>
        <h1>QuickDish</h1>
        <Productname />
        <Productlist />
        <AdminProvider>
          <UserProfile />
        
          <AdminDashboard /> 
        </AdminProvider>
    </div>
  )
}

export default App