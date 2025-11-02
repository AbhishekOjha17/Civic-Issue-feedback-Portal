import React from 'react'
import ServiceCard from './ServiceCard'
import './ServicesSection.css'

const services = [
  {
    id: 1,
    name: 'Road Maintenance',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  },
  {
    id: 2,
    name: 'Water Supply',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  },
  {
    id: 3,
    name: 'Garbage Collection',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  },
  {
    id: 4,
    name: 'Traffic Management',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  },
  {
    id: 5,
    name: 'Public Transport',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  },
  {
    id: 6,
    name: 'Electricity',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  },
  {
    id: 7,
    name: 'Street Lights',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    gradient: 'linear-gradient(135deg, rgba(42, 112, 255, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%)'
  }
]

const ServicesSection = ({ onRegisterComplaint }) => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2 className="services-title">Select a Service to Report an Issue</h2>
        <div className="services-scroll">
          <div className="services-cards">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onRegisterComplaint={onRegisterComplaint}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

