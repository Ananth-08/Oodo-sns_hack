import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Calendar, Star, ArrowRight, Waves, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { sampleItineraries } from '../mock';
import { destinationsAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationsAPI.getAll();
      setDestinations(data);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Acrylic Crystal Aesthetic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg" 
            alt="Crystal waters of Goa"
            className="w-full h-full object-cover"
          />
          {/* Ocean Monochrome Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/60 via-teal-800/50 to-blue-900/70"></div>
          {/* Acrylic Glass Effect Overlay */}
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              GlobeTrotter
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-50 font-light tracking-wide">
              Experience Goa Like Never Before
            </p>
          </div>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover pristine beaches, vibrant culture, and unforgettable adventures 
            along India's most enchanting coastline
          </p>

          {/* Search Bar with Glass Morphism */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"></div>
              <div className="relative flex items-center gap-3 p-3">
                <Search className="text-white/70 ml-3" size={24} />
                <Input 
                  placeholder="Search destinations, activities, experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-white placeholder:text-white/60 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none shadow-lg shadow-cyan-500/30 transition-all duration-300"
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/destinations')}
              className="bg-white/95 hover:bg-white text-teal-900 font-semibold px-10 py-7 text-lg rounded-xl shadow-2xl hover:shadow-cyan-300/20 transition-all duration-300 backdrop-blur-sm"
            >
              Discover Destinations
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/planner')}
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/60 hover:border-white font-semibold px-10 py-7 text-lg rounded-xl backdrop-blur-md transition-all duration-300"
            >
              Plan Your Trip
              <Calendar className="ml-2" size={20} />
            </Button>
          </div>
        </div>

        {/* Decorative Wave Element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 text-sm font-medium">
              FEATURED DESTINATIONS
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Goa's Hidden Treasures
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Curated experiences from the most breathtaking beaches and vibrant coastal villages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeletons
              [1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden border-none shadow-xl bg-white">
                  <div className="h-80 bg-slate-200 animate-pulse"></div>
                  <CardHeader className="pb-4">
                    <div className="h-8 bg-slate-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredDestinations.map((destination) => (
                <Card 
                  key={destination._id} 
                  className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                  onClick={() => navigate(`/destination/${destination._id}`)}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Ocean Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-teal-900/30 to-transparent"></div>
                    <Badge className="absolute top-6 right-6 bg-white/95 text-teal-800 border-none shadow-lg">
                      {destination.rating} <Star className="ml-1 fill-yellow-400 text-yellow-400" size={14} />
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-2xl font-bold text-slate-900">
                        {destination.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="flex items-center text-teal-700 font-medium text-base">
                      <MapPin size={16} className="mr-2" />
                      {destination.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {destination.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.slice(0, 3).map((activity, idx) => (
                        <Badge key={idx} variant="outline" className="border-teal-300 text-teal-700 bg-teal-50">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              onClick={() => navigate('/destinations')}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Destinations
              <Compass className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Itineraries Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-2 text-sm font-medium">
              CURATED ITINERARIES
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Ready-Made Adventures
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Expertly crafted journeys designed for every type of traveler
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sampleItineraries.map((itinerary) => (
              <Card key={itinerary.id} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-teal-300">
                      {itinerary.duration}
                    </Badge>
                    <Calendar className="text-teal-600" size={24} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                    {itinerary.title}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    {itinerary.highlights}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-teal-700 mb-3">DESTINATIONS</p>
                    <div className="flex flex-wrap gap-2">
                      {itinerary.destinations.map((dest, idx) => (
                        <Badge key={idx} variant="outline" className="border-cyan-300 text-cyan-800 bg-cyan-50">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Budget</p>
                      <p className="text-lg font-bold text-slate-900">{itinerary.budget}</p>
                    </div>
                    <Button 
                      onClick={() => navigate('/planner')}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-lg"
                    >
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Why GlobeTrotter?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Your gateway to extraordinary Goa experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 group-hover:from-teal-200 group-hover:to-cyan-200 transition-all duration-300 shadow-lg">
                <Compass className="text-teal-700" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert Curation</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Handpicked destinations and experiences by local travel experts who know Goa inside out
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300 shadow-lg">
                <Calendar className="text-cyan-700" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Flexible Planning</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Create custom itineraries that match your style, budget, and timeline perfectly
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 group-hover:from-blue-200 group-hover:to-teal-200 transition-all duration-300 shadow-lg">
                <Waves className="text-blue-700" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Authentic Experiences</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Discover hidden gems and local favorites beyond the typical tourist attractions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;