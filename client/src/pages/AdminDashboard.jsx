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
                <button className="btn-primary flex items-center space-x-2">
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
                          <button className="flex-1 btn-outline text-sm py-2 flex items-center justify-center space-x-1">
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
    </div>
  )
}

export default AdminDashboard
