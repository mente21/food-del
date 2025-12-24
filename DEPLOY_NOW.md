# 🎯 QUICK START - Deploy Frontend & Admin

## ✅ What's Done
- ✅ Backend deployed and working
- ✅ Environment files created
- ✅ Hardcoded URLs fixed

## 🚀 Deploy Now (5 Minutes)

### 1️⃣ Deploy Frontend

**Go to:** https://vercel.com/new

**Settings:**
```
Repository: mente21/food-del
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

**Environment Variable:**
```
VITE_BACKEND_URL=https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app
```

Click **Deploy** ✅

---

### 2️⃣ Deploy Admin

**Go to:** https://vercel.com/new

**Settings:**
```
Repository: mente21/food-del
Root Directory: admin
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

**Environment Variable:**
```
VITE_BACKEND_URL=https://food-del-backend-2rvp8x95n-mente21s-projects.vercel.app
```

Click **Deploy** ✅

---

### 3️⃣ Update Backend CORS

After getting your frontend and admin URLs:

1. Go to backend project in Vercel
2. Settings → Environment Variables
3. Add/Update:
   - `FRONTEND_URL` = your frontend URL
   - `ADMIN_URL` = your admin URL
4. Redeploy backend

---

## ✅ Done!

Test your apps:
- Frontend: Browse products, add to cart, checkout
- Admin: Login, add products, manage orders
- Backend: Visit `/health` to verify all configs

---

## 📋 Deployment Checklist

- [ ] Frontend deployed
- [ ] Admin deployed
- [ ] Backend CORS updated
- [ ] Backend redeployed
- [ ] All apps tested and working

**Need detailed help?** See `FRONTEND_ADMIN_DEPLOYMENT.md`
