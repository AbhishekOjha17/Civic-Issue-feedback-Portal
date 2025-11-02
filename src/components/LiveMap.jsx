import React, { useEffect, useState } from 'react'
import './LiveMap.css'

import { services, serviceColors } from '../utils/dataSimulator'

const servicesList = services.map(name => ({
  name,
  color: serviceColors[name]
}))

const LiveMap = ({ currentCity, complaints = [] }) => {
  const [dots, setDots] = useState([])
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    // Generate random dots for the current city
    const generateDots = () => {
      const newDots = []
      const cityComplaints = complaints.filter(c => c.city === currentCity.name)
      
      cityComplaints.forEach(complaint => {
        const service = servicesList.find(s => s.name === complaint.service)
        if (service) {
          newDots.push({
            id: complaint.id,
            x: Math.random() * 80 + 10, // 10-90% of width
            y: Math.random() * 80 + 10, // 10-90% of height
            color: service.color,
            service: service.name
          })
        }
      })

      setDots(newDots)
    }

    generateDots()
  }, [currentCity, complaints])

  useEffect(() => {
    // Add sparkle effect for new complaints
    if (complaints.length > 0) {
      const newComplaint = complaints[complaints.length - 1]
      if (newComplaint && newComplaint.city === currentCity.name) {
        const service = servicesList.find(s => s.name === newComplaint.service)
        if (service) {
          const sparkle = {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            color: service.color
          }
          setSparkles(prev => [...prev, sparkle])
          
          // Remove sparkle after animation
          setTimeout(() => {
            setSparkles(prev => prev.filter(s => s.id !== sparkle.id))
          }, 2000)
        }
      }
    }
  }, [complaints, currentCity])

  return (
    <div className="live-map-container">
      <div className="map-header">
        <h3 className="map-city-name">{currentCity.name}</h3>
        <div className="map-legend">
          {servicesList.map(service => (
            <div key={service.name} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: service.color }}></span>
              <span className="legend-text">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="map-wrapper">
        <img src={currentCity.mapUrl} alt={`${currentCity.name} Map`} className="city-map" onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80'
        }} />
        <div className="map-overlay">
          {dots.map(dot => (
            <div
              key={dot.id}
              className="complaint-dot"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                backgroundColor: dot.color
              }}
              title={dot.service}
            />
          ))}
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                '--sparkle-color': sparkle.color
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LiveMap

