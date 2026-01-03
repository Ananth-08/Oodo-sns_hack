import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, DollarSign, ArrowLeft, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { destinations } from '../mock';
import { useToast } from '../hooks/use-toast';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const destination = destinations.find(d => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Destination Not Found</h2>
          <Button onClick={() => navigate('/destinations')} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            <ArrowLeft className="mr-2" size={18} />
            Back to Destinations
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToTrip = () => {
    toast({
      title: "Added to Trip Planner",
      description: `${destination.name} has been added to your trip planner`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Destination Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/destinations')}
              className="text-white hover:bg-white/10 mb-8"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Destinations
            </Button>
            
            <Badge className="mb-6 bg-white/90 text-teal-800 px-4 py-2 text-base">
              <MapPin className="mr-2" size={16} />
              {destination.location}
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              {destination.name}
            </h1>
            
            <div className="flex items-center gap-6 text-white text-xl">
              <div className="flex items-center">
                <Star className="mr-2 fill-yellow-400 text-yellow-400" size={24} />
                <span className="font-bold">{destination.rating}</span>
              </div>
              <div className="h-6 w-px bg-white/30"></div>
              <div className="flex items-center">
                <DollarSign className="mr-1" size={20} />
                <span>{destination.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-slate-900">About This Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-slate-700 leading-relaxed">
                    {destination.description}
                  </p>
                </CardContent>
              </Card>

              {/* Activities */}
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-slate-900">Activities & Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {destination.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                        <div className="w-3 h-3 bg-teal-600 rounded-full mr-4"></div>
                        <p className="text-lg font-medium text-slate-900">{activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Time to Visit */}
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-slate-900">Best Time to Visit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
                    <Calendar className="text-teal-700 mr-6" size={40} />
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-2">RECOMMENDED PERIOD</p>
                      <p className="text-2xl font-bold text-slate-900">{destination.bestTime}</p>
                      <p className="text-slate-600 mt-2">Ideal weather conditions and fewer crowds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-xl sticky top-24">
                <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                  <CardTitle className="text-2xl font-bold text-slate-900">Plan Your Visit</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-2">LOCATION</p>
                    <p className="text-lg font-bold text-slate-900">{destination.location}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-2">RATING</p>
                    <div className="flex items-center">
                      <Star className="fill-yellow-400 text-yellow-400 mr-2" size={20} />
                      <span className="text-2xl font-bold text-slate-900">{destination.rating}</span>
                      <span className="text-slate-600 ml-2">/ 5.0</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-2">PRICE RANGE</p>
                    <p className="text-2xl font-bold text-slate-900">{destination.price}</p>
                  </div>

                  <div className="pt-6 space-y-3">
                    <Button 
                      onClick={handleAddToTrip}
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Plus className="mr-2" size={20} />
                      Add to Trip Planner
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/planner')}
                      variant="outline"
                      className="w-full border-2 border-teal-600 text-teal-700 hover:bg-teal-50 py-6 text-lg"
                    >
                      View Trip Planner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;