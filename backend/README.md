"# Course Selling Platform - Backend

A Node.js and Express-based backend API for an online course selling platform. This application enables users to create, manage, and purchase courses with image uploads to Cloudinary.

## Features

- **User Authentication & Authorization** - Secure user registration and login
- **Course Management** - Create, read, update, and delete courses
- **Image Upload** - Thumbnail upload via Cloudinary CDN
- **User Middleware** - Protected routes with user validation
- **MongoDB Integration** - Persistent data storage

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **File Upload:** Multer
- **Environment:** dotenv

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   ├── cloudinary.js   # Cloudinary setup
│   │   └── env.js          # Environment variables
│   ├── controllers/
│   │   ├── course.controller.js  # Course logic
│   │   └── user.controller.js    # User logic
│   ├── middleware/
│   │   ├── multer.js       # File upload middleware
│   │   └── user.middleware.js    # Auth middleware
│   ├── models/
│   │   ├── course.model.js # Course schema
│   │   └── user.model.js   # User schema
│   ├── routes/
│   │   ├── course.routes.js # Course endpoints
│   │   └── user.routes.js   # User endpoints
│   └── index.js            # Entry point
└── package.json
```

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the backend directory
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `CLOUDINARY_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |

## Getting Started

1. **Start the server**
   ```bash
   npm start
   ```

2. **Development mode with auto-reload**
   ```bash
   npm run dev
   ```

3. Server will run on `http://localhost:3000`

## API Endpoints

### User Routes (`/api/v1/users`)
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/:id` - Get user profile

### Course Routes (`/api/v1/courses`)
- `POST /api/v1/courses` - Create course (requires auth, file upload)
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course details
- `PUT /api/v1/courses/:id` - Update course (requires auth)
- `DELETE /api/v1/courses/:id` - Delete course (requires auth)

## Create Course Example

**Request:**
```bash
POST /api/v1/courses
Content-Type: multipart/form-data

{
  "title": "JavaScript Basics",
  "description": "Learn JavaScript from scratch",
  "amount": 29.99,
  "thumbnail": [image file]
}
```

**Response:**
```json
{
  "message": "Course Created Successfully",
  "newCourse": {
    "_id": "6756a4c3f5e8b2c9d4e1f2g3",
    "userId": "6756a4c3f5e8b2c9d4e1f2g2",
    "title": "JavaScript Basics",
    "description": "Learn JavaScript from scratch",
    "thumbnail": "https://res.cloudinary.com/...",
    "amount": 29.99
  }
}
```

## Dependencies

```json
{
  "express": "^4.x.x",
  "mongoose": "^7.x.x",
  "cloudinary": "^1.x.x",
  "multer": "^1.x.x",
  "jsonwebtoken": "^9.x.x",
  "dotenv": "^16.x.x"
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing fields)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Middleware

- **Multer** - Handles file uploads (thumbnail images)
- **User Middleware** - Validates JWT tokens and attaches user to request

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT" 
