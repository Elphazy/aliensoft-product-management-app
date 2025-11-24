AlienSoft Product Management App

Overview

This is a mini Product Management App built with Vue 3, Tailwind CSS, and Pinia, as part of the AlienSoft frontend technical test.

The app communicates with the public API at DummyJSON and supports:

User authentication (login with token persistence)

Product listing with search and filters

Viewing product details

Adding, editing, and deleting products

State management via Pinia

Responsive UI using Tailwind CSS (#000080 primary color)


The app is deployed on GitHub Pages:
https://elphazy.github.io/aliensoft-product-management-app/


---

Features

Login & Authentication

Login form with username and password

Stores token and user info in Pinia + localStorage

Route protection: redirects unauthenticated users to /login


Product Management

List products with thumbnail, title, category, price, stock

Search by title, filter by category or price range

View product details

Add, Edit, Delete products


State Management (Pinia)

Auth store: manages login state and token

Product store: manages products, loading state, error state, CRUD actions


UI/UX

Tailwind CSS utility-first styling

Loading spinners / skeletons for async actions

Responsive for laptop and tablet screens




---

Project Structure

/src
  /pages      # Login, Products, AddProduct, ViewProduct
  /components # Reusable UI components (tables, forms, buttons)
  /stores     # Pinia stores (auth, products)
  /router     # Vue Router setup and route guards
  /assets     # Images and static files
  main.js     # App entry point
index.html    # Main HTML template
vite.config.mjs  # Vite configuration (base path for GitHub Pages)
package.json


---

Prerequisites

Node.js v18+

npm v9+

Termux (if using Android) or any UNIX-like terminal



---

Getting Started

1. Clone the repository

git clone https://github.com/elphazy/aliensoft-product-management-app.git
cd aliensoft-product-management-app

2. Install dependencies

npm install

3. Development Server

npm run dev

Open http://localhost:5173 in your browser.


---

Build for Production

npm run build

> This generates a dist/ folder ready for deployment.




---

GitHub Pages Deployment (Termux / Linux / MacOS)

1. Install gh-pages if not installed:



npm install gh-pages --save-dev

2. Add deploy scripts in package.json:



"scripts": {
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

3. Deploy:



npm run deploy

Your site will be available at:

https://<username>.github.io/aliensoft-product-management-app/

> Tip: Make sure vite.config.mjs has base: '/aliensoft-product-management-app/'.




---

API Endpoints

Auth: DummyJSON Auth

Products: DummyJSON Products


All authenticated requests use the token stored in Pinia.


---

Assumptions & Notes

Login persists across refresh using localStorage

Routes are protected — users cannot access /products without login

API errors are handled and displayed to the user

Vue 3 Composition API + Pinia used for state management

Tailwind CSS used for styling with primary color #000080



---

Contact

Elphas Wanyonyi
Email: mulongoelphas@gmail.com
GitHub: https://github.com/elphazy
