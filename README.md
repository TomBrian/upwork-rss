## Upwork Real-time Job Alert and keyword research API

**Introduction**

This Node.js application utilizes Express to build a web API that extracts real-time job postings from Upwork based on your search criteria and sends alerts for fresh opportunities.

**Features**

- Extracts unique keywords from your job feed. You can use these keywords to create highly optimized profile description
- Extracts job postings from Upwork RSS feeds based on user-defined search terms.
- Runs a scheduled task every 3 minutes to fetch new postings.
- Identifies jobs posted less than 3 minutes ago (considered "fresh").
- Sends alerts for fresh job postings. Update the .env `ALERT_EMAIL_ADDRESSES` field to the list of emails you want the alerts to go to e.g email1@mailinator.com,email3@example.com max 2 addresses

**Tech Stack**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Data Source:** Upwork RSS Feed

**Prerequisites**

- Node.js and npm (or yarn) installed on your system.
- A MongoDB instance running.
- Upwork account (to access RSS feed details).

**Installation**

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Configure database connection details in the appropriate environment variables file (e.g., `.env`).
5. Configure Upwork RSS feed URL and search terms in the code (details depend on implementation).

**Running the Application**

1. Run `npm run watch` to start the Node.js server.

**Alert Implementation**

**API Endpoints**

This section describes the available API endpoints for the Upwork Real-time Job Alert application.

**1. Set Alert**

- **Method:** POST
- **URL:** http://localhost:3000/upwork/jobs/set-alert

- **2. GET KEYWORDS**

- **Method:** POST
- **URL:** http://localhost:3000/upwork/jobs/get-keywords

**FOR MORE REQUEST DETAILS. PLEASE VIEW THE .http FILE IN THE ROOT FOLDER**
- Upwork RSS Feed Documentation: (refer to Upwork API documentation for details on RSS feed access)
- Node.js with MongoDB: [https://www.w3schools.com/nodejs/nodejs_mongodb.asp](https://www.w3schools.com/nodejs/nodejs_mongodb.asp) Incase you want to extend the features
- Express.js Framework: [https://expressjs.com/](https://expressjs.com/)
```
