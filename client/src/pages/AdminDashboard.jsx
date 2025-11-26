import { useState, useEffect } from 'react'
import { getBookings, updateBooking, deleteBooking } from '../services/bookingService'
import { getCars, createCar, updateCar, deleteCar } from '../services/carService'
import { toast } from 'react-toastify'
import { FaCar, FaBookmark, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCarModal, setShowCarModal] = useState(false)
  const [editingCar, setEditingCar] = useState(null)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'bookings') {
        const data = await getBookings()
        setBookings(data.data)
      } else {
        const data = await getCars()
        setCars(data.data)
      }
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await updateBooking(id, { status })
      toast.success('Booking updated successfully')
      fetchData()
    } catch (error) {
      toast.error('Failed to update booking')
    }
  }

  const handleDeleteCar = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return

    try {
      await deleteCar(id)
      toast.success('Car deleted successfully')
      fetchData()
    } catch (error) {
      toast.error('Failed to delete car')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{bookings.length}</div>
                <div className="text-gray-600">Total Bookings</div>
              </div>
              <FaBookmark className="text-4xl text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </div>
                <div className="text-gray-600">Confirmed</div>
              </div>
              <FaBookmark className="text-4xl text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-secondary">{cars.length}</div>
                <div className="text-gray-600">Total Cars</div>
              </div>
              <FaCar className="text-4xl text-secondary opacity-20" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-accent">
                  Rs {bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Revenue</div>
              </div>
              <FaCar className="text-4xl text-accent opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'bookings'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Bookings Management
            </button>
            <button
              onClick={() => setActiveTab('cars')}
              className={`flex-1 py-4 px-6 font-semibold transition ${
                activeTab === 'cars'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Cars Management
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">All Bookings</h2>
              {bookings.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No bookings found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Car</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Dates</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-semibold">{booking.user?.name}</div>
                              <div className="text-sm text-gray-600">{booking.user?.phone}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-semibold">{booking.car?.name}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm">
                              {new Date(booking.pickupDate).toLocaleDateString()} -<br />
                              {new Date(booking.returnDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-semibold">Rs {booking.totalPrice.toLocaleString()}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Cars</h2>
                <button 
                  onClick={() => {
                    console.log('Add New Car clicked!')
                    setEditingCar(null)
                    setShowCarModal(true)
                    console.log('showCarModal set to true')
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add New Car</span>
                </button>
              </div>
              
              {cars.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No cars found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map((car) => (
                    <div key={car._id} className="border rounded-lg overflow-hidden">
                      <img
                        src={car.images?.[0] ? `http://localhost:5000${car.images[0]}` : 'https://via.placeholder.com/400x250'}
                        alt={car.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{car.name}</h3>
                        <p className="text-gray-600 mb-2">{car.brand} {car.model}</p>
                        <p className="text-primary font-bold mb-4">Rs {car.pricePerDay}/day</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingCar(car)
                              setShowCarModal(true)
                            }}
                            className="flex-1 btn-outline text-sm py-2 flex items-center justify-center space-x-1"
                          >
                            <FaEdit />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car._id)}
                            className="flex-1 bg-red-500 text-white text-sm py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-1"
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Car Form Modal */}
      {showCarModal && (
        <CarFormModal
          car={editingCar}
          onClose={() => {
            setShowCarModal(false)
            setEditingCar(null)
          }}
          onSuccess={() => {
            setShowCarModal(false)
            setEditingCar(null)
            fetchData()
          }}
        />
      )}
    </div>
  )
}

// Car Form Modal Component
const CarFormModal = ({ car, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: car?.name || '',
    brand: car?.brand || '',
    model: car?.model || '',
    year: car?.year || new Date().getFullYear(),
    category: car?.category || 'sedan',
    transmission: car?.transmission || 'manual',
    fuelType: car?.fuelType || 'petrol',
    seats: car?.seats || 5,
    pricePerDay: car?.pricePerDay || 0,
    features: car?.features?.join(', ') || '',
    description: car?.description || '',
    available: car?.available !== undefined ? car.available : true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const carData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      }

      if (car?._id) {
        await updateCar(car._id, carData)
        toast.success('Car updated successfully')
      } else {
        await createCar(carData)
        toast.success('Car created successfully')
      }
      
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save car')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{car ? 'Edit Car' : 'Add New Car'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Car Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Toyota Corolla"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Toyota"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Corolla"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="sports">Sports</option>
                  <option value="van">Van</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission *</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type *</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seats *</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  required
                  min="2"
                  max="12"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day (Rs) *</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Available for Rent</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., AC, GPS, Bluetooth, USB Port"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe the car..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                {car ? 'Update Car' : 'Add Car'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
