# Sprint 1 Review

**Sprint Goal:** Deliver core CRUD functionality and establish CI/CD pipeline

**Sprint Duration:** Sprint 1  
**Date:** February 19, 2026

---

## Completed User Stories

### US-1: Create a Task 
**Story Points:** 3

**Acceptance Criteria Met:**
-  API endpoint POST `/tasks` accepts title (required) and description (optional)
-  System returns created task with unique ID and timestamp
-  Title must be a non-empty string
-  Invalid requests (missing title) return 400 error with message

**Demo:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Complete tutorial", "priority": "high"}'
```

**Response:**
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Complete tutorial",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-02-19T18:50:00.000Z",
  "updatedAt": "2026-02-19T18:50:00.000Z"
}
```

---

### US-2: List All Tasks ✅
**Story Points:** 2

**Acceptance Criteria Met:**
- ✅ API endpoint GET `/tasks` returns array of all tasks
- ✅ Returns empty array `[]` if no tasks exist
- ✅ Each task includes id, title, description, completed status, priority, and timestamps

**Demo:**
```bash
curl http://localhost:3000/tasks
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Complete tutorial",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-02-19T18:50:00.000Z",
    "updatedAt": "2026-02-19T18:50:00.000Z"
  }
]
```

---

### US-3: View Single Task ✅
**Story Points:** 2

**Acceptance Criteria Met:**
- ✅ API endpoint GET `/tasks/:id` returns single task object
- ✅ Returns 404 error if task with given ID does not exist
- ✅ Response includes all task fields

**Demo:**
```bash
curl http://localhost:3000/tasks/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Complete tutorial",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-02-19T18:50:00.000Z",
  "updatedAt": "2026-02-19T18:50:00.000Z"
}
```

**404 Error Demo:**
```bash
curl http://localhost:3000/tasks/999
```

**Response:**
```json
{
  "error": "Task not found"
}
```

---

## Additional Deliverables

### CI/CD Pipeline 
- GitHub Actions configured with `.github/workflows/ci.yml`
- Pipeline runs on push and pull requests to `main`
- Tests against Node.js 18.x and 20.x
- First pipeline run: **PASSED** 

**Pipeline URL:** https://github.com/illonaaddae/task-manager-api-assessment/actions

### Automated Tests 
- 21 tests written using Jest + Supertest
- All tests passing
- Code coverage: 91%+

**Test Results:**
```
PASS  tests/tasks.test.js
  Task API
    POST /tasks
      ✓ should create a task with title and description
      ✓ should create a task with only title (description optional)
      ✓ should create a task with custom priority
      ✓ should return 400 if title is missing
      ✓ should return 400 if title is empty string
      ✓ should return 400 for invalid priority
    GET /tasks
      ✓ should return empty array when no tasks exist
      ✓ should return all tasks
      ✓ should return tasks with all required fields
    GET /tasks/:id
      ✓ should return a task by ID
      ✓ should return 404 for non-existent task
      ✓ should return 400 for invalid task ID

Test Suites: 1 passed, 1 total
Tests:       21 passed, 21 total
```

### Version Control 
**Commit History (Incremental Delivery):**
```
3e610d7 Add README with setup and API documentation
55e7696 Add GitHub Actions CI pipeline and comprehensive tests
5d43b21 Add Express app structure with task CRUD endpoints
913d652 Initial project setup: npm init, Express, Jest, Supertest
```

---

## Sprint Metrics

| Metric | Value |
|--------|-------|
| Planned Story Points | 7 |
| Completed Story Points | 7 |
| Velocity | 100% |
| Tests Written | 21 |
| Code Coverage | 91%+ |
| Pipeline Status | Passing |

---

## Definition of Done Checklist

- [x] Code is committed to the main branch
- [x] Unit tests written and pass successfully
- [x] CI pipeline runs without failures
- [x] All acceptance criteria verified
- [x] Code follows project conventions
- [x] No critical bugs remain
- [x] README updated with setup instructions

---

## Repository

**GitHub:** https://github.com/illonaaddae/task-manager-api-assessment
