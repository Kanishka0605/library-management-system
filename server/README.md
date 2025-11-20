# Library Backend

Simple Node/Express/MongoDB backend for the Library Login demo.

Setup
1. Change to server directory:

```powershell
cd e:\simple\server
```

2. Install dependencies:

```powershell
npm install
```

3. Start server:

```powershell
npm start
```

Notes
- The server will seed a test user `studentId: 12345`, password `password123` and sample books on first run.
- Configure `MONGO_URI` and `JWT_SECRET` in environment variables for production.
