# Getting Started

## Prerequisites

Install these once on your machine before anything else.

| Tool | Purpose |
|---|---|
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Runs the PostgreSQL database |
| Python + pipenv | Runs the Django API (`pip install pipenv`) |
| [Node.js + npm](https://nodejs.org/) | Runs the React client |

---

## First-time setup

Do these steps **once** when you clone the project. You will not need to repeat them on future startups.

### 1. Install API dependencies

```bash
cd rare-project/rare-api
pipenv install
```

### 2. Install client dependencies

```bash
cd rare-project/rare-client
npm install
```

### 3. Run database migrations

```bash
cd rare-project/rare-api
pipenv shell
python manage.py migrate
```

### 4. Seed the database

```bash
python manage.py loaddata rareapi/fixtures/initial_data.json
```

This populates the database with starter categories, tags, reactions, and a default admin user. Only run this once — re-running it on an existing database will cause duplicate-data errors.

---

## Every-time startup

Do these steps **each time** you want to run the project locally.

You will need two terminals open simultaneously — one for the API and one for the client.

### Terminal 1 — Start the database

```bash
cd rare-project/rare-api
docker-compose up -d
```

Docker Desktop must be running before this command. The `-d` flag runs the container in the background so the terminal stays free.

### Terminal 2 — Start the Django API

```bash
cd rare-project/rare-api
pipenv shell
python manage.py runserver
```

The API will be available at **http://localhost:8000**

### Terminal 3 — Start the React client

```bash
cd rare-project/rare-client
npm start
```

The app will open automatically at **http://localhost:3000**

---

## Stopping the project

| What to stop | How |
|---|---|
| React client | `Ctrl + C` in the terminal running `npm start` |
| Django API | `Ctrl + C` in the terminal running `runserver` |
| PostgreSQL container | `docker-compose down` from `rare-project/rare-api` |

You do not need to run `docker-compose down` every time — leaving the container running between sessions is fine and saves startup time. Use `down` when you want to fully stop the database or free up resources.

---

## Troubleshooting

**Port already in use on 8000 or 3000**
Another process is using the port. Find and stop it, or start the server on a different port:
```bash
python manage.py runserver 8001   # API on 8001
PORT=3001 npm start               # client on 3001
```
If you change the API port, update `API` in `rare-client/src/managers/api.js` to match.

**`pipenv shell` says environment not found**
Run `pipenv install` again from `rare-project/rare-api` to recreate the virtual environment.

**Database connection refused**
Docker Desktop is not running, or the container hasn't started yet. Open Docker Desktop, then run `docker-compose up -d` again.

**Migrations out of date after pulling new code**
Run `python manage.py migrate` (inside `pipenv shell`) to apply any new migrations before starting the server.
