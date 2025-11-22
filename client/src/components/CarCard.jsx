import { Link } from 'react-router-dom'
import { FaCar, FaCog, FaGasPump, FaUsers } from 'react-icons/fa'

const CarCard = ({ car }) => {
  const imageUrl = car.images && car.images.length > 0 
    ? `http://localhost:5000${car.images[0]}` 
    : 'https://via.placeholder.com/400x250?text=No+Image'

  return (
    <div className="card hover:shadow-xl transition duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={car.name}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            {car.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>
        <p className="text-gray-600 mb-4">{car.brand} {car.model} - {car.year}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <FaCog className="text-primary" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaGasPump className="text-primary" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUsers className="text-primary" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCar className="text-primary" />
            <span>{car.available ? 'Available' : 'Booked'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-primary">Rs {car.pricePerDay}</span>
            <span className="text-gray-600">/day</span>
          </div>
          <Link 
            to={`/cars/${car._id}`} 
            className="btn-primary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CarCard
