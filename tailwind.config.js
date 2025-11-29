/** @type {import('tailwindcss').Config} */
module.exports = {
  // All files where you use className
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  // Use NativeWind's preset so the classes exist
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#2563eb",
          600: "#1d4ed8",
        },
      },
    },
  },
  plugins: [],
};
