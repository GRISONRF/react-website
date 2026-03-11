# Technical Blog Portfolio

A full-stack blog application built to showcase technical articles imported from Medium. 
This project features a React frontend, a Node/Express backend, and a MongoDB Atlas database, all secured with Firebase Authentication.

🚀 Live Demo
Check it out here: https://full-stack-react-ddc47.ue.r.appspot.com

___________________________________________________________________________

## 🛠️ How I Built This

### The Tech Stack:
* **Frontend:** React.js with Vite for fast bundling and React Router for navigation.
* **Backend:** Node.js & Express.js handling the REST API.
* **Database:** MongoDB Atlas (Cloud) for storing article data, upvotes, and comments.
* **Authentication:** Firebase Auth to manage secure user sign-ins.
* **Deployment:* Hosted on Google Cloud Platform (App Engine).


### Key Challenges & Solutions
* **Data Migration:** I wrote custom scripts to migrate local data to MongoDB Atlas and automated the process of pulling content from the Medium RSS feed.
* **Routing:** Implemented advanced Regex routing in Express to handle deep-linking and "Page Not Found" scenarios in a production environment.
* **Security:** integrated Firebase tokens into the Express middleware to ensure only logged-in users can upvote or comment.

___________________________________________________________________________

## 📸 Project Showcase

| Home Page | About Page |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/2cc86e49-d33d-47f2-b565-8d2340399db8" width="400" /> | <img src="https://github.com/user-attachments/assets/0d2c3307-0a5e-44f7-ba9f-1f587c59ba66" width="400" /> |
| *Project introduction & quick links* | *Professional profile & background* |

### 📰 Content & Interaction
**Articles List** A dynamic list of technical articles written by me, fetched directly from MongoDB cloud cluster.  
<img src="https://github.com/user-attachments/assets/d76bcb1b-0292-4ea6-beb4-2412a78d6cba" width="500" />

**Reading Experience** Individual article view with logic to handle full-text rendering and Medium-only links.  
<img src="https://github.com/user-attachments/assets/88408734-8080-4ac3-82f8-d1bff18e3636" width="500" />

### 🔒 Authenticated Features
*Users who log in via Firebase can interact with the content:*

| Upvote | Comment |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/3102986c-fd00-4418-8720-454d82139910" width="400" /> | <img src="https://github.com/user-attachments/assets/42c44718-f81f-4c50-b150-fd2fe685e3ce" width="400" /> |
| *User can upvote* | *User can leave a Comment* |

<!-- <img src="https://github.com/user-attachments/assets/3102986c-fd00-4418-8720-454d82139910" width="450" />
<img src="https://github.com/user-attachments/assets/42c44718-f81f-4c50-b150-fd2fe685e3ce" width="450" /> -->

---
___________________________________________________________________________

## 💻 Running Locally
Follow these steps to get the project running on your machine.

### 1. Prerequisites
* Node.js (v18 or higher)
* A MongoDB Atlas Account
* A Firebase Project

### 2. Installation
```bash
# Clone the repo
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

# Setup Backend
cd back-end
npm install
# Add your .env (MONGO_URL) and Firebase credentials.json

# Setup Frontend
cd ../front-end
npm install
```

### 3. Execution
* Backend: `npm run dev` (Runs on port 8000)
* Frontend: `npm run dev` (Runs on port 5173)

___________________________________________________________________________

## 📺 Walk-through video
<p>Part 1:</p>
<img src="https://github.com/user-attachments/assets/205f6392-cc44-4b7e-950b-bd2aa4019be4" width="90%" />
<p></p>
<p>Part 2:</p>
<img src="https://github.com/user-attachments/assets/6baac132-5cd7-4e60-9971-90b5b1fde9a5" width="90%" />


