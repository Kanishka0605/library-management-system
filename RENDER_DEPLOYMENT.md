# Deploying to Render

## Environment Variables Setup

In your Render dashboard, add these environment variables:

### Required Variables:

1. **MONGO_URI**
   ```
   mongodb+srv://kanishkanaik40_db_user:Uf5fOQjZwPPQBgUL@cluster0.nkxqksz.mongodb.net/library
   ```
   (Or use your own MongoDB connection string)

2. **JWT_SECRET**
   ```
   your_strong_random_secret_key_here
   ```
   Generate a secure random string (recommended: 32+ characters)

3. **NODE_ENV**
   ```
   production
   ```

4. **PORT** (Optional - Render sets this automatically)
   ```
   4000
   ```

## Deployment Steps:

1. **Create Web Service on Render:**
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Kanishka0605/library-management-system`

2. **Configure Service:**
   - **Name:** library-management-system
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

3. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add the variables listed above

4. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically deploy your app

## After Deployment:

Your backend API will be available at:
```
https://your-service-name.onrender.com
```

### Update Frontend:

Update the API URL in your `login.html` and `books.html` files:

Change:
```javascript
const API_BASE_URL = 'http://localhost:4000/api';
```

To:
```javascript
const API_BASE_URL = 'https://your-service-name.onrender.com/api';
```

## Testing:

Test your deployed API:
```bash
curl https://your-service-name.onrender.com/
```

You should see:
```json
{"success":true,"message":"Library API is running"}
```

## Notes:

- Free tier on Render may spin down after inactivity
- First request after inactivity may take 30-60 seconds
- Consider upgrading to paid tier for always-on service
