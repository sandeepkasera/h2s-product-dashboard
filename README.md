# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

---

## ✨ Feature Overview

### 🛒 Add to Cart
- Add to cart button per product  
- Header cart badge with live count  
- Cart sidebar with quantity controls, remove, and total price  
- In-memory cart using **React Context API**

### 📊 Product Table
- Columns: Image, Name, Category, Price, Status, Stock, Cart, Actions  
- Features:  
  - Pagination (10 per page)  
  - Debounced search (filters product list)  
  - Sortable columns  
  - Row actions: **View**, **Edit**, **Delete**  
  - Handles 1000+ product dataset  

### 📑 Drag & Drop Columns
- Reorder table headers via drag and drop  
- State updated to persist new order  

### 🪟 Lazy Loaded Modals
- **ViewProduct**, **EditProduct**, **DeleteConfirm** modals are lazy-loaded with `React.lazy` + `Suspense`  
- Improves initial load performance since modal code is only fetched when needed  

### 📈 Dashboard View
- Header with search, user avatar, cart badge  
- Stats cards: total products, revenue, low stock, categories  
- Responsive **mobile-first** design:  
  - **Mobile** → Product cards view  
  - **Desktop** → Product table view  

---

## ⚡ Optimizations
- **Debounced search** → prevents excessive re-renders while typing  
- **Memoized cart context** → optimized with `useReducer` + `useMemo`  
- **Reduced re-renders** → applied `useMemo` / `useCallback` on derived values (cart totals, filtered products)  
- **Lazy image loading** → all product images use `loading="lazy"`  
- **Efficient pagination** → memory-efficient slicing (10 items/page) for large dataset  
- **Lazy loaded modals** → `React.lazy` ensures modals don’t impact initial bundle size  

---

## ⏱️ Time Tracking
- Project setup: ~1 hr  
- Add to Cart (context + sidebar): ~2 hrs  
- Product Table (search, sort, pagination): ~3 hrs  
- Drag & Drop column headers: ~2 hrs  
- Responsive layout (mobile cards + desktop table): ~2 hrs  
- Polishing (UI/UX, bug fixes, optimizations): ~2 hrs  

---

## 🧩 Challenges & Solutions

### 🔹 Drag & Drop Columns
**Challenge:**  
While implementing drag-and-drop for the product table headers, two key problems appeared:
1. Keeping **column headers and row cells aligned** after reordering.  
2. Avoiding **unnecessary re-renders of 1000+ rows** when only header order changed.  
3. Managing **interaction between sorting and drag events** so they didn’t conflict.  

**Solution:**  
- Created a `columns` array in state to represent the current order of headers.  
- Implemented `onDragStart`, `onDragOver`, and `onDrop` to reorder immutably:
  ```js
  const reordered = [...columns];
  const [removed] = reordered.splice(draggedColIndex, 1);
  reordered.splice(index, 0, removed);
  setColumns(reordered);