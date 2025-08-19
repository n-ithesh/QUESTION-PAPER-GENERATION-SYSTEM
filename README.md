Question Paper Generation System (QPGS)
📌 Overview

The Question Paper Generation System (QPGS) is a dynamic full-stack web application designed to help academic institutions generate question papers aligned with COs (Course Outcomes), POs (Program Outcomes), and Bloom’s Taxonomy levels.
Teachers can upload questions, define patterns, and automatically generate papers, ensuring proper distribution of marks and learning outcomes.

Built with React, Node.js, Express.js, and MongoDB, the system enables automation of repetitive tasks, reduces manual errors, and provides scalable, reusable templates for question paper creation.

🚀 Features

User Roles & Authentication (Admin, Teacher, Exam Department Staff)

Question Management

Add, edit, delete, and search questions by subject/module/type

Bulk upload questions via Excel

Map questions to COs, POs, and Bloom’s Taxonomy levels

Pattern Management

Define reusable patterns for question papers

Configure question types (2M, 8M, 10M)

Create sub-questions (e.g., 1a, 1b, 2a, 2b)

Save and reuse patterns

Question Paper Generation

Generate papers dynamically from defined patterns

Ensure distribution across modules and learning outcomes

Preview before finalizing

Export papers in PDF/Word format

Reporting

Track question availability per module/type

View CO/PO/BL distribution reports

Export reports in PDF/Excel

🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB

Other Tools: Git, Postman, Excel Import/Export

📂 Project Structure
QPGS/
│── client/           # React frontend  
│── server/           # Node.js + Express backend  
│── models/           # MongoDB schemas  
│── routes/           # API routes  
│── controllers/      # Business logic  
│── utils/            # Helper functions  
│── public/           # Static files  
│── docs/             # Documentation (SRS, Reports)  
│── README.md         # Project documentation  

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/your-username/QPGS.git
cd QPGS


Backend Setup

cd server
npm install
npm start


Frontend Setup

cd client
npm install
npm start


Open your browser at http://localhost:3000

📸 Screenshots (Add later)

Login & Authentication Page

Question Management Dashboard

Pattern Creation Page

Generated Question Paper Preview

📊 Future Enhancements

Role-based dashboards for different user levels

AI-assisted question selection based on outcomes

Cloud deployment (AWS/Heroku)

Integration with Learning Management Systems (LMS)

👨‍💻 Contributors

Nithesh R Kotian – Fullstack Developer
