import React from 'react'
import './CitiesGrid.css'
import { cities } from '../utils/dataSimulator'
import { serviceColors } from '../utils/dataSimulator'

const CitiesGrid = ({ complaints, onCityClick }) => {
  const getCityComplaints = (cityName) => {
    return complaints.filter(c => c.city === cityName)
  }

  const getServiceCount = (cityName, serviceName) => {
    return complaints.filter(
      c => c.city === cityName && c.service === serviceName
    ).length
  }

  const getCityMapUrl = (cityName) => {
    const mapUrls = {
      'Mumbai': 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Delhi': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Bangalore': 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Hyderabad': 'https://images.unsplash.com/photo-1607495045687-69d4aeb4ad2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Chennai': 'https://images.unsplash.com/photo-1594980596870-8aa6454c77d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Kolkata': 'https://images.unsplash.com/photo-1613145997974-0c87c4c5e82c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Pune': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Ahmedabad': 'https://images.unsplash.com/photo-1616099974571-09ac5a3543e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
    return mapUrls[cityName] || 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }

  const services = [
    { name: 'Road Maintenance', color: serviceColors['Road Maintenance'] },
    { name: 'Water Supply', color: serviceColors['Water Supply'] },
    { name: 'Garbage Collection', color: serviceColors['Garbage Collection'] },
    { name: 'Traffic Management', color: serviceColors['Traffic Management'] },
    { name: 'Public Transport', color: serviceColors['Public Transport'] },
    { name: 'Electricity', color: serviceColors['Electricity'] },
    { name: 'Street Lights', color: serviceColors['Street Lights'] }
  ]

  return (
    <section className="cities-grid-section" id="cities">
      <div className="cities-grid-container">
        <div className="cities-grid-header">
          <h2 className="cities-grid-title">Cities in Action. Right Now.</h2>
          <p className="cities-grid-subtitle">See live reports from across India</p>
        </div>
        <div className="cities-grid">
          {cities.map(cityName => {
            const cityComplaints = getCityComplaints(cityName)
            
            return (
              <div key={cityName} className="city-card" onClick={() => onCityClick(cityName)}>
                <div className="city-map-container">
                  <img 
                    src={getCityMapUrl(cityName)} 
                    alt={`${cityName} Map`} 
                    className="city-map-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    }}
                  />
                  <div className="city-map-overlay">
                    {cityComplaints.map((complaint, index) => {
                      const service = services.find(s => s.name === complaint.service)
                      if (!service) return null
                      
                      return (
                        <div
                          key={complaint.id || index}
                          className="city-complaint-dot"
                          style={{
                            left: `${10 + (index % 8) * 11}%`,
                            top: `${15 + Math.floor((index % 12) / 3) * 20}%`,
                            backgroundColor: service.color
                          }}
                          title={service.name}
                        />
                      )
                    })}
                  </div>
                </div>
                <h3 className="city-card-name">{cityName}</h3>
                <div className="city-legend">
                  {services.filter(service => getServiceCount(cityName, service.name) > 0).slice(0, 3).map(service => (
                    <div key={service.name} className="legend-item">
                      <span 
                        className="legend-dot" 
                        style={{ backgroundColor: service.color }}
                      ></span>
                      <span className="legend-text">{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CitiesGrid

