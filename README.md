# Instagram Clone

A full-stack Instagram Clone web application featuring a separate backend API and a responsive frontend client.

## Project Structure

```text
instagram-clone/
├── backend/       # Server-side API, authentication, and database logic
├── frontend/      # Client-side user interface (JavaScript, CSS, HTML)
└── .gitignore     # Ignored files and environment configurations
```

## Features

- User authentication and authorization (Sign up, Login, Logout)
- Create, view, and interact with posts (Likes & Comments)
- User profiles with follower/following functionality
- Responsive feed interface

## Tech Stack

- **Frontend:** JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express, MongoDB

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/alieak786-sys/instagram-clone.git](https://github.com/alieak786-sys/instagram-clone.git)
   cd instagram-clone
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside the `backend` directory and configure your environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`), then start the server:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   Open a new terminal, navigate to the `frontend` folder, install dependencies, and run the app:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## License

This project is open-source and available under the [MIT License](LICENSE).
