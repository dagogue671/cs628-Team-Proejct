# CS628 Social Media App

This repository is a baseline template for building a full-stack social media application with the MERN stack. It provides a working, containerized foundation that can be extended with profiles, posts, friends, authentication, likes, notifications, and other social features.

## Technology stack

- MongoDB for persistent application data
- Express.js and Node.js for the REST API
- React and Vite for the frontend
- Nginx for serving the production frontend build
- Docker Compose for running the complete stack

## Project structure

```text
frontend/           React/Vite frontend and Nginx configuration
backend/            Express API and MongoDB connection
docker-compose.yml  Frontend, backend, and MongoDB services
DESIGN_DOC.md       Application design and planned features
```

## Prerequisites

Install Docker Desktop and make sure its Linux container engine is running. Verify Docker from PowerShell or Linux Terminal:

```
docker version
docker compose version
```

Both commands should complete successfully before starting the application.

## Run the application

From the repository root, build the images and start all services:

```
docker compose up --build
```

To run the containers in the background instead:

```
docker compose up --build -d
```

Once the services are running, open or test:

- React frontend: http://localhost:8080
- Express API health check: http://localhost:5000/api/health
- MongoDB: `localhost:27017`

The health endpoint returns the API status and MongoDB connection state.

## Stop the application

Stop and remove the application containers and network:

```
docker compose down
```

MongoDB data remains in the `mongo-data` Docker volume. To remove that data too:

```
docker compose down --volumes
```

> `docker compose down --volumes` permanently removes the local database volume for this project.

## Useful commands

```
# Show container status
docker compose ps

# Follow logs from all services
docker compose logs -f

# Rebuild only the frontend
docker compose build frontend

# Rebuild and restart after changing dependencies or Dockerfiles
docker compose up --build -d
```

## Baseline API

The template currently includes:

```
GET /api/health
```

It confirms that the Express server is running and reports whether Mongoose is connected to MongoDB. Add new API routes under `backend/src` and new React pages and components under `frontend/src`.