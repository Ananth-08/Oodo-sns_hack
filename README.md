GlobeTrotter – Personalized Travel Planning Platform

GlobeTrotter is a full-stack travel planning web application built to simplify the way people plan and organize multi-city trips. Instead of using multiple tools to manage destinations, schedules, and budgets, GlobeTrotter brings everything together into a single, easy-to-use platform.

The application allows users to create detailed itineraries, add cities and activities, track estimated costs, visualize travel timelines, and share their plans with others. The focus of this project is on clarity, usability, and practical travel planning.

Project Overview

Planning a trip often becomes complicated when there are multiple cities involved, limited budget visibility, and no clear structure for daily activities. GlobeTrotter addresses these challenges by providing a centralized system where users can design their entire journey step by step.

The platform is designed to support flexible travel planning while keeping the experience simple and intuitive. It is suitable for individual travelers and can be extended for collaborative planning in the future.

Core Functionality

Users can register and log in to manage their personal travel plans. Once logged in, they can create trips by specifying basic details such as trip name, description, and travel dates. Each trip supports multiple cities, allowing users to define the order of travel and the duration of stay at each location.

The itinerary builder helps users organize their plans in a structured, day-wise format. Activities can be searched, added, edited, and assigned to specific cities and dates. The application also calculates estimated expenses automatically and provides a clear breakdown to help users stay within their planned budget.

Trips can be viewed using timeline or calendar-style layouts, making it easier to understand the overall flow of the journey. Users also have the option to share their itineraries through a public, read-only view, allowing others to view or take inspiration from the plan.

Technology Used

The frontend of the application is developed using React to ensure a responsive and interactive user experience. The backend is built with FastAPI, following RESTful principles to handle business logic, authentication, and data processing. A local relational database is used to store user information, trip details, cities, activities, schedules, and budget data. Git and GitHub are used for version control and collaboration.

System Design

The application follows a modular architecture where the frontend and backend are clearly separated. The React frontend handles user interactions and communicates with the FastAPI backend through APIs. The backend manages data validation, processing, and storage using the local database. This structure improves maintainability and makes the system easier to extend.

Project Structure

The project is organized into separate frontend and backend directories. The frontend contains the React application responsible for UI and client-side logic. The backend contains the FastAPI application, including routes, models, schemas, and database configuration. This structure supports clean development practices and scalability.

Future Scope

Possible future improvements include intelligent destination recommendations, real-time cost integration, group trip collaboration, cloud database deployment, and mobile application support.
