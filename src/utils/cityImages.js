// City-specific background images for hero section - Using reliable Unsplash images
export const getCityBackgroundImage = (cityName) => {
  const cityImages = {
    'Mumbai': 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Delhi': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Bangalore': 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Hyderabad': 'https://images.unsplash.com/photo-1607495045687-69d4aeb4ad2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Chennai': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Kolkata': 'https://images.unsplash.com/photo-1613145997974-0c87c4c5e82c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Pune': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'Ahmedabad': 'https://images.unsplash.com/photo-1616099974571-09ac5a3543e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  }
  
  return cityImages[cityName] || 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
}

