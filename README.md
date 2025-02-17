# Blog Management System API

Welcome to the Blog Management System API! This API provides a comprehensive solution for managing users, blogs, and authentication within a blogging platform. It is built using Node.js, Express.js, and MongoDB, and follows RESTful principles for easy integration with front-end applications.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Authentication & Authorization](#authentication--authorization)
8. [Validation](#validation)
9. [Database Models](#database-models)
10. [Contributing](#contributing)
11. [License](#license)
12. [Deployment & Repository Links](#deployment--repository-links)

---

## Features

- **User Management**:
  - Create, block, and delete users.
  - Assign roles (`admin` or `user`) to users.
  - Fetch user details by ID or all users.
- **Blog Management**:
  - Create, update, delete, and fetch blogs.
  - Filter blogs by author, search by title or content, and sort by fields.
- **Authentication**:
  - User registration and login with JWT-based authentication.
  - Role-based access control for protected routes.
- **Error Handling**:
  - Centralized error handling with detailed error messages.
  - Support for validation, duplicate key, cast, and generic errors.
- **Validation**:
  - Request validation using Zod schemas for all endpoints.

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for ODM)
- **Authentication**:
  - JSON Web Tokens (JWT)
  - Bcrypt for password hashing
- **Validation**:
  - Zod for schema validation
- **Error Handling**:
  - Custom error handlers for various error types
- **Environment Management**:
  - Dotenv for environment variables
- **API Documentation**:
  - Markdown-based README

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saurav11sarkar/blog-management-system.git
   cd blog-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:

   ```bash
   npm run dev
   ```

5. The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development
PORT=5000
DB_URL=mongodb://localhost:27017/blogdb
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
ROUNDS=10
```

---

## API Endpoints

### Base URL: `http://localhost:5000/api`

### Auth Routes

- **POST `/auth/register`**: Register a new user.
- **POST `/auth/login`**: Log in and receive a JWT token.

### User Routes (Admin Only)

- **POST `/admin/create-user`**: Create a new user (admin only).
- **PATCH `/admin/users/:userId/block`**: Block a user (admin only).
- **GET `/admin/user`**: Fetch all users (admin only).
- **GET `/admin/user/:userId`**: Fetch a user by ID (admin only).
- **DELETE `/admin/blogs/:id`**: Delete a blog (admin only).

### Blog Routes

- **POST `/blogs`**: Create a new blog (authenticated users only).
- **GET `/blogs`**: Fetch all blogs.
- **GET `/blogs/:id`**: Fetch a blog by ID.
- **PATCH `/blogs/:id`**: Update a blog (authenticated users only).
- **DELETE `/blogs/:id`**: Delete a blog (authenticated users only).

---

## Error Handling

The API uses a centralized error-handling middleware to catch and format errors. Errors are categorized into:

- **Validation Errors**: Invalid request data.
- **Duplicate Key Errors**: Unique field conflicts (e.g., duplicate email).
- **Cast Errors**: Invalid MongoDB ObjectId.
- **Zod Errors**: Schema validation errors.
- **Generic Errors**: All other errors.

Example error response:

```json
{
  "success": false,
  "message": "Validation Error",
  "errorMessages": [{ "path": "email", "message": "Email is required" }]
}
```

---

## Authentication & Authorization

- **Authentication**: Users must log in to receive a JWT token, which is sent in the `Authorization` header as `Bearer <token>`.
- **Authorization**: Role-based access control is implemented using middleware. For example:
  - Only `admin` users can create or block other users.
  - Only authenticated users can create, update, or delete blogs.

---

## Validation

All incoming requests are validated using Zod schemas. Example validation rules:

- **User Registration**:
  - `name`: Required, string.
  - `email`: Required, valid email format.
  - `password`: Required, minimum 6 characters.
- **Blog Creation**:
  - `title`: Required, string.
  - `content`: Required, string.
  - `author`: Required, valid MongoDB ObjectId.

---

## Database Models

### User Model

```typescript
interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
```

### Blog Model

```typescript
interface IBlog {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  isPublished: boolean;
}
```

---

## Deployment & Repository Links

- **Live Deployment Link (Server)**: `https://blog-api-jet.vercel.app/`
- **GitHub Repository (Server)**: `https://github.com/saurav11sarkar/blog-management-system`

### Admin Login Credentials

```json
{
  "email": "adminuser@gmail.com",
  "password": "admin123"
}
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Blog Management System API! For any questions or issues, please open an issue on GitHub. Happy coding! 🚀
