# AlienSoft Product Management App

## Features

- Login/logout with localStorage session
- Product listing (search, filter, categories, min/max price)
- View product detail
- Add, Edit, Delete products
- Route protection for authentication
- Responsive UI (Tailwind) with AlienSoft branding

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Folders

- `/src/pages` — Login, Products, AddProduct, EditProduct, ViewProduct
- `/src/stores` — Stores for auth, products
- `/src/router` — Vue Router
- `/src/index.css` — Tailwind imports

## APIs Used

- DummyJSON Auth: https://dummyjson.com/docs/auth
- DummyJSON Products: https://dummyjson.com/docs/products

## Deployment

For GitHub Pages  
- Run: `npm run build`
- [Vite static deploy guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

---
**Ready for review!**
