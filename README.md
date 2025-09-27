# Portfolio Website with Admin Panel

A simple portfolio website with a React frontend and Node.js + Express backend, where an admin can add/update/delete projects and skills. The public can only view the portfolio.

## Features

- **Public**

    - View portfolio projects

    - View skills

- **Admin Only**

    - Login with email and password

    - Add new projects

    - Update existing projects

    - Delete projects

    - Add new skills

    - Update existing skills

    - Delete skills

## Tech Stack

- Frontend: React, Tailwind CSS

- Backend: Node.js, Express.js

- Database: MongoDB (Atlas)

- Authentication: JWT (JSON Web Tokens)

- Password Security: bcrypt

----

**Folder Structure**

```pgsql

| portfolio-project/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ middlewares/
│  └─ index.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ App.jsx
│  └─ package.json
└─ .gitignore

```
## Setup Instructions
1. Clone the repository

```bash

git clone <your-repo-url>
cd portfolio-project

```

2. Backend Setup

```bash

cd backend
npm install

```

- Create a .env file:

```ini

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

```


- Start the backend server:

```bash

npm run dev

```
3. Frontend Setup

```bash

cd frontend
npm install
npm start

```

- Frontend runs at http://localhost:3000 by default

## API Endpoints

**Admin**

- ` POST /admin/login ` → Admin login (returns JWT)

**Projects**

- ` GET /projects ` → Fetch all projects (public)

- ` POST /projects ` → Add new project (admin only)

- ` PUT /projects/:id ` → Update project (admin only)

- ` DELETE /projects/:id ` → Delete project (admin only)

**Skills**

- ` GET /skills ` → Fetch all skills (public)

- ` POST /skills ` → Add new skill (admin only)

- ` PUT /skills/:id ` → Update skill (admin only)

- ` DELETE /skills/:id ` → Delete skill (admin only)

## Security

- Admin routes protected by JWT authentication

- Admin password hashed with bcrypt

- Input validation on backend

## Future Improvements

- Add admin dashboard UI with React

- Add image upload for projects

- Add categories for projects

- Implement role-based access control for multiple admins

## License

**This project is free to use for personal and educational purposes.**

