// Data simulation for live updates
const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad'
]

const services = [
  'Road Maintenance',
  'Water Supply',
  'Garbage Collection',
  'Traffic Management',
  'Public Transport',
  'Electricity',
  'Street Lights'
]

const serviceColors = {
  'Road Maintenance': '#FF6B6B',
  'Water Supply': '#4ECDC4',
  'Garbage Collection': '#FFE66D',
  'Traffic Management': '#A8E6CF',
  'Public Transport': '#95E1D3',
  'Electricity': '#F38181',
  'Street Lights': '#FFD93D'
}

// Generate initial complaints
export const generateInitialComplaints = (count = 50) => {
  const complaints = []
  for (let i = 0; i < count; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)]
    const service = services[Math.floor(Math.random() * services.length)]
    const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Last 30 days
    
    complaints.push({
      id: `complaint-${i}`,
      city,
      service,
      timestamp: timestamp.toISOString(),
      color: serviceColors[service]
    })
  }
  return complaints
}

// Generate a new random complaint
export const generateNewComplaint = () => {
  const city = cities[Math.floor(Math.random() * cities.length)]
  const service = services[Math.floor(Math.random() * services.length)]
  
  return {
    id: `complaint-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    city,
    service,
    timestamp: new Date().toISOString(),
    color: serviceColors[service]
  }
}

export { cities, services, serviceColors }

