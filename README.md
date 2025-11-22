# Swat Car Rental - Full Stack Web Application

A modern, full-stack car rental platform built for Swat Valley, Pakistan. This application allows customers to browse vehicles, make reservations, and manage their bookings, while administrators can manage the fleet and handle customer inquiries.

## 🚗 Features

### Customer Features
- Browse available vehicles with advanced filtering
- View detailed car specifications and images
- Real-time availability checking
- Multi-step booking process with date selection
- Support for driver hire option
- User dashboard for managing bookings
- Multiple payment methods (Cash, Bank Transfer, JazzCash, Easypaisa)
- WhatsApp integration for quick inquiries

### Admin Features
- Comprehensive admin dashboard
- Manage vehicle fleet (CRUD operations)
- View and manage all bookings
- Update booking status
- User management
- Revenue analytics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React DatePicker** - Date selection
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
swat-car-rental/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Node.js backend
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── uploads/           # Uploaded images
    ├── server.js          # Server entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd d:/OneDrive/Desktop/Project2
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/swat-car-rental
   JWT_SECRET=your_jwt_secret_change_in_production
   JWT_EXPIRE=30d
   NODE_ENV=development
   ```

4. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

5. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

6. **Configure Frontend Environment**
   
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

3. **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (Admin only)
- `PUT /api/cars/:id` - Update car (Admin only)
- `DELETE /api/cars/:id` - Delete car (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings` - Get bookings (Protected)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `DELETE /api/bookings/:id` - Delete booking (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🔐 Default Admin Account

To create an admin user, register normally and then update the user's role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🎨 Key Features Implementation

### Swat-Specific Features
- **Mountain Terrain Support**: 4x4 and SUV categories highlighted
- **Popular Destinations**: Mingora, Kalam, Malam Jabba, Bahrain, etc.
- **Local Payment Methods**: JazzCash, Easypaisa, Bank Transfer
- **Driver Hire**: Option to hire experienced local drivers
- **WhatsApp Integration**: Quick booking via WhatsApp

### Search & Filter
- Category (SUV, 4x4, Sedan, etc.)
- Price range
- Transmission type
- Number of seats
- Availability status

### Booking Process
1. Select pickup/return dates
2. Choose pickup/dropoff locations
3. Add driver option if needed
4. Select payment method
5. Confirm booking

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and API endpoints
- Role-based access control (User/Admin)
- Input validation
- CORS configuration

## 🌟 Future Enhancements

- [ ] Real-time chat support
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Multi-language support (English/Urdu)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] GPS tracking for rented vehicles
- [ ] Customer reviews and ratings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

For any queries or support:
- Email: info@swatcarrental.com
- Phone: +92 300 1234567
- WhatsApp: +92 300 1234567

## 👥 Authors

Developed for Swat Car Rental Business

---

**Note**: This is a production-ready application. Make sure to:
1. Change JWT_SECRET to a strong random string in production
2. Use environment-specific MongoDB URIs
3. Enable HTTPS in production
4. Set up proper backup strategies for the database
5. Configure proper file upload limits and validation
6. Implement rate limiting for API endpoints
# car-rental-website
