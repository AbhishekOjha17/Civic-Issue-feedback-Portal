import React, { useState, useEffect } from 'react'
import './FeedbackModal.css'

const FeedbackModal = ({ selectedService, onClose }) => {
  const [service, setService] = useState(selectedService)
  const [city, setCity] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    if (selectedService) {
      setService(selectedService)
    }
  }, [selectedService])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAutoDetectCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCity('Detected: ' + position.coords.latitude.toFixed(2) + ', ' + position.coords.longitude.toFixed(2))
        },
        () => {
          setCity('Auto-detect unavailable')
        }
      )
    } else {
      setCity('Auto-detect unavailable')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Please provide a rating before submitting.')
      return
    }
    setIsSubmitted(true)
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content modal-confirmation" onClick={(e) => e.stopPropagation()}>
          <div className="confirmation-icon">✓</div>
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Submit Feedback</h2>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="service">Select Service</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="">Choose a service...</option>
              <option value="Road Maintenance">Road Maintenance</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Garbage Collection">Garbage Collection</option>
              <option value="Traffic Management">Traffic Management</option>
              <option value="Public Transport">Public Transport</option>
              <option value="Electricity">Electricity</option>
              <option value="Street Lights">Street Lights</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">Select City / District</label>
            <div className="city-input-group">
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Choose a city...</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              <button
                type="button"
                onClick={handleAutoDetectCity}
                className="auto-detect-btn"
              >
                Auto-detect
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Share your feedback</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe your experience or concern..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <div className="image-upload-section">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null)
                      setImagePreview(null)
                    }}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Do you want to stay anonymous?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="yes"
                  checked={isAnonymous === true}
                  onChange={() => setIsAnonymous(true)}
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="no"
                  checked={isAnonymous === false}
                  onChange={() => setIsAnonymous(false)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  )
}

export default FeedbackModal

