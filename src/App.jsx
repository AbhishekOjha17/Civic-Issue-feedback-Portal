import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CitiesGrid from './components/CitiesGrid'
import ServicesSection from './components/ServicesSection'
import Footer from './components/Footer'
import FeedbackModal from './components/FeedbackModal'
import { cities, services, generateInitialComplaints, generateNewComplaint } from './utils/dataSimulator'
import './App.css'

// Helper function to get city map URLs - using Indian metro maps and city outlines
function getCityMapUrl(cityName) {
  const mapUrls = {
    'Mumbai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mumbai_Metro_map.svg/1200px-Mumbai_Metro_map.svg.png',
    'Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Delhi_Metro_Map.svg/1200px-Delhi_Metro_Map.svg.png',
    'Bangalore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Namma_Metro_Phase_1_Route_Map.svg/1200px-Namma_Metro_Phase_1_Route_Map.svg.png',
    'Hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Hyderabad_Metro_Map.svg/1200px-Hyderabad_Metro_Map.svg.png',
    'Chennai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Chennai_Metro_Route_Map.svg/1200px-Chennai_Metro_Route_Map.svg.png',
    'Kolkata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kolkata_Metro_Map.svg/1200px-Kolkata_Metro_Map.svg.png',
    'Pune': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    'Ahmedabad': 'https://images.unsplash.com/photo-1616099974571-09ac5a3543e3?w=1200&q=80'
  }
  
  return mapUrls[cityName] || 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1200&q=80'
}

const serviceList = services.map(name => ({
  name,
  color: {
    'Road Maintenance': '#FF6B6B',
    'Water Supply': '#4ECDC4',
    'Garbage Collection': '#FFE66D',
    'Traffic Management': '#A8E6CF',
    'Public Transport': '#95E1D3',
    'Electricity': '#F38181',
    'Street Lights': '#FFD93D'
  }[name]
}))

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [complaints, setComplaints] = useState(() => generateInitialComplaints(100))
  const [currentCityIndex, setCurrentCityIndex] = useState(0)
  const cityCycleInterval = useRef(null)
  const complaintInterval = useRef(null)

  const currentCity = {
    name: cities[currentCityIndex],
    mapUrl: getCityMapUrl(cities[currentCityIndex])
  }

  // Cycle through cities every 7 seconds
  useEffect(() => {
    cityCycleInterval.current = setInterval(() => {
      setCurrentCityIndex(prev => (prev + 1) % cities.length)
    }, 2000)

    return () => {
      if (cityCycleInterval.current) {
        clearInterval(cityCycleInterval.current)
      }
    }
  }, [])

  // Add new complaints periodically (every 3-8 seconds)
  useEffect(() => {
    const addComplaint = () => {
      const newComplaint = generateNewComplaint()
      setComplaints(prev => [...prev, newComplaint])
    }

    // Initial delay
    const initialTimeout = setTimeout(() => {
      addComplaint()
      
      // Then add complaints randomly every 3-8 seconds
      complaintInterval.current = setInterval(() => {
        addComplaint()
      }, 3000 + Math.random() * 5000)
    }, 2000)

    return () => {
      clearTimeout(initialTimeout)
      if (complaintInterval.current) {
        clearInterval(complaintInterval.current)
      }
    }
  }, [])

  const handleOpenModal = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService('')
  }

  const handleCityClick = (cityName) => {
    // Scroll to services section or handle city selection
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="App">
      <Navbar onRegisterComplaint={handleOpenModal} />
      <Hero
        currentCity={currentCity}
        complaints={complaints}
        onRegisterComplaint={handleOpenModal}
      />
      <CitiesGrid 
        complaints={complaints}
        onCityClick={handleCityClick}
      />
      <ServicesSection onRegisterComplaint={handleOpenModal} />
      <Footer />
      {isModalOpen && (
        <FeedbackModal
          selectedService={selectedService}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App

