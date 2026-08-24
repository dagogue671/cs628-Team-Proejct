# Full-Stack Social Media Project Design Document

## Version

**Version:** 1.1\
**Status:** Draft\
**Last Updated:** August 2026

------------------------------------------------------------------------

# 1. Project Overview

## Objective

Develop a **MERN (MongoDB, Express.js, React, Node.js)** social media
web application that demonstrates full-stack development, React
component design, routing, networking, REST APIs, and database
integration.

The application will also be fully containerized using **Docker** to
provide a consistent development and deployment environment.

## Success Criteria

-   Responsive React frontend
-   Landing page with sign-in and sign-up entry points
-   Client-side sign-in and sign-up form validation
-   React Router navigation between public pages
-   RESTful backend API
-   MongoDB persistence
-   Dockerized application
-   CRUD operations
-   Error handling
-   Team collaboration through GitHub
-   Documentation and presentation

------------------------------------------------------------------------

# 2. Project Scope

## Core Features

-   Create Profile
-   Edit Profile
-   Search Friends
-   Add Friends
-   Create Post
-   Edit Post
-   Delete Post
-   Like / Unlike Posts

### Optional Features

-   Profile pictures
-   Notifications
-   Dark Mode
-   Friend Requests
-   Image Uploads

------------------------------------------------------------------------

# 3. Functional Requirements

### User Management

-   Create profile
-   Edit profile
-   View profile

### Friends

-   Search users
-   Add friends
-   View friends

### Posts

-   Create
-   Edit
-   Delete
-   Like/Unlike

------------------------------------------------------------------------

# 4. Non-Functional Requirements

-   Responsive UI
-   Fast page loading
-   REST API architecture
-   Secure password storage
-   Environment variable configuration
-   Docker deployment
-   GitHub collaboration

------------------------------------------------------------------------

# 5. Technology Stack

  Layer              Technology
  ------------------ ------------------------
  Frontend           React, React Router
  Backend            Node.js, Express
  Database           MongoDB
  API                REST
  Containerization   Docker, Docker Compose
  Version Control    Git, GitHub

------------------------------------------------------------------------

# 6. System Architecture

![Social Networking Application – System Architecture](https://drive.google.com/file/d/1QjJJA8vRJCaIYrM3u_Yb3sPbxFrrZWuF/view?usp=sharing)

The system follows a layered architecture with the following components:

- **Web Browser**: Users access the application through a web browser, which serves as the client interface.
- **React Frontend**: Renders the user interface and handles client-side logic. Communicates with the backend via REST API.
- **REST API**: Defines the contract for communication between frontend and backend, handling HTTP requests and responses.
- **Express Backend**: Processes requests, applies business logic, and performs CRUD operations through the database.
- **MongoDB**: Persists application data including users, posts, likes, and other information.

Docker Compose manages communication between all services.

------------------------------------------------------------------------

# 7. Docker Architecture

## Containers

### Frontend

-   React Application
-   Development Server

### Backend

-   Express API
-   Business Logic

### Database

-   MongoDB
-   Persistent Docker Volume

------------------------------------------------------------------------

## Docker Compose

Services:

-   frontend
-   backend
-   mongodb

Shared Docker Network:

-   social-network

Persistent Volumes:

-   mongo-data

------------------------------------------------------------------------

## Ports

  Service   Port
  --------- -------
    Frontend  8080
  Express   5000
  MongoDB   27017

------------------------------------------------------------------------

## Environment Variables

Backend

    PORT=5000
    MONGO_URI=
    JWT_SECRET=

Frontend

    VITE_API_URL=

------------------------------------------------------------------------

## Docker Files

    frontend/
        Dockerfile

    backend/
        Dockerfile

    docker-compose.yml

    .dockerignore

------------------------------------------------------------------------

## Development Workflow

Before starting the full stack, run the application checks locally:

    cd frontend
    npm install
    npm run build
    cd ..
    node --check backend/src/server.js

Then build and start the Docker services from the repository root:

    docker compose up --build -d

The production frontend is built inside the frontend image and served by
Nginx on port 8080. The backend is available on port 5000.

### Refreshing stale images

Docker can retain an older frontend image after source changes. Recreate
the project images when the browser does not show the latest code:

    docker compose down
    docker compose down --rmi local
    docker compose build --no-cache
    docker compose up -d --force-recreate

Check the running services with:

    docker compose ps

The `--rmi local` option removes images created by this compose project.
The `--no-cache` option forces all Dockerfile steps to run again. Do not
use `docker compose down --volumes` unless the local MongoDB data should
also be deleted. Avoid `docker system prune -a` unless unused resources
from all Docker projects have been reviewed.

This workflow supports consistent, repeatable Docker builds. Live
reloading is not configured for the current production-style frontend
container.

------------------------------------------------------------------------

## Production Considerations

-   Multi-stage Docker builds
-   Non-root containers
-   Small production images
-   Environment variable injection

------------------------------------------------------------------------

# 8. Database Design

## User

    _id
    username
    email
    password
    bio
    friends[]
    createdAt

## Post

    _id
    author
    content
    likes[]
    createdAt
    updatedAt

------------------------------------------------------------------------

# 9. REST API Design

## Users

GET /users

GET /users/:id

POST /users

PUT /users/:id

DELETE /users/:id

------------------------------------------------------------------------

## Posts

GET /posts

GET /posts/:id

POST /posts

PUT /posts/:id

DELETE /posts/:id

POST /posts/:id/like

------------------------------------------------------------------------

# 10. React Pages

-   Landing page (`/`)
-   Sign-in (`/sign-in`)
-   Sign-up (`/sign-up`)
-   Home
-   Profile
-   Friends
-   Feed
-   Settings

------------------------------------------------------------------------

# 11. React Components

-   LandingPage
-   SigninForm
-   SignupForm
-   Navbar
-   Sidebar
-   Profile Card
-   Post Card
-   Friend Card
-   Search Bar
-   Forms
-   Buttons

------------------------------------------------------------------------

# 12. Error Handling

-   API failures
-   Invalid input
-   Network issues
-   Missing resources
-   Friendly error messages
-   Sign-in and sign-up forms display submission errors and loading states

------------------------------------------------------------------------

# 13. Security

-   Password hashing
-   Input validation
-   Environment variables
-   CORS
-   JWT authentication (future enhancement)

The current sign-in and sign-up forms are frontend-only. Their optional
`onSubmit` callbacks are placeholders for future API integration; no
credentials are sent to the backend yet.

------------------------------------------------------------------------

# 14. Team Responsibilities

Each member implements at least one major feature.

Example:

Member 1

-   Authentication
-   Profiles

Member 2

-   Friends

Member 3

-   Posts

------------------------------------------------------------------------

# 15. GitHub Workflow

-   Feature branches
-   Pull Requests
-   Code Reviews
-   Weekly merges

------------------------------------------------------------------------

# 16. Testing

Frontend

-   Component testing
-   Routing for `/`, `/sign-in`, and `/sign-up`
-   Sign-in and sign-up form validation
-   API integration

Backend

-   Endpoint testing
-   CRUD testing
-   Validation

Docker

-   Container startup
-   Service communication
-   Volume persistence

------------------------------------------------------------------------

# 17. Deliverables

-   MERN Application
-   Dockerized Deployment
-   GitHub Repository
-   README.md
-   MEETINGS.md
-   Report
-   Presentation
-   Demo Video

------------------------------------------------------------------------

# 18. Future Enhancements

-   Authentication
-   Image uploads
-   Messaging
-   Notifications
-   WebSockets
-   Mobile support

------------------------------------------------------------------------

# 19. Open Questions

-   Authentication method?
-   Image hosting?
-   Deployment platform?
-   CI/CD pipeline?

------------------------------------------------------------------------

# 20. Revision History

  Version   Date       Changes
  --------- ---------- ---------------------------
  1.0       Aug 2026   Initial design
  1.1       Aug 2026   Added Docker architecture and system architecture diagram

