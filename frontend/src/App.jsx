import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>{/* user layout */}
          {/* serves  as the parent route */}
          <Route index element={<Home></Home>}></Route>
        </Route>
        <Route>{/* admin layout */}</Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
