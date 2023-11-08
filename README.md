# NextJS  - Next Auth - MonogoDB - Bootstrap - Crud:

### Deployed link : [`Live Site`](https://808-courses.vercel.app/)



## Getting Started
Please run "yarn install" to install all project required dependencies.

Make sure to creare a ".evn.local" file in root level . (same level as .env.example).
Follow the format mentioned in the .env.example file.

This project uses MongoDb , so please either provide a mongodb atlas url or local mongodb server url.

After installation & setting up env file run the development server:

```bash

yarn dev
yarn build
yarn start

```

use "yarn dev" to start the local server.
use "yarn build" to start the production build files.
use "yarn start" to start the local server using production build files (run yarn build first!).



## Features

Features of this project:

- Authentication system using Next Auth and users collection stored to mongodb .

- API endpoint & page path protection .

- Serverside rendered home page and course page .

- Makes use of Nextjs full stack features .

- Redux state management.

- Bootstrap based UI & responsive .

- Pagination - optimized pagination , loads only the required fields for the current page number . 

- Search page -using backed regex

- Makes use of fetch api for network calls 

- Git / github used for file versioning and management.



## Specifics
- Fetches list of courses from backend
- Displays scrollable courses list - clickable
- Course Details page - displays full details 
- Users can add new comment - join open courses - mark complete existing courses
- Dashboard - displays only enrolled courses list
- Users mark complete- view progress - displays relevant details
- Redux for statemangement - which closely mimics useState behaviour
- Search courses using search function - search for all course details
- Bootstrap & CSS UI & viewport responsive.
- Pagination - splits blog post data into smaller chunks & fetched based on the pagination
- Client side & server side validations for forms & requests.
- File versioning - using git/ github
- Readme