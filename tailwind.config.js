/**************************
 * Tailwind CSS Config
 **************************/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crumblPink: "#FFC0CB",
      },
      fontFamily: {
        heading: ["Poppins", "Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Lato", "Open Sans", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
