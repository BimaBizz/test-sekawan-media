
# Dashboard Kit

Dashboard Kit is a comprehensive web application built using React, Next.js, and i18next for localization. The application includes various features such as user authentication, theme toggling, language toggling, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Localization](#localization)
- [Theme Toggling](#theme-toggling)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/BimaBizz/test-sekawan-media.git
cd test-sekawan-media
```
2. Install the dependencies:
```bash
npm install`
```
3. Start the development server:
```bash
	npm run dev
```
## Usage
To use the Dashboard Kit, simply navigate to the URL provided by the development server (typically `http://localhost:5173/`).

|Login as|email  |password |
|--|--|--|
| superuser |superuser@example.test  | 12345678
|user|user1@example.test|12345678



## Authentication
The application uses JWT tokens for authentication. Upon logging in, a token is saved in the browser's cookies to maintain the session.

## Localization
Dashboard Kit supports multiple languages using `i18next`. The default language is English (`en`), but users can toggle to Indonesian (`id`) using the language toggle button in the header.

#### Adding New Languages

To add a new language, update the `resources` object in `i18n.js` with the new language translations.

## Theme Toggling

The application supports light and dark themes. Users can toggle between these themes using the theme toggle button in the header. The selected theme is saved in `localStorage` and applied on subsequent visits.
## Features

-   **User Authentication**: Login and signup functionality with JWT token-based authentication.
-   **Localization**: Multi-language support with i18next.
-   **Theme Toggling**: Light and dark theme support.
-   **Notification System**: In-app notifications for user activities.
-   **Responsive Design**: Fully responsive design for mobile and desktop.

### Key Components

-   **HeaderRoutes**: The main header component containing user profile, theme toggle, language toggle, and notifications.
-   **FilterTikets**: A component for filtering tickets.
-   **Notification**: A component for displaying notifications.

### Important Files

-   `src/utils/i18n.jsx`: Configuration for i18next.
-   `src/components/HeaderRoutes.jsx`: Main header component.
-   `src/components/FilterTikets.jsx`: Ticket filtering component.
-   `src/components/Notification.jsx`: Notification component.
