import { useState, useEffect } from 'react'
import { getBookings, cancelBooking } from '../services/bookingService'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { FaCalendar, FaMapMarkerAlt, FaCar, FaMoneyBillWave } from 'react-icons/fa'

const Dashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const data = await getBookings()
      setBookings(data.data)
    } catch (error) {
      toast.error('Failed to load bookings')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return

    try {
      await cancelBooking(id)
      toast.success('Booking cancelled successfully')
      fetchBookings()
    } catch (error) {
      toast.error('Failed to cancel booking')
    }
  }

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter)

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary">{bookings.length}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600">
              {bookings.filter(b => b.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking._id} className="border rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Car Image */}
                      <div className="w-full md:w-48 h-32 flex-shrink-0">
                        <img
                          src={booking.car?.images?.[0] ? `http://localhost:5000${booking.car.images[0]}` : 'https://via.placeholder.com/300x200'}
                          alt={booking.car?.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{booking.car?.name}</h3>
                            <p className="text-gray-600">{booking.car?.brand} {booking.car?.model}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center text-gray-600">
                            <FaCalendar className="mr-2 text-primary" />
                            <span className="text-sm">
                              {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-primary" />
                            <span className="text-sm">{booking.pickupLocation}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaCar className="mr-2 text-primary" />
                            <span className="text-sm">{booking.numberOfDays} days</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaMoneyBillWave className="mr-2 text-primary" />
                            <span className="text-sm font-semibold">Rs {booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {booking.status === 'pending' || booking.status === 'confirmed' ? (
                            <button
                              onClick={() => handleCancel(booking._id)}
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                            >
                              Cancel Booking
                            </button>
                          ) : null}
                          <span className="text-sm text-gray-600">
                            Payment: {booking.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
