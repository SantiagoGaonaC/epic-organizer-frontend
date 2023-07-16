<p align="center">
 <img width="100px" src="https://github.com/SantiagoGaonaC/epic-organizer/blob/main/frontend/src/app/favicon.ico" align="center" alt="EpicOrganizer" />
 <h2 align="center">Epic Organizer</h2>
 <p align="center">Minimalist calendar to organize tasks
</p>
</p>

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Requirements
Some project requirements
<div style="display: flex; justify-content: center;">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://shields.io/badge/chakra--ui-black?logo=chakraui&style=for-the-badge"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
<div/>
<p align="center">
   <a href="/backend/package.json">Backend package.json</a>
  |
   <a href="/frontend/package.json">Frontend package.json</a>
</p>
  
## Installation
Clone repository
```bash
git clone https://github.com/SantiagoGaonaC/epic-organizer
```

## Create `.env` required for backend and frontend
- Backend .env file
```json
PORT=YOUR_PORT
MONGODB_URL="YOUR_CONNECTION_CLUSTER"
EMAIL="YOUR_EMAIL"
EMAIL_PASSWORD="YOUR_PASSWORD"
JWT_SECRET="YOUR_JWT_SECRET"
```
- Frontend .env.local file
**using localhost and port 4000 for example api**
```json
NEXT_PUBLIC_BACKEND_BASE_URL="http://localhost:4000/api"
PUBLIC_BACKEND_BASE_URL="http://localhost:4000/api"
```

## Run
For dev(test) using [`Turbopack`](https://turbo.build/pack) 
```bash
npm run dev
```
If you don't want to use turbo pack for your dev builds, delete --turbo in scripts dev in: <a href="/frontend/package.json">Frontend package.json</a>
```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```
---

# Features
![image](https://github.com/SantiagoGaonaC/epic-organizer/assets/53282017/634c4ca1-c296-4530-b8eb-214ec0e5e65b)

## Auth (Login - Register)
- Register
![image](https://github.com/SantiagoGaonaC/epic-organizer/assets/53282017/5d12d008-6123-40a7-a027-2ed62f828e85)
- Login (Feature code send to email for auth)
![image](https://github.com/SantiagoGaonaC/epic-organizer/assets/53282017/b72addcf-5fb0-4c79-8078-128510b9a82a)

## Calendar (Calendar - Task - Modals - Menulist)
![image](https://github.com/SantiagoGaonaC/epic-organizer/assets/53282017/3981cdf2-4bfb-413d-a17d-40baf0d2d331)
![image](https://github.com/SantiagoGaonaC/epic-organizer/assets/53282017/a403361c-b551-4694-a738-981ba0bba1b6)

## Contributing
## License
## Contact
<p align="center">
  <a href="https://www.linkedin.com/in/santiago-gaona-carvajal/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
   <a href="mailto:santigaona17@gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
  <a href="mailto:sgaonacarvajal@outlook.com" target="_blank">
    <img src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white"/>
  </a>
</p>

# Video

![ExampleEpicOrganizer](https://github.com/SantiagoGaonaC/epic-organizer/assets/53282017/661c58af-3daa-4c5b-864d-c838e201b682)
