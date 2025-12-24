# 🚀 Complete Deployment Guide - Frontend & Admin

## ✅ Backend Status
**Backend URL:** https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app
**Status:** ✅ Working

---

## 📦 Deploy Frontend (Customer App)

### Method 1: Using Vercel Dashboard (Recommended)

#### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**

#### Step 2: Import Repository
1. Click **"Import Git Repository"**
2. Select your GitHub repository: `mente21/food-del`
3. Click **"Import"**

#### Step 3: Configure Frontend Project
Set the following configuration:

**Project Name:** `food-del-frontend` (or your preferred name)

**Framework Preset:** Vite

**Root Directory:** `frontend` ⚠️ IMPORTANT!

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_BACKEND_URL` | `https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app` |

Select: ✅ Production ✅ Preview ✅ Development

#### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a URL like: `https://food-del-frontend-xxx.vercel.app`

---

## 🛠️ Deploy Admin Panel

### Method 1: Using Vercel Dashboard (Recommended)

#### Step 1: Create New Project
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**

#### Step 2: Import Repository
1. Click **"Import Git Repository"**
2. Select your GitHub repository: `mente21/food-del`
3. Click **"Import"**

#### Step 3: Configure Admin Project
Set the following configuration:

**Project Name:** `food-del-admin` (or your preferred name)

**Framework Preset:** Vite

**Root Directory:** `admin` ⚠️ IMPORTANT!

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_BACKEND_URL` | `https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app` |

Select: ✅ Production ✅ Preview ✅ Development

#### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a URL like: `https://food-del-admin-xxx.vercel.app`

---

## 🔄 Update Backend with Frontend & Admin URLs

After both frontend and admin are deployed:

### Step 1: Get Your Deployment URLs
- Frontend URL: `https://your-frontend.vercel.app`
- Admin URL: `https://your-admin.vercel.app`

### Step 2: Update Backend Environment Variables
1. Go to your **backend project** in Vercel
2. Click **Settings** → **Environment Variables**
3. Update or add these variables:

| Name | Value |
|------|-------|
| `FRONTEND_URL` | `https://your-frontend.vercel.app` |
| `ADMIN_URL` | `https://your-admin.vercel.app` |

### Step 3: Redeploy Backend
1. Go to **Deployments** tab
2. Click latest deployment → **⋯** → **Redeploy**

---

## 🎯 Method 2: Using Vercel CLI (Alternative)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `food-del-frontend`
- In which directory is your code located? `./`
- Want to override settings? **Y**
- Build Command: `npm run build`
- Output Directory: `dist`
- Development Command: `npm run dev`

### Deploy Admin
```bash
cd ../admin
vercel --prod
```

Follow the same prompts, but use `food-del-admin` as the project name.

---

## ✅ Post-Deployment Checklist

### Frontend Testing
- [ ] Visit your frontend URL
- [ ] Check if the homepage loads correctly
- [ ] Test product listing
- [ ] Test adding items to cart
- [ ] Test user registration/login
- [ ] Test placing an order
- [ ] Check if images load from Cloudinary

### Admin Testing
- [ ] Visit your admin URL
- [ ] Test admin login
- [ ] Test adding new food items
- [ ] Test uploading images
- [ ] Test viewing orders
- [ ] Test updating order status

### Backend Testing
- [ ] Visit: `https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app/`
- [ ] Should show: "API working"
- [ ] Visit: `https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app/health`
- [ ] Should show all configs as "configured"

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to fetch" or CORS errors
**Cause:** Backend CORS not configured with frontend/admin URLs

**Solution:**
1. Update `FRONTEND_URL` and `ADMIN_URL` in backend environment variables
2. Redeploy backend
3. Clear browser cache and try again

### Issue 2: Images not loading
**Cause:** Cloudinary not configured properly

**Solution:**
1. Verify Cloudinary credentials in backend environment variables
2. Check if images are uploaded to Cloudinary dashboard
3. Ensure Cloudinary URLs are accessible

### Issue 3: "Cannot read properties of undefined"
**Cause:** Environment variable not loaded

**Solution:**
1. Verify `VITE_BACKEND_URL` is set in Vercel dashboard
2. Redeploy the project
3. Check browser console for the actual backend URL being used

### Issue 4: Build fails with "Module not found"
**Cause:** Dependencies not installed or missing

**Solution:**
1. Check `package.json` for all dependencies
2. Try deploying again (Vercel will reinstall)
3. Check build logs for specific missing modules

### Issue 5: Blank page after deployment
**Cause:** Routing issue or build configuration

**Solution:**
1. Verify `vercel.json` has the rewrite rule for SPA routing
2. Check browser console for errors
3. Verify build output directory is `dist`

---

## 📊 Monitoring Your Deployments

### Check Deployment Status
1. Go to Vercel Dashboard
2. Click on your project
3. View **Deployments** tab
4. Check build logs for any errors

### View Function Logs (Backend only)
1. Click on a deployment
2. Click **View Function Logs**
3. Monitor real-time requests and errors

### Analytics
1. Go to your project in Vercel
2. Click **Analytics** tab
3. View traffic, performance, and errors

---

## 🔐 Security Recommendations

### Before Going Live:

1. **Update JWT Secret**
   - Generate a strong random string
   - Update in backend environment variables

2. **Secure Stripe Keys**
   - Use production Stripe keys (not test keys)
   - Keep secret keys in environment variables only

3. **MongoDB Security**
   - Use strong database password
   - Restrict IP access if possible
   - Enable MongoDB Atlas backup

4. **Environment Variables**
   - Never commit `.env` files to Git
   - Use different values for production vs development
   - Rotate secrets periodically

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain to Frontend
1. Go to your frontend project in Vercel
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `www.yourfoodapp.com`)
4. Follow DNS configuration instructions

### Add Custom Domain to Admin
1. Go to your admin project in Vercel
2. Click **Settings** → **Domains**
3. Add subdomain (e.g., `admin.yourfoodapp.com`)
4. Follow DNS configuration instructions

### Add Custom Domain to Backend
1. Go to your backend project in Vercel
2. Click **Settings** → **Domains**
3. Add subdomain (e.g., `api.yourfoodapp.com`)
4. Update `VITE_BACKEND_URL` in frontend and admin
5. Redeploy frontend and admin

---

## 📝 Quick Reference

### Your Deployment URLs

| Service | URL | Status |
|---------|-----|--------|
| Backend | https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app | ✅ Live |
| Frontend | (To be deployed) | ⏳ Pending |
| Admin | (To be deployed) | ⏳ Pending |

### Environment Variables Summary

**Backend:**
- MONGODB_URI
- JWT_SECRET
- STRIPE_SECRET_KEY
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- FRONTEND_URL
- ADMIN_URL
- NODE_ENV=production

**Frontend & Admin:**
- VITE_BACKEND_URL

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check Build Logs** in Vercel dashboard
2. **Check Browser Console** for frontend errors
3. **Check Function Logs** for backend errors
4. **Test API Endpoints** using the `/health` endpoint
5. **Verify Environment Variables** are set correctly

---

## 🎉 Success!

Once all three are deployed:
1. ✅ Backend serving API
2. ✅ Frontend showing products and accepting orders
3. ✅ Admin managing products and orders

**You're live!** 🚀
