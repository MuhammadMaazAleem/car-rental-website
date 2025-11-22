import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaCar, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaCar className="text-3xl text-primary" />
              <span className="text-2xl font-bold text-primary">Swat Car Rental</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">Home</Link>
            <Link to="/cars" className="text-gray-700 hover:text-primary transition">Cars</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition">Contact</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition">Dashboard</Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary transition">Admin</Link>
                )}
                <button onClick={handleLogout} className="btn-primary flex items-center space-x-2">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition">Login</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-primary">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</Link>
            <Link to="/cars" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Cars</Link>
            <Link to="/about" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">About</Link>
            <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Contact</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</Link>
                {isAdmin && (
                  <Link to="/admin" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Admin</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Login</Link>
                <Link to="/register" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
