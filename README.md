# Nextfit - Save Clothes, Save Money, Save Yourself

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Brief](#project-brief)
- [Roles](#roles)
- [Challenges](#challenges)
- [Key Learnings](#key-learnings)
- [Future Developments](#future-developments)
- [Acknowledgments](#acknowledgments)

## Introduction

Nextfit App is a cutting-edge solution designed to transform the way you manage your clothing collection. It provides invaluable assistance in making informed outfit choices, tracks the frequency of clothing item usage within your wardrobe, and prompts you to consider donating less-worn pieces. By doing so, it not only promotes sustainable practices but also empowers users to declutter their collection in a meaningful way.

<img src="https://raw.githubusercontent.com/cycedmund/nextfit-app/main/public/readme/nextfit-landing.png">

## Features

- **User-friendly interface:** The app features an intuitive and visually appealing user interface that allows users to navigate easily through the app.
- **Random Outfit Generator:** The core feature of the app is its ability to generate random outfits based on the weather. Simply upload your clothing items, and it will consider the current weather conditions to offer suitable outfit recommendations.
- **Wardrobe Management:** Maintain a digital wardrobe by adding your own clothing items. You can upload pictures, categorize items, and save them for future outfit suggestions.
- **Save For Later:** Save your favorite outfit combinations to use on another day.

<img src="https://raw.githubusercontent.com/cycedmund/nextfit-app/main/public/readme/nextfit-home.png">

## Deployment

Nextfit App is deployed on [Render](https://render.com/). You can access it [here](https://nextfit-app.onrender.com/).

## Technologies Used
- React
- Express 
- MongoDB
- Node.js
- AWS S3
- Tailwind CSS

## Getting Started

### Wireframes
For our wireframe, we utilized Figma to design the prototype pages and components for our app. You can access the wireframe [here](https://www.figma.com/file/Qkiylh7e1DekvwvoxJp8gu/NextFit?type=design&node-id=0-1&mode=design&t=hd8P5ZsuyJFlq9M3-0).

### User Stories 
- As a fashion-conscious individual looking to minimize clothing expenses, I require an app that helps me manage and maximize my existing wardrobe by generating diverse outfit combinations from my current clothing pieces and accessories

- As a fashion enthusiast committed to reducing the environmental impact of fast fashion, I seek an app that tracks the frequency of clothing item usage and reminds me to donate rarely worn pieces

- As a fashion-conscious individual with limited closet space, I need an app to efficiently organise my clothes and accessories, making them easily accessible and well-structured

You can access our Trello board [here](https://trello.com/b/rpCIwS72/nextfit).

### Pitch Deck
Nextfit's advantage is that it's free!

You can access our Pitch Deck [here](https://tome.app/nextfit/nextfit-cln7kjw2m05i3ny7aw77m3s1a).

### App Flow

- **Login Page**
- **Dashboard**
  - Weather for today.
  - **Navbar Options:**
    1. Input Clothes
    2. View Wardrobe
    3. Outfit Suggestions

#### Input Clothes
- Form to create and store clothing information in the database (e.g. name, wardrobe, type).

#### View Wardrobe
- Table to read, delete, and update clothing information from the database.

#### Outfit Suggestions
- Generate outfits based on weather

### Database Relationships
- **One-to-Many (1-M):**
  - One clothing item (itemID) can belong to multiple users (userID).
- **Many-to-Many (M-M):**
  - Many items of clothing (itemID) can be associated with many outfits (outfitID).

## Project Brief

### Technical Requirements
- Be a full-stack MERN application.

- Connect to and perform data operations on a Mongodb database

- Have at least one data entity (Model) in addition to the built-in User model (if using API). If not consuming an API, have at least two data entities (Models) in addition to the built-in User model. Have at least one one-to-many (1:M) and/or one many-to-many (M:M) relationship between entities/models.

- Have full-CRUD data operations across any combination of the app's models (excluding the User model).

- Have suitable validations for the models, React (client) and Express (server)

- Authenticate users using JWT.

- Implement authorization by restricting access to the Creation, Updating & Deletion of data resources

- Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, it should have a consistent and polished user interface.

- Be deployed online. Presentations must use the deployed application.

### Other Deliverables
A README.md file with these sections (here's a basic template)
- App Title: Contains a description of what the app does and optional background info.

- Screenshot(s): A screenshot of your app's landing page and any other screenshots of interest.

- Technologies Used: List of the technologies used.

- Getting Started: That Includes:

  - A link to the deployed app
  - A link to the Trello board used for the project's planning that includes user stories, wireframes & an ERD.

## Roles

### GitHub Manager (Edmund and Cristelle)

- Manages the GitHub repository.
- Approves pull requests.
- Sets up the MERN infrastructure.

### Scrum Master (Cristelle and Evangelene)

- Manages user stories (on Trello).
- Manages Trello boards (on Trello) as the board manager.
- Optionally, manages stand-up meetings.

### Documenter (Zahra and Cristelle)

- Creates and maintains the project README.
- Prepares the pitch deck (on Tome).

### Designer (Evangelene and Edmund)

- Creates UI wireframes (on Figma).
- Handles CSS styling, consider the use of frameworks like Bootstrap or Tailwind CSS (can also use other styling libraries).

### Database Manager (Zahra and Edmund)

- Manages the database.
- Draws schema diagrams, utilising tools like Lucidchart or DbSchema.
- Handles relationships such as one-to-many (1-M) and many-to-many (M-M) modeling.
- Potentially implements external APIs related to the database.

## Challenges

Creating Nextfit App presented several challenges during development. Some of the key challenges included:

- **Algorithm Complexity:** Designing an algorithm that can generate aesthetically pleasing and well-coordinated outfits from a user's wardrobe items, considering various factors like weather, required intricate coding and optimization.

- **Integration with Weather Data:** Incorporating real-time weather data to provide weather-appropriate outfit suggestions involved interfacing with external APIs and handling data synchronization challenges.

- **User Experience Design:** Ensuring a user-friendly and visually appealing interface that caters to a wide range of fashion preferences and age groups was a design challenge.

## Key Learnings

During the development of Nextfit App, our team gained valuable insights and lessons:

- **API Integration:** Successfully integrating external APIs, like weather data, can add significant value to the app's functionality, but it comes with challenges related to data accuracy, availability, and handling potential issues gracefully.

- **Algorithm Optimization:** Creating efficient algorithms for outfit generation requires careful consideration of various factors and a commitment to ongoing optimization.

## Future Developments

The Nextfit App is an evolving project with room for further enhancements and expansions. Some potential areas for future development include:

- **Generate Outfits By Color And Style:** Optimize algorithms to generate outfits based on colors and styles.

- **Weather-Based Outfit Generation:** Enhance existing outfit generator algorithm to include future weather forecasts. 

- **Personalized Styling Recommendations:** Implement machine learning models to provide personalized outfit suggestions based on users' fashion history, preferences, and body shape.

- **Social Sharing and Collaboration:** Enhance the app to facilitate social sharing of outfits, outfit challenges, and collaborative wardrobe management among friends and family.

- **Enhanced Wardrobe Analysis:** Improve wardrobe analytics to give users a deeper understanding of their clothing usage and potential areas for decluttering and sustainability.

## Acknowledgments

- We would like to thank the open-source community for their contributions to the libraries and tools used in this project.
- Weather data provided by [OpenWeather](https://openweathermap.org/).