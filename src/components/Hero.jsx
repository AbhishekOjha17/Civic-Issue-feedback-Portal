import React from 'react'
import StatsBoxes from './StatsBoxes'
import { getCityBackgroundImage } from '../utils/cityImages'
import './Hero.css'

const Hero = ({ currentCity, complaints, onRegisterComplaint, onSeeReports }) => {
  // Calculate stats
  const totalComments = complaints.length
  const now = Date.now()
  const tenMinutesAgo = now - 10 * 60 * 1000
  const last10Minutes = complaints.filter(
    c => new Date(c.timestamp).getTime() > tenMinutesAgo
  ).length

  const resolvedIssues = Math.floor(complaints.length * 0.85)
  const citizenRating = '4.8/5.0'
  const communityProjects = Math.floor(complaints.length * 0.15)

  const backgroundImage = getCityBackgroundImage(currentCity.name)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  React.useEffect(() => {
    // Preload image for smooth transition
    const img = new Image()
    img.src = backgroundImage
    img.onload = () => setImageLoaded(true)
  }, [backgroundImage])

  return (
    <section className="hero" id="home">
      <div 
        className={`hero-background-image ${imageLoaded ? 'loaded' : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-container">
        <div className="hero-stats-top-left">
          <StatsBoxes
            totalComments={totalComments}
            last10Minutes={last10Minutes}
            resolvedIssues={resolvedIssues}
            citizenRating={citizenRating}
            communityProjects={communityProjects}
          />
        </div>
        <div className="hero-content-center">
          <h1 className="hero-tagline">
            Connect with {currentCity.name}.
          </h1>
          <h2 className="hero-subheading">
            Make Your<br />Voice Heard
          </h2>
          <p className="hero-subtext">
            Instantly report civic issues, share feedback, and contribute to a smarter, responsive {currentCity.name}.
          </p>
          <div className="hero-cta-buttons">
            <button 
              className="cta-button cta-primary"
              onClick={() => onRegisterComplaint && onRegisterComplaint('')}
            >
              Report an issue →
            </button>
            <button 
              className="cta-button cta-secondary"
              onClick={() => {
                const citiesSection = document.getElementById('cities')
                if (citiesSection) {
                  citiesSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              See Live Reports
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

