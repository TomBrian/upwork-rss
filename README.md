## Upwork Real-time Job Alert API

**Introduction**

This Node.js application utilizes Express to build a web API that extracts real-time job postings from Upwork based on your search criteria and sends alerts for fresh opportunities.

**Features**

- Extracts job postings from Upwork RSS feeds based on user-defined search terms.
- Runs a scheduled task every 3 minutes to fetch new postings.
- Identifies jobs posted less than 3 minutes ago (considered "fresh").
- Sends alerts for fresh job postings. Update the .env `ALERT_ADDRESSES` field to the list of emails you want the alerts to go to e.g email1@mailinator.com,email3@example.com

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
- **Content-Type:** application/json
- **Request Body:**

```json
{
  "rssUrl": "https://www.upwork.com/ab/feed/topics/rss?securityToken=...",
  "title": "A new job has been posted !"
}
- See .http for the complete list of endpoints


**Additional Notes**

- This is a basic example and can be extended to include features like user authentication, search filters, and more robust alerting mechanisms.
- Error handling and logging are essential for a production-ready application and should be implemented.

**Further Resources:**

- Upwork RSS Feed Documentation: (refer to Upwork API documentation for details on RSS feed access)
- Node.js with MongoDB: [https://www.w3schools.com/nodejs/nodejs_mongodb.asp](https://www.w3schools.com/nodejs/nodejs_mongodb.asp) Incase you want to extend the features
- Express.js Framework: [https://expressjs.com/](https://expressjs.com/)
```
