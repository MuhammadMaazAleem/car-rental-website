import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/40 to-emerald-700/40"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl text-white/90">Get in touch with us for any inquiries or bookings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">Main Bazaar, Mingora<br />Swat, Khyber Pakhtunkhwa<br />Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-primary text-xl" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+92 328 8691013</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary text-xl" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@swatcarrental.com</p>
                    <p className="text-gray-600">support@swatcarrental.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaClock className="text-primary text-xl mt-1" />
                  <div>
                    <p className="font-semibold">Working Hours</p>
                    <p className="text-gray-600">Monday - Sunday<br />8:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaWhatsapp className="mr-2 text-2xl" />
                WhatsApp Booking
              </h3>
              <p className="mb-4">For instant booking and queries, contact us on WhatsApp</p>
              <a
                href="https://wa.me/923288691013"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-green-600 text-center py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Muhammad "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="+92 328 8691013"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Inquiry about car rental"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="input-field"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full md:w-auto px-12"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Our Location</h3>
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">
                  [Map integration - Add Google Maps embed here]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">What documents do I need to rent a car?</h3>
              <p className="text-gray-600">
                You need a valid CNIC, driving license, and a security deposit. For foreigners, 
                passport and international driving permit are required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">What is your cancellation policy?</h3>
              <p className="text-gray-600">
                Free cancellation up to 24 hours before pickup. Cancellations within 24 hours 
                may incur a 20% charge.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Do you provide drivers?</h3>
              <p className="text-gray-600">
                Yes, we offer professional drivers familiar with mountain roads at an additional 
                charge of Rs 2,000 per day.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept cash, bank transfers, JazzCash, Easypaisa, and major credit cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
