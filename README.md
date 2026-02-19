# Task Manager API

A simple REST API for managing tasks with priority levels and completion status.

## Features

- Create, read, update, and delete tasks
- Assign priority levels (low, medium, high)
- Mark tasks as complete
- Health check endpoint

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Testing:** Jest + Supertest
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-manager-api

# Install dependencies
npm install
```

### Running the API

```bash
# Start the server
npm start

# Start with auto-reload (development)
npm run dev
```

The API will be available at `http://localhost:3000`

### Running Tests

```bash
# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

### Health Check

```
GET /health
```

Returns the health status of the API.

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Request/Response Examples

#### Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Complete the tutorial", "priority": "high"}'
```

Response:
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Complete the tutorial",
  "completed": false,
  "priority": "high",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### List All Tasks

```bash
curl http://localhost:3000/tasks
```

#### Get a Single Task

```bash
curl http://localhost:3000/tasks/1
```

#### Update a Task

```bash
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

#### Delete a Task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Project Structure

```
task-manager-api/
├── src/
│   ├── app.js              # Express app setup
│   ├── index.js            # Server entry point
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── task.js
│   ├── routes/
│   │   └── tasks.js
│   └── middleware/
│       └── errorHandler.js
├── tests/
│   └── tasks.test.js
├── docs/
│   └── SPRINT_0_PLANNING.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── package.json
└── README.md
```

## CI/CD

This project uses GitHub Actions for continuous integration. The pipeline:

- Runs on every push and pull request to `main`
- Tests against Node.js 18.x and 20.x
- Runs the full test suite
- Checks for syntax errors

## License

ISC
