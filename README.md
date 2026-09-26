# JobTrack

JobTrack is a full-stack Job Application Management System built using Java, Spring Boot, MySQL, JPA/Hibernate, HTML, CSS and JavaScript.

It helps users maintain a simple record of their job applications and track application status from one dashboard.

## Features

- Add job applications
- View all applications
- Edit applications
- Delete applications
- Search applications by company
- Filter applications by status
- Dashboard statistics
- Form validation
- RESTful backend APIs
- MySQL persistence
- Responsive frontend

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

## Project Structure

```text
JobTrack/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/jobtrack/
│       │   │   ├── controller/
│       │   │   ├── exception/
│       │   │   ├── model/
│       │   │   ├── repository/
│       │   │   └── service/
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE jobtrack;
```

Then open:

```text
backend/src/main/resources/application.properties
```

Update:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Replace `YOUR_MYSQL_PASSWORD` with your local MySQL password.

The application uses:

```properties
spring.jpa.hibernate.ddl-auto=update
```

so Hibernate will create/update the required table automatically.

## Run the Backend

Open the `backend` folder in IntelliJ IDEA.

Run:

```text
JobTrackApplication.java
```

The backend will start on:

```text
http://localhost:8080
```

## Run the Frontend

After the backend is running, open:

```text
frontend/index.html
```

in a browser.

The frontend communicates with:

```text
http://localhost:8080/api/jobs
```

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/jobs` | Get all applications |
| GET | `/api/jobs/{id}` | Get one application |
| POST | `/api/jobs` | Create application |
| PUT | `/api/jobs/{id}` | Update application |
| DELETE | `/api/jobs/{id}` | Delete application |
| GET | `/api/jobs/search?company=TCS` | Search by company |
| GET | `/api/jobs/filter?status=APPLIED` | Filter by status |

## Example POST Request

```json
{
  "company": "TCS",
  "role": "Java Developer",
  "location": "Lucknow",
  "appliedDate": "2026-09-26",
  "status": "APPLIED"
}
```

Valid statuses:

```text
APPLIED
INTERVIEW
SELECTED
REJECTED
```

## How It Works

```text
HTML/CSS/JavaScript
        |
        | HTTP REST API
        v
Spring Boot Controller
        |
        v
Service Layer
        |
        v
Spring Data JPA Repository
        |
        v
MySQL Database
```

## Learning Objectives

This project demonstrates:

- Java OOP
- Spring Boot application structure
- REST API development
- Controller-Service-Repository architecture
- JPA/Hibernate entity mapping
- MySQL integration
- CRUD operations
- Validation
- Exception handling
- Frontend/backend integration
- Git and GitHub project organization

## Author

Prince Yadav

Java Full Stack | Spring Boot | MySQL | JavaScript

## License

This project is intended as an educational and portfolio project.
