import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar } from '../services/carService'
import { createBooking } from '../services/bookingService'
import DateRangePicker from '../components/DateRangePicker'
import { toast } from 'react-toastify'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'

const Booking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  
  const [bookingData, setBookingData] = useState({
    pickupDate: null,
    returnDate: null,
    pickupLocation: 'Mingora',
    dropoffLocation: '',
    paymentMethod: 'Cash on Delivery',
    needDriver: false,
    notes: ''
  })

  useEffect(() => {
    fetchCarDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchCarDetails = async () => {
    try {
      const data = await getCar(id)
      setCar(data.data)
    } catch (error) {
      toast.error('Failed to load car details')
      navigate('/cars')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalPrice = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate || !car) return 0
    
    const days = Math.ceil(
      (bookingData.returnDate - bookingData.pickupDate) / (1000 * 60 * 60 * 24)
    )
    
    let total = car.pricePerDay * days
    if (bookingData.needDriver) {
      total += 2000 * days // Driver charge
    }
    
    return total
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!bookingData.pickupDate || !bookingData.returnDate) {
      toast.error('Please select pickup and return dates')
      return
    }

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      toast.error('Please login to make a booking');
      navigate('/login');
      return;
    }

    setSubmitting(true)

    try {
      console.log('Creating booking with data:', {
        car: id,
        ...bookingData
      });
      
      const response = await createBooking({
        car: id,
        ...bookingData
      })
      
      console.log('Booking response:', response);
      
      // Backend returns { success: true, data: booking }
      // bookingService returns response.data, so we get { success, data }
      const booking = response.data || response
      
      console.log('Booking object:', booking);
      
      if (!booking || !booking._id) {
        console.error('Invalid booking structure:', booking);
        throw new Error('Invalid booking response');
      }
      
      // If payment method is not Cash on Delivery, redirect to payment page
      if (bookingData.paymentMethod !== 'Cash on Delivery') {
        toast.success('Booking created! Redirecting to payment...')
        // Convert payment method to lowercase for payment page
        const paymentMethodMap = {
          'JazzCash': 'jazzcash',
          'EasyPaisa': 'easypaisa',
          'Bank Transfer': 'bank'
        };
        navigate('/payment', {
          state: {
            bookingId: booking._id,
            totalAmount: calculateTotalPrice(),
            carName: car.name,
            paymentMethod: paymentMethodMap[bookingData.paymentMethod]
          }
        })
      } else {
        toast.success('Booking created successfully!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.message || error.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const numberOfDays = bookingData.pickupDate && bookingData.returnDate
    ? Math.ceil((bookingData.returnDate - bookingData.pickupDate) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-primary mb-6 hover:underline">
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              {/* Step 1: Dates */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Select Dates</h2>
                <DateRangePicker
                  startDate={bookingData.pickupDate}
                  endDate={bookingData.returnDate}
                  onStartDateChange={(date) => setBookingData({ ...bookingData, pickupDate: date })}
                  onEndDateChange={(date) => setBookingData({ ...bookingData, returnDate: date })}
                />
              </div>

              {/* Step 2: Location */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Pickup & Dropoff</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Location *
                    </label>
                    <select
                      value={bookingData.pickupLocation}
                      onChange={(e) => setBookingData({ ...bookingData, pickupLocation: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="Mingora">Mingora</option>
                      <option value="Kalam">Kalam</option>
                      <option value="Malam Jabba">Malam Jabba</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Swat Motorway">Swat Motorway</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dropoff Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={bookingData.dropoffLocation}
                      onChange={(e) => setBookingData({ ...bookingData, dropoffLocation: e.target.value })}
                      className="input-field"
                      placeholder="Same as pickup"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Options */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Additional Options</h2>
                
                <div className="mb-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.needDriver}
                      onChange={(e) => setBookingData({ ...bookingData, needDriver: e.target.checked })}
                      className="w-5 h-5 text-primary"
                    />
                    <span className="text-gray-700">
                      Need a driver? (+Rs 2,000/day)
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Any special requirements..."
                  />
                </div>
              </div>

              {/* Step 4: Payment */}
                      <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">4. Payment Method</h2>
                      <div className="space-y-3">
                        {[
                        { value: 'JazzCash', label: 'JazzCash', icon: '📱', desc: 'Instant mobile payment' },
                        { value: 'EasyPaisa', label: 'EasyPaisa', icon: '💚', desc: 'Quick digital payment' },
                        { value: 'Bank Transfer', label: 'Bank Transfer', icon: '🏦', desc: 'Direct bank transfer' },
                        { value: 'Cash on Delivery', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you pick up' }
                        ].map((method) => (
                        <label 
                          key={method.value} 
                          className={`flex items-center space-x-3 cursor-pointer p-4 border-2 rounded-xl transition-all ${
                          bookingData.paymentMethod === method.value 
                            ? 'border-teal-500 bg-teal-50' 
                            : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={bookingData.paymentMethod === method.value}
                          onChange={(e) => setBookingData({ ...bookingData, paymentMethod: e.target.value })}
                          className="w-5 h-5 text-teal-600"
                          required
                          />
                          <div className="flex-1 flex items-center">
                          <span className="text-2xl mr-3">{method.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-800">{method.label}</div>
                            <div className="text-sm text-gray-600">{method.desc}</div>
                          </div>
                          </div>
                          {bookingData.paymentMethod === method.value && (
                          <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          )}
                        </label>
                        ))}
                      </div>
                      {bookingData.paymentMethod !== 'Cash on Delivery' && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          ℹ️ You'll be redirected to complete payment after confirming booking
                        </p>
                        </div>
                      )}
                      </div>

                      <button
                      type="submit"
                      disabled={submitting || !bookingData.pickupDate || !bookingData.returnDate}
                      className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                      >
                      {submitting ? 'Processing...' : bookingData.paymentMethod === 'Cash on Delivery' ? 'Confirm Booking' : 'Proceed to Payment'}
                      </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              
              {car && (
                <div className="mb-4">
                  <img
                    src={car.images?.[0] ? `http://localhost:5000${car.images[0]}` : 'https://via.placeholder.com/400x250'}
                    alt={car.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h4 className="font-bold text-lg">{car.name}</h4>
                  <p className="text-gray-600">{car.brand} {car.model}</p>
                </div>
              )}

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per day</span>
                  <span className="font-semibold">Rs {car?.pricePerDay.toLocaleString()}</span>
                </div>
                
                {numberOfDays > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Number of days</span>
                      <span className="font-semibold">{numberOfDays}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental cost</span>
                      <span className="font-semibold">Rs {(car?.pricePerDay * numberOfDays).toLocaleString()}</span>
                    </div>
                    
                    {bookingData.needDriver && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver charges</span>
                        <span className="font-semibold">Rs {(2000 * numberOfDays).toLocaleString()}</span>
                      </div>
                    )}
                  </>
                )}

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      Rs {calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Free Cancellation</p>
                    <p>Cancel up to 24 hours before pickup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
