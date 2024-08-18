# News Feed Project

## Overview
This project is a frontend web application that leverages the NewsAPI to display top headlines and a comprehensive list of news articles.

## Project Features
- **Top Headlines Page**: Displays the top headlines at the top of the page.
- **News List Section**: Below the top headlines, a virtualized list of news articles is displayed. This list supports infinite scrolling, with new items being added as the user scrolls down.
- **Search Functionality**:
  - **Simple Search**: Users can search the list of news articles by title.
  - **Advanced Search**: Users can perform a more detailed search by specifying criteria such as the source, start date, end date, and category (title, description, or content).

## Technology Stack

### Frameworks and Libraries
- **Next.js**: Used to create the project and take advantage of server-side rendering and static site generation.
- **ReactJS**: Utilized for building dynamic and responsive user interfaces.
- **TypeScript**: Ensures strong typing and enhances code quality and maintainability throughout the project.

### State Management and Data Fetching
- **Redux Toolkit**: Provides an efficient and standardized approach to managing application state.
- **Redux Toolkit Query**: Manages API calls and data fetching from the NewsAPI, providing caching and efficient data handling.

### Form Handling and Validation
- **React Hook Form**: Used to build and manage forms within the application, offering performant and easy-to-use form state management.
- **Zod**: Integrated with React Hook Form to provide robust schema validation for form inputs, ensuring data integrity and validation.

### Styling
- **Sass with CSS Modules**: Utilized to add styles with enhanced features like variables and nested rules, while CSS Modules ensure locally scoped styles to prevent naming conflicts.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/news-feed-project.git
