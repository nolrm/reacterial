# Vercel Deployment Guide - Monorepo

## 🚀 Deploying Reacterial to Vercel

This guide covers deploying your monorepo to Vercel with the admin app.

---

## 📋 Prerequisites

Before deploying:
- ✅ MongoDB Atlas account (for production database)
- ✅ Vercel account
- ✅ Your project pushed to GitHub/GitLab/Bitbucket
- ✅ All environment variables ready

---

## 🔧 Deployment Steps

### **Step 1: Import Project to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your repository
4. Vercel will detect it's a monorepo

### **Step 2: Configure Build Settings**

In the import screen, configure:

```
Framework Preset: Next.js
Root Directory: apps/admin
Build Command: pnpm build (leave default)
Output Directory: .next (leave default)
Install Command: pnpm install
```

**Important**: Set **Root Directory** to `apps/admin`

### **Step 3: Add Environment Variables**

Click **"Environment Variables"** and add:

#### Required Variables:

**MONGODB_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/reacterial?retryWrites=true&w=majority
```
- Get from MongoDB Atlas
- ⚠️ Use **production** database, not your local one
- Environments: Production, Preview, Development

**NEXTAUTH_SECRET**
```bash
# Generate with:
openssl rand -base64 32
```
- Must be at least 32 characters
- Keep secret and secure
- Environments: Production, Preview, Development

**NEXTAUTH_URL**
```
https://www.reacterial.com
```
- Your production domain
- Vercel will provide this after first deployment
- You can update it later
- Environments: Production

**BASE_URL**
```
https://www.reacterial.com
```
- Same as NEXTAUTH_URL
- Environments: Production

#### Optional Variables (if using Google OAuth):

**GOOGLE_CLIENT_ID**
```
your-google-client-id.apps.googleusercontent.com
```

**GOOGLE_CLIENT_SECRET**
```
GOCSPX-your-google-client-secret
```

### **Step 4: Deploy**

Click **"Deploy"**

Vercel will:
1. Install dependencies with pnpm
2. Build the Next.js app from `apps/admin/`
3. Deploy to a preview URL
4. Provide you with a deployment URL

---

## 🌐 Post-Deployment Setup

### **1. Update NEXTAUTH_URL**

After first deployment:
1. Copy your Vercel URL (e.g., `https://reacterial.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Update `NEXTAUTH_URL` to your actual domain
4. Redeploy

### **2. Update Google OAuth (if used)**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Your OAuth 2.0 credentials
3. Add to **Authorized redirect URIs**:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```

### **3. Configure Custom Domain (Optional)**

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `www.reacterial.com`)
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` and `BASE_URL` to new domain

---

## 📁 Environment Variables Location

### **For Development (Local):**
```
apps/admin/.env.local     ← Your local environment variables
```

### **For Production (Vercel):**
```
Vercel Dashboard → Settings → Environment Variables
```

**Important**: 
- ❌ **Never commit** `.env.local` to git
- ✅ `.env.local` is in `.gitignore`
- ✅ Use Vercel dashboard for production secrets

---

## 🔒 Security Best Practices

### **1. Different Secrets for Different Environments**

```bash
# Production
NEXTAUTH_SECRET=your-production-secret-here

# Preview/Staging
NEXTAUTH_SECRET=your-preview-secret-here

# Development (local .env.local)
NEXTAUTH_SECRET=your-dev-secret-here
```

### **2. Use MongoDB Atlas for Production**

Don't use local MongoDB for production:
- ✅ Create a cluster in MongoDB Atlas
- ✅ Set up proper access controls
- ✅ Whitelist Vercel's IP addresses (or allow all for serverless)

### **3. Environment-Specific Variables**

Vercel allows setting variables per environment:
- **Production** - Live site
- **Preview** - Pull request previews
- **Development** - Local development (but use .env.local instead)

---

## 🔍 Vercel Configuration File

The `vercel.json` in your root directory:

```json
{
  "buildCommand": "cd apps/admin && pnpm build",
  "devCommand": "cd apps/admin && pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": "apps/admin/.next",
  "ignoreCommand": "git diff --quiet HEAD^ HEAD apps/admin/"
}
```

This tells Vercel:
- Which app to build (`apps/admin`)
- Where the build output is
- Only rebuild if `apps/admin/` changes

---

## 🚨 Common Issues & Solutions

### **Issue: "Module not found" errors**

**Cause**: Workspace packages not transpiled

**Solution**: Already configured in `apps/admin/next.config.mjs`:
```javascript
transpilePackages: [
  '@reacterial/ui',
  '@reacterial/auth',
  '@reacterial/theme',
  '@reacterial/utils',
],
```

### **Issue: MongoDB connection timeout**

**Cause**: IP not whitelisted in MongoDB Atlas

**Solution**:
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. For Vercel serverless, allow: `0.0.0.0/0` (all IPs)
4. Or add Vercel's IP ranges

### **Issue: Environment variables not working**

**Cause**: Variables not set in Vercel or wrong environment

**Solution**:
1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure variables are set for the correct environment
3. Redeploy after adding variables

### **Issue: NextAuth redirect loop**

**Cause**: `NEXTAUTH_URL` doesn't match deployment URL

**Solution**:
1. Update `NEXTAUTH_URL` to match your Vercel URL
2. Include protocol: `https://your-domain.vercel.app`
3. Redeploy

---

## 📊 Deployment Workflow

### **Standard Workflow:**

```mermaid
1. Push to GitHub → 2. Vercel detects change → 3. Vercel builds → 4. Vercel deploys
```

### **Branch Deployments:**

- `main` branch → Production deployment
- Feature branches → Preview deployments
- Pull requests → Automatic preview URLs

---

## 🎯 Checklist for First Deployment

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB URI obtained
- [ ] NEXTAUTH_SECRET generated (32+ characters)
- [ ] Google OAuth credentials created (if using)
- [ ] Project pushed to GitHub/GitLab/Bitbucket
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `apps/admin`
- [ ] All environment variables added to Vercel
- [ ] Initial deployment successful
- [ ] NEXTAUTH_URL updated with deployment URL
- [ ] Custom domain configured (if applicable)
- [ ] Google OAuth redirect URIs updated (if using)
- [ ] Test login functionality

---

## 📈 Monitoring & Logs

### **View Deployment Logs:**
1. Go to Vercel Dashboard
2. Select your project
3. Click on a deployment
4. View **Build Logs** and **Runtime Logs**

### **Performance Monitoring:**
- Speed Insights already configured (`@vercel/speed-insights`)
- View analytics in Vercel Dashboard

---

## 🔄 Continuous Deployment

Every push to your repository automatically triggers:
1. **Build**: Vercel builds your app
2. **Preview**: Creates preview URL for testing
3. **Deploy**: Deploys to production (if merged to main)

### **Multiple Apps Deployment:**

When you add more apps to your monorepo:

```
apps/
├── admin/          ← Current deployment
├── customer-portal/  ← Future: separate Vercel project
└── mobile-api/     ← Future: separate Vercel project
```

Each app can be deployed as a separate Vercel project!

---

## 🛠️ Advanced: Multiple Environments

### **Preview Environment Variables:**

Set different values for preview deployments:

```
NEXTAUTH_URL (Preview) = https://preview-reacterial.vercel.app
MONGODB_URI (Preview) = mongodb+srv://...staging-db...
```

### **Environment-Specific Builds:**

```javascript
// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const config = {
  // Production-specific config
};
```

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

## 💡 Tips

1. **Use Preview Deployments** - Test before merging to production
2. **Monitor Build Times** - Optimize if builds are slow
3. **Set Up Alerts** - Get notified of deployment failures
4. **Use Edge Functions** - For better global performance
5. **Enable HTTPS** - Automatically enabled by Vercel

---

**Last Updated**: October 21, 2025  
**Project**: Reacterial Monorepo v0.1.0  
**Deployment Platform**: Vercel

