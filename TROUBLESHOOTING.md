# Troubleshooting Guide - Swat Car Rental

Common issues and their solutions for the Swat Car Rental application.

## Installation Issues

### Issue: npm install fails
```
Error: npm ERR! code ERESOLVE
```

**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: Node version incompatibility
```
Error: The engine "node" is incompatible
```

**Solution**:
Update Node.js to version 16 or higher:
```bash
node --version  # Check current version
# Download latest from nodejs.org
```

## Database Issues

### Issue: MongoDB connection failed
```
Error: MongoServerError: connect ECONNREFUSED
```

**Solutions**:
1. Check if MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
# or
mongod --dbpath /path/to/data
```

2. Verify MONGO_URI in `.env`:
```env
MONGO_URI=mongodb://localhost:27017/swat-car-rental
```

### Issue: Database authentication failed
```
Error: Authentication failed
```

**Solution**:
If using MongoDB with authentication:
```env
MONGO_URI=mongodb://username:password@localhost:27017/swat-car-rental
```

### Issue: Can't import sample data
```
Error running seeder
```

**Solution**:
1. Make sure MongoDB is running
2. Check the MONGO_URI in .env
3. Run with verbose logging:
```bash
node seeder.js
```

## Backend Issues

### Issue: Port 5000 already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions**:

**Option 1**: Change the port in `server/.env`:
```env
PORT=5001
```

**Option 2**: Kill the process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: JWT authentication not working
```
Error: Not authorized, token failed
```

**Solutions**:
1. Check if JWT_SECRET is set in `.env`
2. Make sure you're logged in
3. Clear browser storage and login again:
```javascript
localStorage.clear()
```

### Issue: File upload fails
```
Error: ENOENT: no such file or directory, open 'uploads/...'
```

**Solution**:
Create the uploads directory:
```bash
cd server
mkdir uploads
```

### Issue: CORS errors
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:
Verify CORS is enabled in `server.js`:
```javascript
app.use(cors());
```

## Frontend Issues

### Issue: Vite dev server won't start
```
Error: Port 3000 is already in use
```

**Solution**:
Change port in `client/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001
  }
})
```

### Issue: API calls failing (404)
```
Error: Request failed with status code 404
```

**Solutions**:
1. Check if backend is running on port 5000
2. Verify VITE_API_URL in `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Check API endpoint URLs in service files

### Issue: Environment variables not loading
```
undefined when accessing import.meta.env
```

**Solutions**:
1. Restart Vite dev server
2. Ensure variable starts with `VITE_`:
```env
VITE_API_URL=http://localhost:5000/api  # ✅ Correct
API_URL=http://localhost:5000/api       # ❌ Wrong
```

### Issue: Images not displaying
```
404 error for image URLs
```

**Solutions**:
1. Check if backend is serving static files:
```javascript
app.use('/uploads', express.static('uploads'));
```

2. Verify image URL format:
```javascript
`http://localhost:5000${car.images[0]}`  // ✅ Correct
car.images[0]                             // ❌ Missing base URL
```

### Issue: Tailwind styles not working
```
Classes not applying
```

**Solutions**:
1. Make sure tailwind.config.js content paths are correct:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

2. Import CSS in main.jsx:
```javascript
import './index.css'
```

3. Rebuild:
```bash
npm run dev
```

## Authentication Issues

### Issue: Can't login after registration
```
Error: Invalid email or password
```

**Solutions**:
1. Check password length (minimum 6 characters)
2. Verify email is correct
3. Check database for user entry
4. Clear cookies and try again

### Issue: Token expired
```
Error: jwt expired
```

**Solution**:
Login again. Update JWT_EXPIRE in `.env` for longer sessions:
```env
JWT_EXPIRE=30d
```

### Issue: Admin dashboard not accessible
```
Redirected to home page
```

**Solutions**:
1. Login with admin account
2. Verify user role in database:
```javascript
db.users.find({ email: "admin@swatcarrental.com" })
```

3. Update role if needed:
```javascript
db.users.updateOne(
  { email: "admin@swatcarrental.com" },
  { $set: { role: "admin" } }
)
```

## Booking Issues

### Issue: Can't create booking
```
Error: Booking validation failed
```

**Solutions**:
1. Ensure all required fields are filled
2. Check date range is valid (return > pickup)
3. Verify car ID exists
4. Make sure user is authenticated

### Issue: Price calculation wrong
```
Total price is 0 or NaN
```

**Solution**:
Check if dates are properly selected and car price is set:
```javascript
console.log(pickupDate, returnDate, car.pricePerDay)
```

## Production Deployment Issues

### Issue: Build fails
```
Error during build
```

**Solutions**:
1. Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
npm run build
```

2. Check for TypeScript errors
3. Verify all imports are correct

### Issue: Environment variables not working in production
**Solution**:
Set environment variables on your hosting platform (Heroku, Vercel, etc.)

### Issue: Database connection timeout in production
**Solutions**:
1. Use MongoDB Atlas connection string
2. Whitelist your server's IP address
3. Check firewall settings

## Performance Issues

### Issue: Slow page loading
**Solutions**:
1. Optimize images (compress before upload)
2. Enable lazy loading for images
3. Check network tab for slow API calls
4. Consider CDN for static assets

### Issue: Memory leak warnings
**Solutions**:
1. Clean up event listeners in useEffect
2. Cancel pending requests on unmount
3. Check for infinite loops in useEffect

## Development Workflow Issues

### Issue: Hot reload not working
**Solutions**:
1. Restart dev server
2. Check file is inside src/
3. Clear browser cache
4. Use hard refresh (Ctrl+Shift+R)

### Issue: Changes not reflecting
**Solutions**:
1. Clear browser cache
2. Hard refresh (Ctrl+F5)
3. Check if correct file is being edited
4. Restart both servers

## Testing Issues

### Issue: Can't test payment flow
**Solution**:
Use test payment methods (Cash on Delivery) for testing.

### Issue: No test cars showing
**Solution**:
Run the seeder:
```bash
cd server
npm run data:import
```

## Quick Diagnostics Checklist

When something isn't working:

- [ ] Is MongoDB running?
- [ ] Is backend server running?
- [ ] Is frontend dev server running?
- [ ] Are all environment variables set?
- [ ] Did I restart servers after changes?
- [ ] Did I clear browser cache?
- [ ] Are there any console errors?
- [ ] Are there any terminal errors?
- [ ] Is the database populated with data?
- [ ] Am I logged in (for protected routes)?

## Getting Help

If issues persist:

1. **Check browser console** (F12 → Console)
2. **Check terminal output** for both servers
3. **Check MongoDB logs**
4. **Review the error message carefully**
5. **Search for the specific error online**
6. **Check GitHub issues** (if applicable)

## Debug Mode

Enable detailed logging:

### Backend
```javascript
// In server.js
console.log('Request:', req.method, req.path)
console.log('Body:', req.body)
```

### Frontend
```javascript
// In service files
console.log('API Call:', endpoint, data)
console.log('Response:', response)
```

## Common Error Messages Explained

| Error | Meaning | Solution |
|-------|---------|----------|
| ECONNREFUSED | Can't connect to server | Check if server is running |
| 401 Unauthorized | Not logged in | Login or check token |
| 403 Forbidden | No permission | Check user role |
| 404 Not Found | Wrong URL | Check endpoint |
| 500 Server Error | Backend error | Check server logs |
| CORS Error | Cross-origin issue | Check CORS config |

## Still Having Issues?

1. Delete node_modules and package-lock.json
2. Reinstall dependencies
3. Check all .env files
4. Restart everything:
   - MongoDB
   - Backend server
   - Frontend server
   - Browser

## Success Indicators

Everything working when:
- ✅ MongoDB shows "Connected"
- ✅ Backend shows "Server running on port 5000"
- ✅ Frontend opens at localhost:3000
- ✅ Can see cars on the website
- ✅ Can login successfully
- ✅ No console errors
- ✅ Images load properly

---

**Remember**: Most issues are resolved by:
1. Checking if all services are running
2. Verifying environment variables
3. Restarting servers
4. Clearing cache
