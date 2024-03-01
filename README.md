**I. Project introduction**
The website is used for posting.
Frontend: React, Bootstrap, link: https://github.com/TuyetAnh82198/post-app-frontend-using-express-session
Backend: NodeJS, Express, Socket.IO, link: https://github.com/TuyetAnh82198/post-app-backend-using-express-session
Database: MongoDB
Performance optimization: useMemo, useCallback, Helmet, Compression
Language: English
_Using express-session for login function._


**II. Functional description**
Only logged in users can view posts, post, update and delete posts.
Input value validated.
Only accept jpg or jpeg or png image.
The website interface will change if the input value is invalid.
The submit button will not be activated until all fields are entered.


**III. Demo link**
https://post-app-frontend-express-session.onrender.com
*Recommended browser: Firefox


**IV. Deployment guide (on local)**

1. We need to install NodeJS 

2. Frontend:
npm start (localhost 3000) 
Access these file if you want to change localhost:
socket.js, Form.jsx, RootLayout.jsx, Login.jsx, Signup.jsx, View.jsx

3. Backend:
npm start (localhost 5000)
nodemon.json:
{
  "env": {
    "CLIENT_APP": "for example http://localhost:3000",
    "MONGO_USER": "",
    "MONGO_PASS": "",
    "SESSION_SECRET": "",
  }
}
And then update scripts in package.json, for example:
"start": "NODE_ENV=development CLIENT_APP=http://localhost:3000 MONGODB_USER=abc MONGODB_PASS=xyz SESSION_SECRET= nodemon app.js"

**Login information:**
email: abc@gmail.com
pass: 12345678
