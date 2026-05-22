# Distributed Cron Job Scheduler

A distributed cron-based job scheduling system built using Node.js, Kafka, Redis, and MongoDB.  
This system decouples scheduling from execution using an event-driven architecture and supports horizontal scaling through worker processes.

---

## Architecture Overview


Scheduler ---> Kafka ---> Worker

- **MongoDB** → Persistent job storage  
- **Scheduler** → Detects due jobs  
- **Redis** → Distributed locking (prevents duplicate execution)  
- **Kafka** → Message broker (decouples scheduling & execution)  
- **Worker** → Executes jobs  

---

## Features

- Distributed job scheduling using cron expressions  
- Kafka-based asynchronous job execution  
- Redis-based distributed locking  
- MongoDB-backed persistent job storage  
- Horizontally scalable workers  
- Decoupled control and execution planes  

---

## Project Structure

- Node.js (v18+)
- Docker & Docker Compose
- Git

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/DogeSamurai23/distributed-cron-job-scheduler.git
cd distributed-cron-job-scheduler
```
## 2. Install dependencies

```
npm install
```
## 3. Configure environment variables

Create a .env file in the root:

```bash
MONGODB_URI=mongodb://localhost:27017/distributed-cron
KAFKA_BROKER=localhost:9092
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

## 4. Start infrastructure (MongoDB, Kafka, Redis)
### Running with Docker (Recommended)
```bash
docker-compose up -d
```

## 5. Create Kafka topic
```bash
docker exec -it kafka kafka-topics --create --topic jobs --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```
---
## 6. Run the system
Start worker (Terminal 1):
```bash
npm run start-worker
```
Start scheduler (Terminal 2):
```bash
npm run start-scheduler
```
Create jobs (Terminal 3):
```bash
node src/createJob.js
```
---
## Example Cron Expressions

| Expression     | Meaning                  |
|---------------|--------------------------|
| `* * * * *`   | Every minute             |
| `*/5 * * * *` | Every 5 minutes          |
| `0 9 * * 1`   | Every Monday at 9 AM     |

---

## How It Works

- Job is created and stored in MongoDB  
- Scheduler polls for due jobs  
- Redis lock ensures only one scheduler processes the job  
- Scheduler publishes job to Kafka  
- Worker consumes and executes the job  
- Next execution time is computed and stored  

---

## Design Decisions

- Kafka used for decoupling scheduling and execution  
- Redis used for distributed locking  
- MongoDB used for persistence  
- Scheduler and worker separated for scalability  

---
## Author
DogeSamurai23
