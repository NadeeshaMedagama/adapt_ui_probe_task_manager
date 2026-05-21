# AdaptUI Probe Task Manager

A cloud-native task management system designed for distributed
development teams. Built with Node.js, React, and MongoDB.

## Features
- User authentication with JWT
- Real-time task assignment and tracking
- Project board management
- Role-based access control
- RESTful API with full documentation

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** React.js, Tailwind CSS
- **Database:** MongoDB with Mongoose
- **DevOps:** Docker, GitHub Actions
- **Testing:** Jest, Supertest

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- Docker (optional)

### Installation
```bash
git clone https://github.com/[username]/adapt_ui_probe_task_manager
cd adapt_ui_probe_task_manager
npm install
cp .env.example .env
npm start
```

### Running Tests
```bash
npm test
```

### Docker Setup
```bash
docker-compose up --build
```

### Environment
Set `MONGO_URI` in `.env` to point at `mongodb://localhost:27017/adapt_ui_probe_task_manager`.

## API Documentation
See `/docs/api.md` for full endpoint documentation.

## Contributing
Please read our contributing guidelines before submitting a PR.