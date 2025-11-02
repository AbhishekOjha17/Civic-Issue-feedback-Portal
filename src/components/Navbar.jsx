import React from 'react'
import './Navbar.css'

const Navbar = ({ onRegisterComplaint }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🏛️</span>
          <span className="logo-text">Citizen Connect</span>
        </div>
        <div className="navbar-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <button className="nav-link nav-button" onClick={() => onRegisterComplaint('')}>
            Register Complaint
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

