// Mock data for GlobeTrotter Goa Travel App

export const destinations = [
  {
    id: 1,
    name: "Palolem Beach",
    location: "South Goa",
    description: "A crescent-shaped paradise with calm waters, perfect for swimming and kayaking. Known for its serene ambiance and beachside huts.",
    image: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
    rating: 4.8,
    activities: ["Swimming", "Kayaking", "Sunset Views", "Beach Shacks"],
    bestTime: "November to March",
    price: "₹₹"
  },
  {
    id: 2,
    name: "Anjuna Beach",
    location: "North Goa",
    description: "Famous for its dramatic red cliffs, flea market, and vibrant nightlife. A haven for artists and free spirits.",
    image: "https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg",
    rating: 4.6,
    activities: ["Flea Market", "Water Sports", "Beach Parties", "Cliff Views"],
    bestTime: "October to March",
    price: "₹₹₹"
  },
  {
    id: 3,
    name: "Agonda Beach",
    location: "South Goa",
    description: "A pristine, untouched stretch of coastline. Perfect for those seeking solitude and natural beauty.",
    image: "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg",
    rating: 4.9,
    activities: ["Yoga", "Dolphin Watching", "Beach Walks", "Meditation"],
    bestTime: "November to February",
    price: "₹₹"
  },
  {
    id: 4,
    name: "Candolim Beach",
    location: "North Goa",
    description: "A peaceful beach with luxury resorts, water sports, and Portuguese heritage sites nearby.",
    image: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg",
    rating: 4.5,
    activities: ["Parasailing", "Jet Skiing", "Beach Dining", "Fort Exploration"],
    bestTime: "December to February",
    price: "₹₹₹"
  },
  {
    id: 5,
    name: "Morjim Beach",
    location: "North Goa",
    description: "Known as 'Little Russia' and home to Olive Ridley turtles. A tranquil escape with pristine sands.",
    image: "https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg",
    rating: 4.7,
    activities: ["Turtle Spotting", "Bird Watching", "Beach Dining", "Quiet Walks"],
    bestTime: "November to March",
    price: "₹₹"
  },
  {
    id: 6,
    name: "Cola Beach",
    location: "South Goa",
    description: "A hidden gem with a freshwater lagoon meeting the sea. Accessible through coconut groves.",
    image: "https://images.pexels.com/photos/35429732/pexels-photo-35429732.jpeg",
    rating: 4.9,
    activities: ["Lagoon Swimming", "Camping", "Photography", "Nature Walks"],
    bestTime: "October to March",
    price: "₹"
  }
];

export const sampleItineraries = [
  {
    id: 1,
    title: "Beach Hopper's Paradise",
    duration: "5 Days",
    destinations: ["Palolem Beach", "Agonda Beach", "Cola Beach"],
    budget: "₹15,000 - ₹25,000",
    highlights: "Perfect for beach lovers seeking serenity and natural beauty"
  },
  {
    id: 2,
    title: "North Goa Adventure",
    duration: "4 Days",
    destinations: ["Anjuna Beach", "Candolim Beach", "Morjim Beach"],
    budget: "₹20,000 - ₹35,000",
    highlights: "Experience vibrant nightlife, markets, and water sports"
  },
  {
    id: 3,
    title: "Complete Goa Experience",
    duration: "7 Days",
    destinations: ["Palolem Beach", "Anjuna Beach", "Candolim Beach", "Agonda Beach"],
    budget: "₹30,000 - ₹50,000",
    highlights: "Comprehensive tour covering both North and South Goa"
  }
];

export const activities = [
  { id: 1, name: "Water Sports", icon: "waves" },
  { id: 2, name: "Beach Shacks", icon: "utensils" },
  { id: 3, name: "Yoga & Wellness", icon: "heart" },
  { id: 4, name: "Flea Markets", icon: "shopping-bag" },
  { id: 5, name: "Heritage Sites", icon: "landmark" },
  { id: 6, name: "Wildlife", icon: "bird" }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "GlobeTrotter made planning our Goa trip effortless. The itinerary suggestions were spot-on!",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Delhi",
    text: "Discovered hidden gems in South Goa that I would have never found on my own. Highly recommend!",
    rating: 5
  },
  {
    id: 3,
    name: "Ananya Iyer",
    location: "Bangalore",
    text: "The perfect blend of adventure and relaxation. Our family had an unforgettable experience.",
    rating: 5
  }
];