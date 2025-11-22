# Deployment Guide - Swat Car Rental

Complete guide to deploy your car rental website to production.

---

## 📦 Architecture

- **Frontend (React)** → Vercel
- **Backend (Node.js)** → Render.com
- **Database** → MongoDB Atlas

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" (M0 Shared)
   - Select closest region (e.g., Mumbai for Pakistan)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" → "Add New Database User"
   - Username: `swatcarrental`
   - Password: Generate strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://swatcarrental:<password>@cluster0.xxxxx.mongodb.net/swat-car-rental?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Save this for later!

---

## 🚀 Step 2: Deploy Backend to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `car-rental-website`
   - Configure:
     - **Name**: `swat-car-rental-api`
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://swatcarrental:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/swat-car-rental?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=30d
   
   JAZZCASH_MERCHANT_ID=MC12345
   JAZZCASH_PASSWORD=test_password
   JAZZCASH_INTEGRITY_SALT=test_salt
   JAZZCASH_RETURN_URL=https://your-frontend-url.vercel.app/payment/success
   
   EASYPAISA_STORE_ID=store12345
   EASYPAISA_API_KEY=test_api_key
   EASYPAISA_RETURN_URL=https://your-frontend-url.vercel.app/payment/success
   
   BACKEND_URL=https://swat-car-rental-api.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://swat-car-rental-api.onrender.com`

5. **Import Sample Data** (Optional)
   - Go to your service → "Shell"
   - Run: `npm run data:import`

---

## 🌐 Step 3: Deploy Frontend to Vercel

1. **Update API URL in Frontend**
   
   Create/Update `client/.env.production`:
   ```env
   VITE_API_URL=https://swat-car-rental-api.onrender.com
   ```

2. **Push Changes to GitHub**
   ```bash
   cd /d/OneDrive/Desktop/Project2
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import `car-rental-website` repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   
4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://swat-car-rental-api.onrender.com
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at: `https://your-project.vercel.app`

---

## ✅ Step 4: Verify Deployment

1. **Test Frontend**
   - Visit your Vercel URL
   - Check if homepage loads with beautiful backgrounds

2. **Test Backend API**
   - Visit: `https://swat-car-rental-api.onrender.com/api/health`
   - Should return: `{"message": "Server is running"}`

3. **Test Full Integration**
   - Try browsing cars
   - Test user registration
   - Create a booking
   - Test admin login: admin@swatcarrental.com / admin123

---

## 🔧 Common Issues & Fixes

### Issue: Vercel 404 Error
**Solution**: Make sure Root Directory is set to `client`

### Issue: Backend API not responding
**Solution**: 
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set

### Issue: CORS errors
**Solution**: Update `server/server.js` to allow your Vercel domain:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-project.vercel.app']
}));
```

### Issue: Images not loading
**Solution**: Render free tier doesn't support file uploads. Use:
- Cloudinary for image hosting
- Or keep using placeholder images

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Backend sleeps after 15 min of inactivity (first request may be slow)
   - Vercel: Unlimited bandwidth for frontend
   - MongoDB Atlas: 512MB storage limit

2. **Custom Domain** (Optional):
   - In Vercel → Settings → Domains
   - Add your custom domain

3. **Environment Variables Security**:
   - Never commit `.env` files to GitHub
   - Update JWT_SECRET in production
   - Get real payment gateway credentials for production

---

## 🎉 Your Live URLs

After deployment:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://swat-car-rental-api.onrender.com`
- **Admin Panel**: `https://your-project.vercel.app/admin`

**Admin Credentials**:
- Email: admin@swatcarrental.com
- Password: admin123

---

## 📞 Support

If you face any issues during deployment, check:
1. Render logs for backend errors
2. Vercel deployment logs for frontend errors
3. Browser console for API connection issues

---

Happy Deploying! 🚀
