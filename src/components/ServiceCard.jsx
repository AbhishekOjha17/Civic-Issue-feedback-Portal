import React from 'react'
import './ServiceCard.css'

const ServiceCard = ({ service, onRegisterComplaint }) => {
  const handleClick = () => {
    onRegisterComplaint(service.name)
  }

  return (
    <div className="service-card">
      <div
        className="service-card-background"
        style={{
          backgroundImage: `url(${service.image})`
        }}
      >
        <div className="service-card-overlay" style={{ background: service.gradient }}></div>
      </div>
      <div className="service-card-content">
        <h3 className="service-card-name">{service.name}</h3>
        <button
          className="service-card-button"
          onClick={handleClick}
        >
          Register Complaint
        </button>
      </div>
    </div>
  )
}

export default ServiceCard

