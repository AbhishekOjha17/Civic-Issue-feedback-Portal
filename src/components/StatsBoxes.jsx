import React from 'react'
import './StatsBoxes.css'

const StatsBoxes = ({ totalComments, last10Minutes, resolvedIssues, citizenRating, communityProjects }) => {
  return (
    <div className="hero-stats-box">
      <div className="stat-item">
        <h3 className="stat-number">{resolvedIssues ? resolvedIssues.toLocaleString() + '+' : totalComments.toLocaleString() + '+'}</h3>
        <p className="stat-desc">Issues Resolved</p>
      </div>
      <div className="stat-item">
        <h3 className="stat-number">{totalComments}</h3>
        <p className="stat-desc">Pages</p>
      </div>
      <div className="stat-item">
        <h3 className="stat-number">{citizenRating || '4.8/5.0'}</h3>
        <p className="stat-desc">Citizen Rating</p>
      </div>
      <div className="stat-item">
        <h3 className="stat-number">{communityProjects ? communityProjects.toLocaleString() + '+' : '250+'}</h3>
        <p className="stat-desc">Community Projects</p>
      </div>
    </div>
  )
}

export default StatsBoxes

