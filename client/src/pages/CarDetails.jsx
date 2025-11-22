import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCar } from '../services/carService'
import { FaCar, FaCog, FaGasPump, FaUsers, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchCarDetails()
  }, [id])

  const fetchCarDetails = async () => {
    try {
      const data = await getCar(id)
      setCar(data.data)
    } catch (error) {
      toast.error('Failed to load car details')
      console.error('Error fetching car:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Car not found</h2>
        <Link to="/cars" className="btn-primary">Back to Cars</Link>
      </div>
    )
  }

  const images = car.images && car.images.length > 0
    ? car.images.map(img => `http://localhost:5000${img}`)
    : ['https://via.placeholder.com/800x600?text=No+Image']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-primary mb-6 hover:underline">
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={car.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${car.name} ${index + 1}`}
                    className={`h-24 w-full object-cover rounded cursor-pointer border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Car Details */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{car.name}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {car.available ? 'Available' : 'Not Available'}
                </span>
              </div>

              <p className="text-xl text-gray-600 mb-6">{car.brand} {car.model} ({car.year})</p>

              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  Rs {car.pricePerDay.toLocaleString()}
                  <span className="text-lg text-gray-600 font-normal">/day</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <FaCar className="text-primary text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold">{car.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <FaCog className="text-primary text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <FaGasPump className="text-primary text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <FaUsers className="text-primary text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-semibold">{car.seats} Passengers</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </div>

              {/* Book Now Button */}
              {car.available ? (
                <Link
                  to={`/booking/${car._id}`}
                  className="btn-primary w-full text-center block text-lg"
                >
                  Book Now
                </Link>
              ) : (
                <button disabled className="btn-primary w-full opacity-50 cursor-not-allowed text-lg">
                  Currently Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
