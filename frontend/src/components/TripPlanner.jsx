import React, { useState } from 'react';
import { Calendar, MapPin, Plus, X, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { destinations } from '../mock';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const TripPlanner = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [budget, setBudget] = useState('');

  const addDestination = (destination) => {
    if (!selectedDestinations.find(d => d.id === destination.id)) {
      setSelectedDestinations([...selectedDestinations, destination]);
      toast({
        title: "Destination Added",
        description: `${destination.name} has been added to your itinerary`,
      });
    }
  };

  const removeDestination = (destinationId) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== destinationId));
  };

  const handleSaveItinerary = () => {
    if (!tripName || !startDate || !endDate || selectedDestinations.length === 0) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields and add at least one destination",
        variant: "destructive",
      });
      return;
    }

    // Mock save functionality
    const savedTrip = {
      tripName,
      startDate,
      endDate,
      destinations: selectedDestinations,
      budget,
      savedAt: new Date().toISOString()
    };
    
    // Store in localStorage for demo
    const existingTrips = JSON.parse(localStorage.getItem('goaTrips') || '[]');
    existingTrips.push(savedTrip);
    localStorage.setItem('goaTrips', JSON.stringify(existingTrips));

    toast({
      title: "Itinerary Saved!",
      description: `Your trip "${tripName}" has been saved successfully`,
    });

    // Reset form
    setTripName('');
    setStartDate('');
    setEndDate('');
    setSelectedDestinations([]);
    setBudget('');
  };

  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return days > 0 ? `${days} days` : '';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 mb-8"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Plan Your Trip
          </h1>
          <p className="text-2xl text-cyan-50 max-w-3xl leading-relaxed">
            Create your perfect Goa itinerary with our intelligent trip planner
          </p>
        </div>
      </section>

      {/* Trip Planning Form */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trip Details Card */}
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-slate-900">Trip Details</CardTitle>
                  <CardDescription className="text-base">Start by giving your trip a name and dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="tripName" className="text-base font-semibold text-slate-700 mb-3 block">
                      Trip Name *
                    </Label>
                    <Input 
                      id="tripName"
                      placeholder="e.g., Summer Getaway 2025"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      className="text-lg py-6 border-slate-300 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startDate" className="text-base font-semibold text-slate-700 mb-3 block">
                        Start Date *
                      </Label>
                      <Input 
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="text-lg py-6 border-slate-300 focus-visible:ring-teal-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-base font-semibold text-slate-700 mb-3 block">
                        End Date *
                      </Label>
                      <Input 
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="text-lg py-6 border-slate-300 focus-visible:ring-teal-500"
                      />
                    </div>
                  </div>

                  {calculateDuration() && (
                    <Badge className="bg-teal-100 text-teal-800 border-teal-300 text-base px-4 py-2">
                      <Calendar className="mr-2" size={16} />
                      {calculateDuration()}
                    </Badge>
                  )}

                  <div>
                    <Label htmlFor="budget" className="text-base font-semibold text-slate-700 mb-3 block">
                      Estimated Budget (Optional)
                    </Label>
                    <Input 
                      id="budget"
                      placeholder="e.g., ₹25,000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="text-lg py-6 border-slate-300 focus-visible:ring-teal-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Select Destinations Card */}
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-slate-900">Select Destinations</CardTitle>
                  <CardDescription className="text-base">
                    Choose the beaches and locations you want to visit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {destinations.map((destination) => (
                      <Card 
                        key={destination.id} 
                        className="group cursor-pointer border-2 hover:border-teal-500 transition-all duration-300 overflow-hidden"
                        onClick={() => addDestination(destination)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={destination.image} 
                            alt={destination.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                          {selectedDestinations.find(d => d.id === destination.id) && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-teal-600 text-white border-none shadow-lg flex items-center gap-1">
                                <CheckCircle2 size={14} /> Added
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-bold text-slate-900">{destination.name}</CardTitle>
                          <CardDescription className="flex items-center text-sm">
                            <MapPin size={14} className="mr-1" />
                            {destination.location}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-xl sticky top-24">
                <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                  <CardTitle className="text-2xl font-bold text-slate-900">Your Itinerary</CardTitle>
                  <CardDescription>Review your trip details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-2">TRIP NAME</p>
                    <p className="text-lg font-bold text-slate-900">
                      {tripName || 'Not set'}
                    </p>
                  </div>

                  {(startDate || endDate) && (
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-2">DATES</p>
                      <p className="text-base text-slate-900">
                        {startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Start date'}
                        {' → '}
                        {endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'End date'}
                      </p>
                      {calculateDuration() && (
                        <p className="text-teal-700 font-semibold mt-2">{calculateDuration()}</p>
                      )}
                    </div>
                  )}

                  {budget && (
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-2">BUDGET</p>
                      <p className="text-lg font-bold text-slate-900">{budget}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-3">DESTINATIONS ({selectedDestinations.length})</p>
                    {selectedDestinations.length === 0 ? (
                      <p className="text-slate-400 italic">No destinations added yet</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedDestinations.map((dest) => (
                          <div key={dest.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                            <div>
                              <p className="font-semibold text-slate-900">{dest.name}</p>
                              <p className="text-sm text-slate-600">{dest.location}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => removeDestination(dest.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X size={18} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleSaveItinerary}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="mr-2" size={20} />
                    Save Itinerary
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TripPlanner;