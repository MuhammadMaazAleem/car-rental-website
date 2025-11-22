# Quick Start Guide - Swat Car Rental

Follow these steps to get your car rental website up and running quickly!

## Prerequisites Check
- [ ] Node.js installed (v16+) - Check: `node --version`
- [ ] MongoDB installed - Check: `mongod --version`
- [ ] Git installed (optional)

## Step-by-Step Setup

### 1. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 2. Start MongoDB
Open a new terminal and run:
```bash
mongod
```

Keep this terminal running.

### 3. Setup Database with Sample Data

In the server directory:
```bash
cd server
npm run data:import
```

This will create:
- Admin user (email: admin@swatcarrental.com, password: admin123)
- 9 sample cars with different categories

### 4. Start the Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### 5. Start the Frontend

Open a new terminal:
```bash
cd client
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 6. Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Default Login Credentials

### Admin Account
- **Email**: admin@swatcarrental.com
- **Password**: admin123

### Create Regular User
1. Click "Sign Up" on the website
2. Fill in the registration form
3. Login with your credentials

## Testing the Application

### 1. Browse Cars
- Go to "Cars" page
- Try different filters (category, price, transmission)
- Click on a car to view details

### 2. Make a Booking (Requires Login)
- Login or register first
- Select a car
- Click "Book Now"
- Fill in booking details (dates, location, payment method)
- Submit booking

### 3. View Dashboard
- After booking, go to "Dashboard"
- View your bookings
- Try canceling a booking

### 4. Admin Functions (Login as Admin)
- Go to "Admin" dashboard
- View all bookings
- Change booking status
- Manage cars (view/delete)

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution**: Make sure MongoDB is running
```bash
mongod
```

### Issue: Port 3000 or 5000 already in use
**Solution**: Change the port in .env files
- Backend: Edit `server/.env` → Change PORT value
- Frontend: Edit `client/vite.config.js` → Change server.port

### Issue: CORS errors
**Solution**: Make sure both servers are running and check VITE_API_URL in client/.env

### Issue: Images not showing
**Solution**: Create uploads folder in server directory
```bash
mkdir server/uploads
```

## Next Steps

### Adding Your Own Cars
1. Login as admin
2. Go to Admin Dashboard
3. Click "Add New Car" (feature to be enhanced)
4. Or use MongoDB Compass to add cars directly

### Customization
- Update company info in `client/src/components/Footer.jsx`
- Change colors in `client/tailwind.config.js`
- Update contact details in `client/src/pages/Contact.jsx`

## Development Commands

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run data:import  # Import sample data
npm run data:destroy # Delete all data
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## File Upload Setup

For car image uploads to work properly:
1. Create `uploads` folder in server directory
2. Images will be saved at `server/uploads/`
3. Access via: `http://localhost:5000/uploads/filename.jpg`

## Production Deployment

### Prepare for Production
1. Update environment variables
2. Build frontend: `cd client && npm run build`
3. Use process manager like PM2 for backend
4. Setup reverse proxy (nginx)
5. Enable HTTPS
6. Use production MongoDB (MongoDB Atlas)

### Quick Production Build
```bash
# Backend - use PM2
npm install -g pm2
cd server
pm2 start server.js --name swat-car-rental

# Frontend - build static files
cd client
npm run build
# Serve the 'dist' folder with nginx or similar
```

## Support

If you encounter any issues:
1. Check all terminals for error messages
2. Ensure MongoDB is running
3. Verify all environment variables are set
4. Check if ports are available
5. Review the detailed README.md

## Success Checklist
- [ ] MongoDB running
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can login with admin credentials
- [ ] Can browse cars
- [ ] Can make a test booking
- [ ] Can view dashboard

🎉 **Congratulations!** Your Swat Car Rental website is now running!
