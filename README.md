# Nextfit - Guidelines

## Table of Contents

1. [Roles](#roles)
2. [Git Workflow](#git-workflow)
3. [Ideation](#ideation)
4. [Technologies](#technologies)

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
- Prepares the pitch deck (possibly on Tome?).

### Designer (Evangelene and Edmund)

- Creates UI wireframes (using Miro or similar tool).
- Handles CSS styling, consider the use of frameworks like Bootstrap or Tailwind CSS (can also use other styling libraries).

### Database Manager (Zahra and Edmund)

- Manages the database.
- Draws schema diagrams, utilising tools like Lucidchart or DbSchema.
- Handles relationships such as one-to-many (1-M) and many-to-many (M-M) modeling.
- Potentially implements external APIs related to the database.

### Other Responsibilities

- Not fixed, we can discuss this further so that everyone can do some React, some Express and some DB management.

Frontend (Edmund and Evangelene)

- React

Backend (Cristelle and Zahra)

- Express

Database (Zahra and Edmund)

- MongoDB

## Git Workflow

Follow this Git workflow to ensure smooth collaboration.

- Step 1 - 3 is only required in the beginning.

- Subsequently, begin from Step 4 onwards.

- If possible, let's try to work on different folders or files.
  - Can drop a message on Slack to inform others which file we working on.
  - If able, the rest of the members can try avoiding touching that file.

Here are the steps to follow (please check if unsure):

### Step 1: Cloning the Repository

- Downloads a copy of the repository to your local machine, allowing you to work on the project.
- You only need to clone once!

```bash
git clone https://github.com/cycedmund/nextfit-app
```

### Step 2: Updating the Main Branch

- Ensures that you have the latest version of the project before creating your own branch. **IMPORTANT**
- Prevents unnecessary conflicts later.

```bash
git checkout main
git pull origin main
```

### Step 3: Creating and Working on your Branch

- Replace <name> with your branch name (e.g. edmund).
- Do rmb to run npm install **on your branch**, and checking if all the dependecies are installed before working.
- Create a .env file after installation. Follow the .env.example format and indicate your secrets.

```bash
git checkout -b <name>
npm install
touch .env
```

### Step 4: Making Commits

- Stages and commits your changes.
- Commit should be performed after updating/creating a specific feature or a fix. Rule of thumb: anywhere between 10-20 lines of codes and/or work in different files (e.g. I created a route, linked to controller and model -> commit after).

```bash
git add -A
git commit -m "feat: your commit message"
```

### Step 5: Fetch and Merge from the Main Branch once again

- Ensures that changes made by other team members are incorporated into your local copy of the main branch.
- Integrates your changes from your branch with the latest version of the main branch.

In your <name> branch,

```bash
git pull origin main
```

- If prompted with suggestions to rebase, follow these:

```bash
git config pull.rebase false
git pull origin main
```

- If there are conflicts, Git will prompt you to resolve them (See Below).

### Step 6: Resolving Conflicts (if any)

- After resolving conflicts, run the following commands:
  - If unable to resolve conflicts or unsure, please ask in Slack.

```bash
git add -A
git commit
```

- Note: It is not necessary to input another commit message.
  - You will be prompted with the commit message editor, type 'Esc' followed by ':wq' to save and exit.

### Step 7: Pushing Your Changes

- Uploads your local branch to the repo.

```bash
git push origin <name>
```

### Step 8: Submit Pull Request on Github

- You can submit the Pull Request after completing a feature.

  - It is possible to make multiple commits, BEFORE pushing to origin main for submission of Pull Request.
  - Alternatively, you can choose to push each time you commit. Submit pull request only when ready.

- Title should be similar to the commit message, if possible.
- Short description of the feature, if possible.

### Step 9: Wait for Pull Request to be merged

- Inform in slack so I can go and merge the pull request.

### Step 10: Fetch and Merge Latest Changes with our branch

```bash
git checkout main
git pull origin main
git checkout <name>
git pull origin main
```

### Git Commit Guidelines

- Make small commits for each feature or fix.
- Do not push codes that doesn't work. Kindly ask in Slack if needed. **IMPORTANT**
- If installing any node libraries or external libraries, please inform in slack -> everyone to install -> before pushing codes.
  - This is to prevent errors in the event that one of us failed to install the library and encounter an error while pulling from main.

Use the following commit message format:

```bash
"feat: description of the feature"
"chore: description of the task"
"fix: description of the fix"
"style: description of css feature or style change"
```

## Ideation

### Problem Statement

Save clothes, save money, save yourself.

### User Stories

1. User wants a form to input their clothes in.

- Sizes, type (dropdown), color, quantity.

2. User wants outfit suggestions based on various criteria:

- User wants outfit suggestion based on a piece of clothing.
- User wants outfit suggestion based on weather.
- User wants outfit suggestion based on event / outfit guidelines (e.g. smart casual, sporty, casual, formal)

3. User wants to categorize clothes:

- Sort by guidelines, type, size.
- Filter

4. User wants to know when they use the outfit suggestion.

- Sustainability considerations:

  - If <10 times used in 6 months, donate it.

- Based on weather:

- Provide 3-4 outfit ideas (e.g. dress, singlet + shorts).

### App Flow

- **Login Page**
- **Dashboard**
  - Weather for today and forecast.
  - **Navbar Options:**
    1. Input Clothes
    2. View Wardrobe
    3. Outfit Suggestions

#### Input Clothes

- Form to create and store clothing information in the database (e.g. name, wardrobe, type).

#### View Wardrobe

- Table to read, delete, and update clothing information from the database.

#### Outfit Suggestions

- Form with options to select criteria for outfit suggestions:
  - Category options: Weather, Event-Guidelines, One Piece of Clothing.

### Database Relationships

- **One-to-Many (1-M):**

  - One clothing item (itemID) can belong to multiple users (userID).

- **Many-to-Many (M-M):**
  - Many items of clothing (itemID) can be associated with many outfits (outfitID).

## Technologies

- MongoDB with Mongoose
- Express
- ReactJS
- Node
- CSS -> **Tailwind with Preline UI / Ripple UI** OR Bootstrap
