# Unplan - TEFL Lesson Planner

## Overview

Unplan is a Next.js application designed to simplify the creation of TEFL lesson plans for teachers. Leveraging the power of Firebase, it offers a streamlined workflow for educators to generate, customize, and share lesson plans.

## Technical Requirements

- Node.js (version as specified in `package.json` v18.17)
- Firebase CLI for interacting with Firebase services
- A Firebase project set up with the following configurations in your Firebase project settings (see `firebase.json`):
  ```json
  {
    "projects": {
      "default": "lesson-planner-3eff4",
      "staging": "unplan-10304"
    },
    "targets": {},
    "etags": {}
  }
    ```
- The firebase emulators suite for local development

## Setup Instructions

1. Clone the repository

Clone this repository to your local machine

2. Install dependencies

Navigate to the project directory and install the dependencies:

```bash
npm install
```

Additionally, navigate to the `functions` directory and install its dependencies:

```bash
cd functions
npm install
```
3. Configure firebase

- Ensure you have the Firebase CLI installed and are logged in to your Firebase account.
- Start the Firebase Emulators Suite to support local development:

```bash
firebase emulators:start
```

4. Environment Variables

Set up necessary environment variables required for the project in a `.env.local` file for local development - contact aidanmsheehan@gmail.com for details.

## Running the App Locally

To run the app locally, use the following commands from the root of the project:

```bash
npm run dev
```

This command starts the Next.js development server and connects to the Firebase Emulators Suite, allowing for local development and testing.

## Deployment

- For deployment, ensure you configure your hosting environment according to the Firebase project settings.
- Use the following commands for building and starting the application in a production environment:
```bash
    npm run build
    npm run start
```

## Contributing

As Unplan is a private project, contributions are managed internally. If you have been onboarded to the project and wish to contribute, please ensure you follow our internal guidelines for contributions. This typically involves working on assigned issues or features, following our coding standards, and submitting pull requests for review by the project maintainers. If you're interested in contributing and are not yet part of the team, please reach out to the project administrators for more information on how you can become involved.

## License

This project is privately owned by Unplan. All rights reserved.

