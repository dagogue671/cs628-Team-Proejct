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

    Browser
        │
    React Frontend
        │
    REST API
        │
    Express Backend
        │
    MongoDB

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
  React     3000
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

    docker compose up --build

Supports:

-   Hot Reloading
-   Shared Volumes
-   Consistent Development Environment

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

-   Home
-   Profile
-   Friends
-   Feed
-   Settings

------------------------------------------------------------------------

# 11. React Components

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

------------------------------------------------------------------------

# 13. Security

-   Password hashing
-   Input validation
-   Environment variables
-   CORS
-   JWT authentication (future enhancement)

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
-   Routing
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
  1.1       Aug 2026   Added Docker architecture
