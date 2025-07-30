## Setup Tailwind CSS

1. Install
   npm install -D tailwindcss
   npx tailwindcss init

2. File tailwind.config.js
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
   extend: {},
   },
   plugins: [],

3. index.css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

4. main.js
   import "./index.css";
