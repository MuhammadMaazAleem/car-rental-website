import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import API from '../services/api';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await API.get('/cars');
        const carsData = response.data.data || response.data.cars || [];
        const limitedCars = Array.isArray(carsData) ? carsData.slice(0, 6) : [];
        setFeaturedCars(limitedCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setFeaturedCars([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedCars();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient and Swat Valley Theme */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Swat Valley */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/30 via-emerald-700/20 to-green-900/30"></div>
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Explore the Beauty of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 mt-2">
              Swat Valley
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Rent premium vehicles to discover Pakistan's Switzerland. From snow-capped mountains to lush green valleys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cars"
              className="px-8 py-4 bg-white text-teal-700 rounded-full font-semibold text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 transform"
            >
              Browse Our Fleet
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-700 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section with Glassmorphism */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Why Choose Us?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Experience hassle-free car rental in Swat Valley</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏔️',
                title: 'Mountain Ready',
                description: '4x4 vehicles perfect for Swat\'s terrain and weather conditions'
              },
              {
                icon: '👨‍✈️',
                title: 'Local Drivers',
                description: 'Experienced drivers who know every corner of Swat Valley'
              },
              {
                icon: '💳',
                title: 'Easy Payments',
                description: 'JazzCash, EasyPaisa, Bank Transfer - pay your way'
              },
              {
                icon: '⭐',
                title: 'Premium Fleet',
                description: 'Well-maintained vehicles from economy to luxury SUVs'
              },
              {
                icon: '🛡️',
                title: 'Full Insurance',
                description: 'Comprehensive coverage for your peace of mind'
              },
              {
                icon: '📍',
                title: 'Flexible Pickup',
                description: 'Pick up from Mingora, Kalam, Malam Jabba, and more'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Our Featured Fleet
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Handpicked vehicles for your Swat adventure</p>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <div key={car._id} className="transform hover:scale-105 transition-transform duration-300">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/cars"
              className="inline-block px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            Popular Destinations
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Discover the gems of Swat Valley</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                name: 'Kalam Valley', 
                desc: 'Pristine beauty', 
                color: 'from-teal-600 to-emerald-800',
                image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2070'
              },
              { 
                name: 'Malam Jabba', 
                desc: 'Ski resort', 
                color: 'from-blue-600 to-cyan-800',
                image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070'
              },
              { 
                name: 'Bahrain', 
                desc: 'River paradise', 
                color: 'from-green-600 to-teal-800',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070'
              },
              { 
                name: 'Mingora', 
                desc: 'City center', 
                color: 'from-emerald-600 to-green-800',
                image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070'
              }
            ].map((destination, index) => (
              <div
                key={index}
                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${destination.image}')` }}
                ></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${destination.color} opacity-70 group-hover:opacity-50 transition-all duration-300`}></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-sm opacity-90">{destination.desc}</p>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Swat Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Book your perfect vehicle today and explore the Switzerland of Pakistan
          </p>
          <Link
            to="/cars"
            className="inline-block px-12 py-5 bg-white text-teal-700 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 transform"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
