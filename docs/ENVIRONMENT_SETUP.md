# Environment Variables Setup

## 🚨 Quick Fix for MongoDB Error

You're seeing this error because the environment variables weren't copied when we migrated to the monorepo structure.

### Error Message:
```
MongoDB connection error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

### Solution:

**Create a `.env.local` file in `apps/admin/` directory:**

```bash
cd /Users/marlonm/other/reacterial/apps/admin
nano .env.local  # or use your preferred editor
```

**Add the following content:**

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-min-32-characters
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (if you're using Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Base URL for API calls
BASE_URL=http://localhost:3000
```

---

## 📝 Environment Variable Details

### Required Variables

#### 1. **MONGODB_URI** (Required)
Your MongoDB connection string.

**Option A: Local MongoDB (Recommended for Development)**

Using MongoDB Compass locally:

```env
MONGODB_URI=mongodb://localhost:27017/reacterial
```

**Setup Steps:**
1. Install MongoDB Community Server
   ```bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. Open MongoDB Compass and connect to `mongodb://localhost:27017`

3. Create database:
   - Database Name: `reacterial`
   - Collection Name: `users`

**Option B: MongoDB Atlas (Cloud)**

**Format:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

**Example:**
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/reacterial?retryWrites=true&w=majority
```

**Where to get it:**
- MongoDB Atlas Dashboard → Clusters → Connect → Connect your application
- Copy the connection string
- Replace `<password>` with your actual password
- Replace `<database>` with your database name (e.g., `reacterial`)

---

#### 2. **NEXTAUTH_SECRET** (Required)
A secret key for NextAuth.js session encryption.

**Generate a secure secret:**
```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online
# Visit: https://generate-secret.vercel.app/32
```

**Example:**
```
NEXTAUTH_SECRET=YourRandomSecretKeyHere32CharactersOrMore
```

---

#### 3. **NEXTAUTH_URL** (Required for production)
The canonical URL of your site.

**Development:**
```
NEXTAUTH_URL=http://localhost:3000
```

**Production:**
```
NEXTAUTH_URL=https://www.reacterial.com
```

---

### Optional Variables

#### 4. **GOOGLE_CLIENT_ID** & **GOOGLE_CLIENT_SECRET** (Optional)
Required only if you're using Google OAuth for login.

**Where to get them:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**Example:**
```
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstu
```

---

#### 5. **BASE_URL** (Optional)
Base URL for internal API calls.

**Example:**
```
BASE_URL=http://localhost:3000
```

---

## 🚀 Quick Start Steps

### Step 1: Create the File
```bash
cd apps/admin
touch .env.local
```

### Step 2: Add Your Credentials

Open `.env.local` and add:

```env
# Minimum required for local development
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/reacterial?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000
BASE_URL=http://localhost:3000
```

### Step 3: Restart Your Dev Server
```bash
# Stop the current dev server (Ctrl+C)
# Then restart
pnpm dev
```

### Step 4: Test Login
Try logging in with:
- **Email**: `admin@reacterial.com`
- **Password**: `admin123`

---

## 🔒 Security Best Practices

### ✅ Do's
- ✅ Keep `.env.local` in your `.gitignore` (already done)
- ✅ Use different secrets for development and production
- ✅ Use strong, random NEXTAUTH_SECRET
- ✅ Rotate secrets periodically
- ✅ Use environment-specific MongoDB databases

### ❌ Don'ts
- ❌ Never commit `.env.local` to git
- ❌ Never share secrets publicly
- ❌ Don't use simple/guessable secrets
- ❌ Don't reuse production secrets in development

---

## 📁 File Locations

### Monorepo Structure
```
reacterial/
├── apps/
│   └── admin/
│       ├── .env.local          ← Create this file
│       ├── .env.local.example  ← Template (committed to git)
│       └── ...
└── .env.local.sample           ← Root template (for reference)
```

### Why in `apps/admin/`?
- Each app in a monorepo can have its own environment variables
- Admin app runs from `apps/admin/` directory
- Next.js looks for `.env.local` in the app root

---

## 🧪 Testing Database Connection

### Test MongoDB Connection
```bash
cd apps/admin
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  });
"
```

---

## 🐛 Troubleshooting

### Error: "uri parameter must be a string"
**Cause**: MONGODB_URI is not set or is undefined  
**Solution**: Make sure `.env.local` exists in `apps/admin/` with MONGODB_URI

### Error: "Authentication failed"
**Cause**: Wrong MongoDB username/password  
**Solution**: Check your MongoDB Atlas credentials

### Error: "Could not connect to any servers"
**Cause**: Network issue or wrong cluster URL  
**Solution**: 
- Check your MongoDB cluster URL
- Ensure your IP is whitelisted in MongoDB Atlas
- Try from MongoDB Atlas: Network Access → Add IP Address → Add Current IP

### Environment variables not loading
**Cause**: File in wrong location or server not restarted  
**Solution**:
1. Ensure `.env.local` is in `apps/admin/` directory
2. Restart the dev server
3. Check file name (must be exactly `.env.local`, not `.env` or `.env.local.txt`)

---

## 📋 Checklist

- [ ] Create `apps/admin/.env.local` file
- [ ] Add MONGODB_URI with your connection string
- [ ] Generate and add NEXTAUTH_SECRET
- [ ] Add NEXTAUTH_URL=http://localhost:3000
- [ ] Add BASE_URL=http://localhost:3000
- [ ] Save the file
- [ ] Restart dev server (`pnpm dev`)
- [ ] Test login functionality

---

## 🔗 Useful Resources

- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [NextAuth.js Environment Variables](https://next-auth.js.org/configuration/options#environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

---

**Last Updated**: October 21, 2025  
**Project**: Reacterial Monorepo v0.1.0

