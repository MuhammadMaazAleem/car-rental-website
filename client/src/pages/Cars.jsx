import { useState, useEffect } from 'react'
import { getCars } from '../services/carService'
import CarCard from '../components/CarCard'
import { FaFilter } from 'react-icons/fa'

const Cars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
    seats: ''
  })

  useEffect(() => {
    fetchCars()
  }, [filters])

  const fetchCars = async () => {
    setLoading(true)
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      )
      const data = await getCars(cleanFilters)
      setCars(data.data)
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const resetFilters = () => {
    setFilters({
      category: '',
      transmission: '',
      minPrice: '',
      maxPrice: '',
      seats: ''
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Our Fleet</h1>
          <p className="text-xl">Choose from our wide range of vehicles</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <FaFilter className="mr-2" />
                  Filters
                </h2>
                <button onClick={resetFilters} className="text-sm text-primary hover:underline">
                  Reset
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">All Categories</option>
                    <option value="SUV">SUV</option>
                    <option value="4x4">4x4</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Van">Van</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                  <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">All</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Seats</label>
                  <input
                    type="number"
                    name="seats"
                    value={filters.seats}
                    onChange={handleFilterChange}
                    className="input-field"
                    placeholder="e.g., 4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (PKR/day)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="input-field"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="input-field"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No cars found matching your criteria.</p>
                <button onClick={resetFilters} className="btn-primary mt-4">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cars.map(car => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cars
