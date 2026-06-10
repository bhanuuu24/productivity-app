# Productivity App

A full-stack productivity and habit-tracking application built using Spring Boot, Java, SQL, HTML, CSS, and JavaScript.

The project started as a simple task manager and evolved into a productivity system featuring daily tasks, streak tracking, progress-based goals, reminders, dashboards, and a scalable architecture for future expansion.

---

## Project Status

🚧 Actively under development

Current version includes a fully functional task management system with database persistence, daily task support, streak tracking, progress monitoring, and a polished user interface.

---

## Features

### Task Management

* Create tasks
* Edit tasks
* Delete tasks
* View all tasks
* Persistent storage using SQL database

### Task Types

#### Binary Tasks

* Simple completed / not completed tasks
* Managed using a checkbox
* No progress bar required

#### Progress Tasks

* Track progress from 0% to 100%
* Automatic completion at 100%
* Visual progress bar
* Progress-based goal tracking

### Daily Productivity Features

* Daily tasks
* User-defined daily default tasks
* System default daily tasks
* Streak tracking
* Smart daily review

### Progress Tracking

* Progress bars
* Weekly progress dashboard
* Completion tracking
* Time-based tasks

### User Experience

* Clean responsive interface
* Hover effects
* Dynamic button states
* Visual task labels
* Improved readability
* Stable frontend-backend synchronization

### Productivity Enhancements

* Priority levels
* Soft reminders
* Offline support

---

## Technical Features

### Backend

* Java
* Spring Boot
* REST API architecture
* Spring Data JPA

### Database

* SQL database integration
* Persistent task storage

Examples of database operations:

```java
taskRepository.findAll();
taskRepository.save(task);
taskRepository.deleteById(id);
```

Equivalent SQL concepts:

```sql
SELECT * FROM tasks;

INSERT INTO tasks(title, description, completed)
VALUES('Study', 'Spring Boot', false);

DELETE FROM tasks WHERE id = 1;
```

### API Communication

The backend stores data as Java objects and automatically converts them into JSON responses for the frontend.

Example JSON:

```json
{
  "id": 1,
  "title": "Study",
  "description": "Spring Boot",
  "completed": false
}
```

Spring Boot handles this conversion automatically, reducing boilerplate code and improving maintainability.

---

## Architecture

The application follows a layered architecture:

```text
Frontend
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
SQL Database
```

### Project Structure

```text
Frontend
 ├── HTML
 ├── CSS
 └── JavaScript

Backend
 ├── Controller
 ├── Service
 ├── Repository
 └── Entity

Database
 └── SQL
```

---

## Major Challenges Solved

### Data Consistency Problem

When task types were introduced, older database records did not contain type information.

This caused:

* Checkbox flickering
* Incorrect task behavior
* Progress bar inconsistencies

### Solution

* Added explicit task types
* Normalized legacy data
* Ensured frontend, backend, and database followed the same business rules
* Eliminated ambiguity in task behavior

### Checkbox Flicker Bug

Root cause:

* Backend recalculated completion state incorrectly for simple tasks

Fix:

* Binary tasks now depend only on checkbox state
* Progress tasks depend only on progress percentage
* Backend respects user actions correctly

---

## Engineering Lessons Learned

Throughout this project I learned:

* Full-stack debugging
* REST API development
* SQL fundamentals
* Database consistency
* Business rule design
* Frontend-backend synchronization
* Software architecture planning
* Incremental feature development

---
## Development Progress
### ✅ Phase 1 – Core Productivity Platform (Completed)

- Full Task CRUD operations
- SQL database integration
- Spring Boot REST API
- Frontend ↔ Backend synchronization
- Binary (Simple) Tasks
- Progress-Based Tasks
- Progress Bars
- Daily Tasks
- Daily Default Tasks
- Streak Tracking System
- Priority Levels
- Weekly Progress Dashboard
- Smart Daily Review
- Soft Reminders
- Offline Support
- Responsive UI
- Hover Effects & UX Improvements
- Data Consistency Fixes
- Legacy Data Compatibility
- 
### 🚧 Phase 2 – Advanced Productivity Features (70% Complete)

Implemented:
- Productivity-focused task architecture
- Daily habit tracking
- Progress monitoring
- Weekly insights
- Completion tracking

In Progress:
- Advanced filtering
- Search functionality
- Enhanced productivity analytics
- Completion statistics
- Better dashboards and reporting

### 🔜 Phase 3 – Platform Expansion & Security

Planned:
- User Registration & Login
- User-specific Task Management
- Spring Security Integration
- Authentication & Authorization
- Protected API Endpoints
- Role-Based Access Control
- Admin Dashboard
- User Management System
- Productivity Analytics Dashboard
- System Monitoring & Reports

---

## Future Features

* AI task suggestions
* Energy-based scheduling
* Task template library
* Micro-goals and subtasks
* Accountability partner mode
* Auto difficulty scaling
* Built-in Pomodoro timer
* Gamification coins and rewards
* Mood-productivity insights
* Voice task creation
* Deadline forecasting
* Public API
* Data export tools
* Advanced analytics
* Achievement badges

---

## Tech Stack

* Java
* Spring Boot
* Spring Data JPA
* SQL
* HTML
* CSS
* JavaScript
* Gradle
* Git
* GitHub

---

## Author

Bhanu

Built as a long-term productivity platform focused on task management, habit tracking, consistency, and personal growth.
