import React, { useState, useEffect } from 'react';
import { MapPin, Star, Filter, Search, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { destinationsAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Destinations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, [selectedFilter, searchQuery]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedFilter !== 'all') filters.location = selectedFilter;
      if (searchQuery) filters.search = searchQuery;
      
      const data = await destinationsAPI.getAll(filters);
      setDestinations(data);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = destinations;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/15469266/pexels-photo-15469266.jpeg" 
            alt="Ocean waves"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 to-cyan-900/80 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Discover Destinations
          </h1>
          <p className="text-2xl text-cyan-50 max-w-3xl leading-relaxed">
            Explore the most stunning beaches and hidden gems across Goa's enchanting coastline
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6 bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input 
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchDestinations()}
                className="pl-12 py-6 text-lg border-slate-300 focus-visible:ring-teal-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 flex-wrap justify-center">
              <Button 
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                className={selectedFilter === 'all' ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
              >
                <Filter className="mr-2" size={16} />
                All Beaches
              </Button>
              <Button 
                variant={selectedFilter === 'North Goa' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('North Goa')}
                className={selectedFilter === 'North Goa' ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
              >
                North Goa
              </Button>
              <Button 
                variant={selectedFilter === 'South Goa' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('South Goa')}
                className={selectedFilter === 'South Goa' ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
              >
                South Goa
              </Button>
            </div>
          </div>

          <div className="mt-6 text-slate-600">
            Showing <span className="font-semibold text-teal-700">{filteredDestinations.length}</span> destinations
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            // Loading skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden border-none shadow-xl bg-white">
                  <div className="h-80 bg-slate-200 animate-pulse"></div>
                  <CardHeader className="pb-4">
                    <div className="h-8 bg-slate-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-slate-500">No destinations found matching your criteria</p>
              <Button 
                onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
                className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-teal-900/30 to-transparent"></div>
                    <Badge className="absolute top-6 right-6 bg-white/95 text-teal-800 border-none shadow-lg flex items-center gap-1">
                      {destination.rating} <Star className="fill-yellow-400 text-yellow-400" size={14} />
                    </Badge>
                    <Badge className="absolute bottom-6 left-6 bg-teal-600/90 backdrop-blur-sm text-white border-none">
                      {destination.price}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                      {destination.name}
                    </CardTitle>
                    <CardDescription className="flex items-center text-teal-700 font-medium text-base">
                      <MapPin size={16} className="mr-2" />
                      {destination.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {destination.description}
                    </p>
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-slate-700 mb-3">ACTIVITIES</p>
                      <div className="flex flex-wrap gap-2">
                        {destination.activities.slice(0, 3).map((activity, idx) => (
                          <Badge key={idx} variant="outline" className="border-teal-300 text-teal-700 bg-teal-50">
                            {activity}
                          </Badge>
                        ))}
                        {destination.activities.length > 3 && (
                          <Badge variant="outline" className="border-slate-300 text-slate-600">
                            +{destination.activities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-500 mb-1">Best Time to Visit</p>
                      <p className="text-base font-semibold text-slate-900">{destination.bestTime}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;