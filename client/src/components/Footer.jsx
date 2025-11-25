import { Link } from 'react-router-dom'
import { FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaCar className="text-3xl text-secondary" />
              <span className="text-xl font-bold">Swat Car Rental</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for exploring the beautiful valleys of Swat with comfort and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition">
                <FaInstagram size={24} />
              </a>
              <a href="https://wa.me/923001234567" className="text-gray-400 hover:text-secondary transition">
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-secondary transition">Home</Link></li>
              <li><Link to="/cars" className="text-gray-400 hover:text-secondary transition">Our Fleet</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-secondary transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-secondary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Mingora</li>
              <li>Kalam Valley</li>
              <li>Malam Jabba</li>
              <li>Bahrain</li>
              <li>Ushu Forest</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary mt-1" />
                <span className="text-gray-400">Mingora, Swat, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-secondary" />
                <span className="text-gray-400">+92 328 8691013</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary" />
                <span className="text-gray-400">info@swatcarrental.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Swat Car Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
