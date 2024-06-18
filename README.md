# BlogApp - School Project

This is a school project demonstrating a full-stack blog application. It includes user authentication, blog creation, and commenting functionalities.

## Production Website

You can visit the live application [here](https://schoolblogapp.netlify.app/).

## Figma Design

The design for this project can be found on Figma [here](https://www.figma.com/design/2lF2BIEPvZamE02qlsNUSi/BlogApp_24?t=9OyNH85tgVGfvVYk-1).

## Features

- User registration and login
- Create, edit, and delete blog posts
- Comment on blog posts
- Like and unlike blog posts
- Responsive design

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/TheFakeHamma/U09-BlogApp.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd U09-BlogApp
    ```

3. **Install the dependencies for the backend:**

    ```sh
    npm install
    ```

4. **Install the dependencies for the frontend:**

    ```sh
    cd frontend
    npm install
    ```

## Usage

To run the application locally, follow these steps:

1. **Backend:**
    - Create a `.env` file in the root directory with the following environment variables:
        ```plaintext
        MONGO_URI=your_mongo_uri
        JWT_SECRET=your_jwt_secret
        EMAIL_USER=your_email_user
        EMAIL_PASS=your_email_pass
        FRONTEND_URL=http://localhost:3000
        ```
    - Start the backend server:
        ```sh
        node app.js
        ```

2. **Frontend:**
    - Create a `.env` file in the `frontend` directory with the following environment variables:
        ```plaintext
        VITE_API_BASE_URL=http://localhost:5000/api
        ```
    - Start the frontend development server:
        ```sh
        cd frontend
        npm run dev
        ```

## Deployment

### Backend

The backend is deployed on [Railway](https://railway.app/). Ensure you have set up the necessary environment variables in the Railway dashboard:

- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `FRONTEND_URL`

### Frontend

The frontend is deployed on [Netlify](https://www.netlify.com/). Ensure you have set the `VITE_API_BASE_URL` environment variable in the Netlify dashboard to point to your Railway backend URL.

## Contributing

This project is for educational purposes only. Contributions are welcome but will not be actively maintained.

## License

This project is licensed under the MIT License.
