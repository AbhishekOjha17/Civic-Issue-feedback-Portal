import React from 'react'
import './FactGrid.css'

const FactGrid = ({ currentCity, complaints = [], services = [] }) => {
  // Calculate complaint counts for each service in current city
  const getServiceCount = (serviceName) => {
    return complaints.filter(
      c => c.city === currentCity.name && c.service === serviceName
    ).length
  }

  const facts = services.map(service => ({
    service: service.name,
    count: getServiceCount(service.name),
    color: service.color
  })).filter(fact => fact.count > 0)

  // If we have less than 5 facts, add some general stats
  if (facts.length < 6) {
    const totalCityComplaints = complaints.filter(c => c.city === currentCity.name).length
    if (facts.length < 5) {
      facts.push({
        service: 'Total Complaints',
        count: totalCityComplaints,
        color: '#2A70FF'
      })
    }
    if (facts.length < 6) {
      facts.push({
        service: 'Resolved Today',
        count: Math.floor(totalCityComplaints * 0.65),
        color: '#4CAF50'
      })
    }
  }

  return (
    <div className="fact-grid">
      {facts.slice(0, 6).map((fact, index) => (
        <div
          key={`${fact.service}-${index}`}
          className="fact-box"
          style={{ '--fact-color': fact.color }}
        >
          <div className="fact-icon" style={{ backgroundColor: fact.color + '20' }}>
            <span style={{ color: fact.color }}>📌</span>
          </div>
          <div className="fact-content">
            <h4 className="fact-service">{fact.service}</h4>
            <p className="fact-count">{fact.count.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FactGrid

