import { FaCheckCircle, FaUsers, FaCar, FaMapMarkerAlt } from 'react-icons/fa'

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/40 to-emerald-700/40"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">About Us</h1>
          <p className="text-2xl text-white/90">Your Trusted Partner for Exploring Swat Valley</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Swat Car Rental, your premier choice for vehicle rentals in the beautiful Swat Valley. 
              Established in 2020, we have been serving tourists and locals alike with our commitment to quality, 
              reliability, and exceptional customer service.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Swat Valley, often called the "Switzerland of Pakistan," is known for its stunning landscapes, 
              pristine rivers, and majestic mountains. We understand that exploring this paradise requires 
              reliable transportation, and that's exactly what we provide.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our fleet includes a wide range of vehicles specially selected for mountain terrain, from rugged 
              4x4s perfect for adventurous trails to comfortable sedans for family trips. Every vehicle in our 
              fleet is regularly maintained and thoroughly inspected to ensure your safety and comfort.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCar size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Fleet</h3>
              <p className="text-gray-600">
                Well-maintained vehicles suitable for all terrains
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
              <p className="text-gray-600">
                Competitive pricing with no hidden charges
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Drivers</h3>
              <p className="text-gray-600">
                Professional drivers familiar with mountain roads
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Knowledge</h3>
              <p className="text-gray-600">
                Insider tips on best routes and destinations
              </p>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Service Areas in Swat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Mingora</h3>
              <p className="text-gray-700">
                The main city and commercial hub of Swat. Perfect starting point for your journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Kalam Valley</h3>
              <p className="text-gray-700">
                Breathtaking valley famous for its natural beauty and tourist attractions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Malam Jabba</h3>
              <p className="text-gray-700">
                Popular ski resort and hill station with stunning mountain views.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Bahrain</h3>
              <p className="text-gray-700">
                Scenic town along the Swat River, gateway to upper Swat.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Ushu Forest</h3>
              <p className="text-gray-700">
                Dense pine forests offering camping and trekking opportunities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Swat Motorway</h3>
              <p className="text-gray-700">
                Modern highway connecting Swat to major cities.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To provide safe, reliable, and affordable car rental services that enable travelers 
            to explore the magnificent beauty of Swat Valley with ease and comfort.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
